"use client";

import { useState, useEffect } from "react";
import { useLocationsStore } from "@/store/custom-itinerary.store";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

import {
  uid,
  summarizeDirections,
  isInCebuPH,
  computeStops,
  rebuildByIds,
} from "@/lib/map-helpers";

import Search from "./search";
import Directions from "./directions";
import RouteButton from "./button";
import LocationsList, { MarkerData as ListMarkerData } from "./locations";
import Presets from "./presets";

const center = { lat: 10.2926, lng: 123.9022 };

type Place = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type MarkerData = ListMarkerData;

type GComp =
  | google.maps.GeocoderAddressComponent
  | google.maps.places.AddressComponent;

interface MapComponentProps {
  onSetRoute: (routed: boolean) => void;
  onTime: (time: number) => void;
  onNumStops: (stops: number) => void;
}

export default function MapComponent({
  onSetRoute,
  onTime,
  onNumStops,
}: MapComponentProps) {
  const { locations: markers, setLocation, clear } = useLocationsStore();

  const [startId, setStartId] = useState<string | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [summary, setSummary] = useState<{
    distanceText: string;
    durationText: string;
    durationTime: number;
  } | null>(null);
  const [savedOrderIds, setSavedOrderIds] = useState<string[] | null>(null);

  const resetRouteUI = () => {
    setDirections(null);
    setSummary(null);
    onTime(-1);
    onSetRoute(false);
  };

  useEffect(() => {
    resetRouteUI();
  }, []);

  /* ---------- add with Cebu gate ---------- */
    function addIfAllowed(
      marker: {
        lat: number;
        lng: number;
        name?: string;  
        address: string;
        isCustom: boolean;
      },
      comps: GComp[] | undefined
    ) {
      // ✅ Allow dropped pins (no address components)
      if (comps && !isInCebuPH(comps)) return false;

      setLocation({ id: uid(), ...marker });
      setSavedOrderIds(null);
      return true;
    }

    async function reverseGeocode(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();

    const res = await geocoder.geocode({
      location: { lat, lng },
    });

    if (!res.results[0]) {
      return {
        name: "Pinned Location",
        address: "Unknown address",
        components: undefined,
      };
    }

    const first = res.results[0];

    return {
      name:
        first.address_components?.find(c =>
          c.types.includes("establishment") ||
          c.types.includes("point_of_interest")
        )?.long_name ??
        first.formatted_address.split(",")[0],

      address: first.formatted_address,
      components: first.address_components,
    };
  }

  /* ---------- map click ---------- */
const handleMapClick = async (e: MapMouseEvent) => {
  const { latLng, placeId } = e.detail;
  if (!latLng) return;

  const lat = latLng.lat;
  const lng = latLng.lng;

  // CLICKED A PLACE (POI)
  if (placeId && typeof window !== "undefined" && window.google) {
    e.stop();

    const { Place } = (await google.maps.importLibrary(
      "places"
    )) as google.maps.PlacesLibrary;

    const place = new Place({ id: placeId });
    await place.fetchFields({
      fields: [
        "displayName",
        "formattedAddress",
        "location",
        "addressComponents",
      ],
    });

    const geo = await reverseGeocode(lat, lng);

    addIfAllowed(
      {
        lat,
        lng,
        name: geo.name,
        address: geo.address,
        isCustom: true,
      },
      geo.components
    );


    return;
  }

  // CLICKED EMPTY MAP → DROP PIN
  addIfAllowed(
    {
      lat,
      lng,
      address: "Dropped Pin",
      isCustom: true,
    },
    undefined
  );
};


  const handlePlacePicked = (p: {
    lat: number;
    lng: number;
    name?: string;
    address: string;
    addressComponents?: GComp[];
  }) => {
    addIfAllowed(
      {
        lat: p.lat,
        lng: p.lng,
        name: p.name,
        address: p.address,
        isCustom: true,
      },
      p.addressComponents ?? []
    );
  };

  const alreadyInList = (p: Place) => {
    const r = (n: number) => Math.round(n * 1e6);
    const keySet = new Set(markers.map((m) => `${r(m.lat)},${r(m.lng)}`));
    return keySet.has(`${r(p.lat)},${r(p.lng)}`);
  };

  function handlePresetPick(p: Place) {
    if (alreadyInList(p)) return;
    setLocation({
      id: uid(),
      lat: p.lat,
      lng: p.lng,
      name: p.name,
      address: p.address,
      isCustom: false,
    });
    setSavedOrderIds(null);
  }

  const removeMarker = (id: string) => {
    const next = markers.filter((m) => m.id !== id);
    clear();
    next.forEach((m) => setLocation(m));
    resetRouteUI();
  };

  const clearAllMarkers = () => {
    clear();
    resetRouteUI();
  };

  const clearRoute = () => {
    resetRouteUI();
  };

  function route(optimize: boolean, markersOverride?: MarkerData[]) {
  if (!window.google) return;

  const source = markersOverride ?? markers;
  const stops = computeStops(source, startId, optimize);
  if (!stops) return;

  const req: google.maps.DirectionsRequest = {
    origin: stops.origin,
    destination: stops.destination,
    waypoints: stops.waypoints,
    optimizeWaypoints: stops.optimizeWaypoints,
    travelMode: google.maps.TravelMode.DRIVING,
    drivingOptions: {
      departureTime: new Date(),
      trafficModel: google.maps.TrafficModel.BEST_GUESS,
    },
  };

  new google.maps.DirectionsService().route(req, (res, status) => {
    if (status === "OK" && res) {
      setDirections(res);

      const currentSummary = summarizeDirections(res);
      setSummary(currentSummary);

      if (currentSummary) {
        onTime(currentSummary.durationTime);
        onNumStops(markers.length);
      }

      let finalList: MarkerData[] | null = null;

      if (optimize) {
        if (!savedOrderIds) setSavedOrderIds(source.map((m) => m.id));
        const order = res.routes[0].waypoint_order ?? [];
        finalList = [
          stops.origin,
          ...order.map((i) => stops.inBetween[i]),
          stops.destination,
        ];
        setStartId(stops.origin.id);
      } else {
        finalList = [...stops.ordered];
      }

      if (finalList) {
        clear();
        finalList.forEach((m) => setLocation(m));
      }

      onSetRoute(true);
    }
  });
}

    const onOptimize = () => route(true);

    const onMyOrder = () => {
      if (savedOrderIds) {
        const restored = rebuildByIds(savedOrderIds, markers);
        route(false, restored);
        return;
      }
      route(false);
    };

  return (
    <div className="w-full mt-6 sm:mt-8 lg:mt-12 overflow-x-hidden">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}
        libraries={["places"]}
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-[320px_minmax(0,1fr)_320px]
            gap-4 lg:gap-6
            w-full
            h-[320px] sm:h-[420px] lg:h-[600px]
            items-stretch
          "
        >
          {/* PRESETS */}
        <div className="max-h-[320px] sm:max-h-[420px] lg:max-h-[600px]">
          <Presets
            onPick={handlePresetPick}
            isAdded={alreadyInList}
          />
        </div>


          {/* MAP */}
          <div className="relative w-full h-full">
            <Search onPlacePicked={handlePlacePicked} />

            <RouteButton
              optimize={onOptimize}
              routeInOrder={onMyOrder}
              clear={clearRoute}
              disabled={markers.length < 2}
            />

            <GoogleMap
              mapId="dcf669e4cab82947951b672b"
              defaultCenter={center}
              defaultZoom={17}
              className="w-full h-full rounded-2xl overflow-hidden"
              mapTypeControl={false}
              onClick={handleMapClick}
            >
              <Directions directions={directions} />
              {markers.map((m) => (
                <AdvancedMarker
                  key={m.id}
                  position={{ lat: m.lat, lng: m.lng }}
                />
              ))}
            </GoogleMap>
          </div>

          {/* MARKERS */}
          <div className="max-h-[320px] sm:max-h-[420px] lg:max-h-[600px]">
            <LocationsList
              locations={markers}
              onRemove={removeMarker}
              onClear={clearAllMarkers}
            />
          </div>

        </div>
      </APIProvider>
    </div>
  );
}
