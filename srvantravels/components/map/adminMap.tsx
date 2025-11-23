"use client";

import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import AdminForm from "@/src/app/components/ui/Admin/AdminLocations/AdminForm";
import { useState } from "react";
import Search from "./search";

const center = { lat: 10.2926, lng: 123.9022 };

type Place = {
  name: string | undefined;
  address: string;
  lat: number;
  lng: number;
};

interface AdminMapProps {
  onMarkerSelect: (marker: Place) => void;
  selectedMarker?: Place | null;
}

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

export default function AdminMap({
  onMarkerSelect,
  selectedMarker,
}: AdminMapProps) {
  function setSingleMarker(
    newMarker: Place,
    comps: GComp[] | undefined
  ): boolean {
    if (!isInCebuPH(comps)) {
      console.warn("Blocked: outside Cebu, Philippines");
      return false;
    }

    onMarkerSelect(newMarker);
    return true;
  }

  const handleMapClick = async (e: MapMouseEvent) => {
    const { latLng, placeId } = e.detail;
    if (!latLng) return;
    const lat = latLng.lat;
    const lng = latLng.lng;

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

      setSingleMarker(
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
              setSingleMarker(
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
            setSingleMarker(
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
    setSingleMarker(
      {
        lat: p.lat,
        lng: p.lng,
        name: p.name,
        address: p.address,
      },
      p.addressComponents ?? []
    );
  };

  return (
    <div>
      <div className="flex h-screen box-border bg-gray-600 p-5">
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}
          libraries={["places"]}
        >
          <div className="relative w-full box-border p-5">
            <Search onPlacePicked={handlePlacePicked} />
            <GoogleMap
              mapId="dcf669e4cab82947951b672b"
              defaultCenter={center}
              defaultZoom={17}
              className="w-full h-full rounded-2xl overflow-hidden"
              mapTypeControl={false}
              onClick={handleMapClick}
            >
              {selectedMarker && (
                <AdvancedMarker
                  key={selectedMarker.address} // Use a stable property for the key
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                />
              )}
            </GoogleMap>
          </div>
        </APIProvider>
      </div>
    </div>
  );
}
