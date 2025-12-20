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

const sameByNameAddress = (
  a: { name?: string; address: string },
  b: { name?: string; address: string }
) =>
  (a.name ?? "").toLowerCase() === (b.name ?? "").toLowerCase() &&
  a.address.toLowerCase() === b.address.toLowerCase();

/* ---------------- component ---------------- */

export default function MapComponent({
  onSetRoute,
  onTime,
  onNumStops,
}: MapComponentProps) {
  if (!onSetRoute) {
    console.log("NOT ROUTED YET\n");
  } else {
    console.log("ALREADY ROUTED");
  }
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
    if (!isInCebuPH(comps)) {
      console.warn("Blocked: outside Cebu, Philippines");
      return false;
    }
    // add to store
    setLocation({ id: uid(), ...marker });
    setSavedOrderIds(null);
    return true;
  }

  /* ---------- map click ---------- */
  const handleMapClick = async (e: MapMouseEvent) => {
    const { latLng, placeId } = e.detail;
    if (!latLng) return;
    const lat = latLng.lat;
    const lng = latLng.lng;

    // Prefer native POI (Place API)
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

      addIfAllowed(
        {
          lat: place.location?.lat() ?? lat,
          lng: place.location?.lng() ?? lng,
          name: place.displayName ?? "Unnamed Place",
          address: place.formattedAddress ?? "Unknown address",
          isCustom: true,
        },
        place.addressComponents ?? []
      );
      return;
    }

    if (!window.google) return;
    const location = new google.maps.LatLng(lat, lng);
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.nearbySearch({ location, radius: 20 }, (results, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results &&
        results.length > 0
      ) {
        const pid = results[0].place_id!;
        service.getDetails(
          {
            placeId: pid,
            fields: [
              "name",
              "formatted_address",
              "vicinity",
              "geometry",
              "address_components",
            ],
          },
          (pd, ds) => {
            if (ds === google.maps.places.PlacesServiceStatus.OK && pd) {
              addIfAllowed(
                {
                  lat,
                  lng,
                  name: pd.name ?? "Unnamed Place",
                  address:
                    pd.formatted_address ?? pd.vicinity ?? "Unknown address",
                  isCustom: true,
                },
                (pd.address_components as unknown as GComp[]) ?? []
              );
            }
          }
        );
      } else {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (geoResults, geoStatus) => {
          if (geoStatus === "OK" && geoResults?.[0]) {
            addIfAllowed(
              {
                lat,
                lng,
                name:
                  geoResults[0].address_components?.[0]?.long_name ??
                  "Unnamed Place",
                address: geoResults[0].formatted_address ?? "Unknown address",
                isCustom: true,
              },
              (geoResults[0].address_components as unknown as GComp[]) ?? []
            );
          }
        });
      }
    });
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
    setStartId((curr) => (curr === id ? null : curr));
    setSavedOrderIds(null);

    resetRouteUI();
  };

  const clearAllMarkers = () => {
    clear();
    setStartId(null);
    setSavedOrderIds(null);

    resetRouteUI();
  };

  const clearRoute = () => {
    resetRouteUI();
  };

  function commitList(finalList: MarkerData[]) {
    clear();
    finalList.forEach((m) => setLocation(m));
  }

  function route(optimize: boolean, markersOverride?: MarkerData[]) {
    if (!window.google) return;

    const source = markersOverride ?? markers;
    // Use your imported utility helper
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

        if (finalList) commitList(finalList);

        // 4. Finally, mark as routed
        onSetRoute(true);
      } else {
        console.warn("Directions failed:", status);
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
      <div className="w-full mt-12">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}
        libraries={["places"]}
      >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[320px_1fr_400px]
              gap-4
              w-full
            "
          >
          <Presets
            onPick={handlePresetPick}
            isAdded={alreadyInList}
            title="Presets"
          />

          <div className="relative w-full h-[60vh] lg:h-[75vh] box-border p-2 lg:p-5">
            <Search onPlacePicked={handlePlacePicked} />
            <RouteButton
              optimize={onOptimize}
              routeInOrder={onMyOrder}
              clear={clearRoute}
              disabled={markers.length < 2}
            />
            {summary && (
              <div className="absolute z-10 top-4 right-4 lg:top-24 lg:right-6 bg-white rounded-xl shadow-md px-3 py-2 text-sm text-gray-900">
                <div>
                  <span className="font-medium">Distance:</span>{" "}
                  {summary.distanceText}
                </div>
                <div>
                  <span className="font-medium">ETA:</span>{" "}
                  {summary.durationText}
                </div>
              </div>
            )}

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

          <div className="flex-1 rounded-2xl h-full">
            <LocationsList
              locations={markers}
              onRemove={removeMarker}
              onClear={clearAllMarkers}
              startId={startId}
              onSetStart={setStartId}
            />
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
