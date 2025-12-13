import { MarkerData } from "@/components/map/locations";

// Helper types
type GComp =
  | google.maps.GeocoderAddressComponent
  | google.maps.places.AddressComponent;

export function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function rotateTo<T>(arr: T[], i: number): T[] {
  if (i <= 0) return arr.slice();
  return arr.slice(i).concat(arr.slice(0, i));
}

export function summarizeDirections(res: google.maps.DirectionsResult) {
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
    durationTime: secs,
  };
}

export function rebuildByIds(
  ids: string[],
  current: MarkerData[]
): MarkerData[] {
  const map = new Map(current.map((m) => [m.id, m]));
  return ids.map((id) => map.get(id)!).filter(Boolean);
}

function isPlaceComp(c: GComp): c is google.maps.places.AddressComponent {
  return "longText" in c;
}
function isGeocoderComp(c: GComp): c is google.maps.GeocoderAddressComponent {
  return "long_name" in c;
}
function compHasType(c: GComp, type: string) {
  return Array.isArray(c.types) && c.types.includes(type);
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

export function isInCebuPH(comps: GComp[] | undefined): boolean {
  const countryShort = getShort(getComp(comps, "country")); // "PH"
  const provLong = getLong(getComp(comps, "administrative_area_level_2")); // "Cebu"
  const cityLong = getLong(getComp(comps, "locality")); // "Cebu City"
  return (
    countryShort === "PH" &&
    ((provLong ?? "").toLowerCase() === "cebu" ||
      (cityLong ?? "").toLowerCase() === "cebu city")
  );
}

export function computeStops(
  list: MarkerData[],
  startId: string | null,
  optimize: boolean
) {
  if (list.length < 2) return null;
  let ordered = list.slice();
  if (startId) {
    const i = ordered.findIndex((m) => m.id === startId);
    if (i >= 0) ordered = rotateTo(ordered, i);
  }
  const origin = ordered[0];
  const destination = ordered[ordered.length - 1];
  const inBetween = ordered.slice(1, -1);

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
