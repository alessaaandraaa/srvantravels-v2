"use client";

import { useState } from "react";
import {
  APIProvider,
  Map as GoogleMap, // alias so we can use ES6 Map() in code
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

import Search from "../../components/map/search";
import Directions from "../../components/map/directions";
import RouteButton from "../../components/map/button";
import LocationsList, {
  MarkerData as ListMarkerData,
} from "../../components/map/locations";
import Presets from "../../components/map/presets";

const center = { lat: 10.2926, lng: 123.9022 };

type Place = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type MarkerData = ListMarkerData;

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* ---------------- helpers ---------------- */

// rotate array so index i becomes first
function rotateTo<T>(arr: T[], i: number): T[] {
  if (i <= 0) return arr.slice();
  return arr.slice(i).concat(arr.slice(0, i));
}

function summarizeDirections(res: google.maps.DirectionsResult) {
  const legs = res.routes[0]?.legs ?? [];
  const meters = legs.reduce((a, l) => a + (l.distance?.value ?? 0), 0);
  const secs = legs.reduce(
    (a, l) => a + (l.duration_in_traffic?.value ?? l.duration?.value ?? 0),
    0
  );
  const km = (meters / 1000).toFixed(1) + " km";
  const hrs = Math.floor(secs / 3600);
  const mins = Math.round((secs % 3600) / 60);
  return {
    distanceText: km,
    durationText: hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`,
  };
}

function rebuildByIds(ids: string[], current: MarkerData[]): MarkerData[] {
  const map = new Map(current.map((m) => [m.id, m]));
  return ids.map((id) => map.get(id)!).filter(Boolean);
}

// ----- Address-components gating: Cebu, Philippines -----
type GComp =
  | google.maps.GeocoderAddressComponent
  | google.maps.places.AddressComponent;
function isPlaceComp(c: GComp): c is google.maps.places.AddressComponent {
  return "longText" in c;
}
function isGeocoderComp(c: GComp): c is google.maps.GeocoderAddressComponent {
  return "long_name" in c;
}
function compHasType(c: GComp, type: string) {
  return Array.isArray((c as any).types) && (c as any).types.includes(type);
}
function getLong(c?: GComp) {
  if (!c) return undefined;
  return isPlaceComp(c)
    ? c.longText
    : isGeocoderComp(c)
    ? c.long_name
    : undefined;
}
function getShort(c?: GComp) {
  if (!c) return undefined;
  return isPlaceComp(c)
    ? c.shortText
    : isGeocoderComp(c)
    ? c.short_name
    : undefined;
}
function getComp(comps: GComp[] | undefined, type: string): GComp | undefined {
  return comps?.find((c) => compHasType(c, type));
}
function isInCebuPH(comps: GComp[] | undefined): boolean {
  const countryShort = getShort(getComp(comps, "country")); // "PH"
  const provLong = getLong(getComp(comps, "administrative_area_level_2")); // "Cebu"
  const cityLong = getLong(getComp(comps, "locality")); // "Cebu City"
  return (
    countryShort === "PH" &&
    ((provLong ?? "").toLowerCase() === "cebu" ||
      (cityLong ?? "").toLowerCase() === "cebu city")
  );
}

// Prevent duplicates by name+address (for admin presets with no ids)
const sameByNameAddress = (
  a: { name?: string; address: string },
  b: { name?: string; address: string }
) =>
  (a.name ?? "").toLowerCase() === (b.name ?? "").toLowerCase() &&
  a.address.toLowerCase() === b.address.toLowerCase();

/* ---------------- component ---------------- */

export default function MapComponent() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [startId, setStartId] = useState<string | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [summary, setSummary] = useState<{
    distanceText: string;
    durationText: string;
  } | null>(null);

  // snapshot of the pre-optimization order (ids) so user can go back
  const [savedOrderIds, setSavedOrderIds] = useState<string[] | null>(null);

  /* ---------- add with Cebu gate ---------- */
  function addIfAllowed(
    marker: { lat: number; lng: number; name?: string; address: string },
    comps: GComp[] | undefined
  ) {
    if (!isInCebuPH(comps)) {
      console.warn("Blocked: outside Cebu, Philippines");
      return false;
    }
    setMarkers((prev) => [...prev, { id: uid(), ...marker }]);
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
        },
        place.addressComponents ?? []
      );
      return;
    }

    // Fallbacks: Nearby → Details → Geocoder (all gated)
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
              },
              (geoResults[0].address_components as unknown as GComp[]) ?? []
            );
          }
        });
      }
    });
  };

  /* ---------- search → add (already gated inside Search, but we re-check) ---------- */
  const handlePlacePicked = (p: {
    lat: number;
    lng: number;
    name?: string;
    address: string;
    addressComponents?: GComp[];
  }) => {
    addIfAllowed(
      { lat: p.lat, lng: p.lng, name: p.name, address: p.address },
      p.addressComponents ?? []
    );
  };

  /* ---------- presets (admin list with name+address only) ---------- */
  const alreadyInList = (p: Place) => {
    const r = (n: number) => Math.round(n * 1e6);
    const keySet = new Set(markers.map((m) => `${r(m.lat)},${r(m.lng)}`));
    return keySet.has(`${r(p.lat)},${r(p.lng)}`);
  };

  function handlePresetPick(p: Place) {
    if (alreadyInList(p)) return;
    setMarkers((prev) => [
      ...prev,
      { id: uid(), lat: p.lat, lng: p.lng, name: p.name, address: p.address },
    ]);
    setSavedOrderIds(null);
  }

  /* ---------- list actions ---------- */
  const removeMarker = (id: string) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
    setStartId((curr) => (curr === id ? null : curr));
    setSavedOrderIds(null);
  };

  const clearAllMarkers = () => {
    setMarkers([]);
    setStartId(null);
    setDirections(null);
    setSummary(null);
    setSavedOrderIds(null);
  };

  const clearRoute = () => {
    setDirections(null);
    setSummary(null);
  };

  /* ---------- routing (DRY) ---------- */

  function computeStops(
    list: MarkerData[],
    start: string | null,
    optimize: boolean
  ) {
    if (list.length < 2) return null;
    let ordered = list.slice();
    if (start) {
      const i = ordered.findIndex((m) => m.id === start);
      if (i >= 0) ordered = rotateTo(ordered, i);
    }
    const origin = ordered[0];
    const destination = ordered[ordered.length - 1];
    const inBetween = ordered.slice(1, -1); // waypoint_order indexes this
    return {
      ordered,
      origin,
      destination,
      inBetween,
      waypoints: inBetween.map((m) => ({
        location: { lat: m.lat, lng: m.lng },
        stopover: true,
      })),
      optimizeWaypoints: optimize,
    };
  }

  function route(optimize: boolean, markersOverride?: MarkerData[]) {
    if (!window.google) return;
    const source = markersOverride ?? markers;
    const stops = computeStops(source, startId, optimize);
    if (!stops) return;

    const req: google.maps.DirectionsRequest = {
      origin: { lat: stops.origin.lat, lng: stops.origin.lng },
      destination: { lat: stops.destination.lat, lng: stops.destination.lng },
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
        setSummary(summarizeDirections(res));

        if (optimize) {
          // save original order once, so user can restore it
          if (!savedOrderIds) setSavedOrderIds(source.map((m) => m.id));

          // reorder sidebar to match Google's optimized order
          const order = res.routes[0].waypoint_order ?? [];
          const optimizedList = [
            stops.origin,
            ...order.map((i) => stops.inBetween[i]),
            stops.destination,
          ];
          setMarkers(optimizedList);
          setStartId(stops.origin.id);
        }
      } else {
        console.warn("Directions failed:", status);
      }
    });
  }

  const onOptimize = () => route(true);
  const onMyOrder = () => {
    if (savedOrderIds) {
      const restored = rebuildByIds(savedOrderIds, markers);
      setMarkers(restored);
      route(false, restored); // route immediately using restored order
      return;
    }
    route(false);
  };

  /* ---------- render ---------- */

  return (
    <div className="flex h-screen box-border bg-gray-600 p-5">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}
        libraries={["places"]}
      >
        <div className="flex w-full h-full">
          <Presets
            onPick={handlePresetPick}
            isAdded={alreadyInList}
            title="Presets"
          />

          <div className="relative w-1/2 box-border p-5">
            <Search onPlacePicked={handlePlacePicked} />
            <RouteButton
              optimize={onOptimize}
              routeInOrder={onMyOrder}
              clear={clearRoute}
              disabled={markers.length < 2}
            />
            {summary && (
              <div className="absolute z-10 right-6 top-24 bg-white rounded-xl shadow-md px-3 py-2 text-sm">
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
              mapId="your-map-id"
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

          <div className="flex-1 bg-white rounded-2xl h-full p-4 shadow-md">
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
