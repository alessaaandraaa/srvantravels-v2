"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export default function Search({
  onPlacePicked,
  placeholder = "Search places…",
}: {
  onPlacePicked: (place: {
    lat: number;
    lng: number;
    name?: string;
    address: string;
  }) => void;
  placeholder?: string;
}) {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const ac = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["place_id", "geometry", "name", "formatted_address"],
      // componentRestrictions: { country: "ph" },
    });

    if (map) {
      ac.setBounds(map.getBounds() ?? undefined);
      map.addListener("bounds_changed", () =>
        ac.setBounds(map.getBounds() ?? undefined)
      );
    }

    ac.addListener("place_changed", async () => {
      const place = ac.getPlace();
      if (!place) return;

      // Enter w/o selecting a suggestion -> geocode text
      if (!place.place_id && inputRef.current?.value) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: inputRef.current.value }, (res, status) => {
          if (status === "OK" && res?.[0]?.geometry?.location) {
            const loc = res[0].geometry.location;
            const lat = loc.lat();
            const lng = loc.lng();
            map?.panTo({ lat, lng });
            map?.setZoom(16);
            onPlacePicked({
              lat,
              lng,
              name: res[0].address_components?.[0]?.long_name,
              address: res[0].formatted_address ?? inputRef.current!.value,
            });
            inputRef.current!.value = "";
          }
        });
        return;
      }

      // Preferred: place_id path
      if (place.place_id) {
        let lat = place.geometry?.location?.lat();
        let lng = place.geometry?.location?.lng();

        try {
          const { Place } = (await google.maps.importLibrary(
            "places"
          )) as google.maps.PlacesLibrary;
          const p = new Place({ id: place.place_id });
          await p.fetchFields({
            fields: ["displayName", "formattedAddress", "location"],
          });
          lat = p.location?.lat() ?? lat;
          lng = p.location?.lng() ?? lng;

          if (lat != null && lng != null) {
            map?.panTo({ lat, lng });
            map?.setZoom(18);
            onPlacePicked({
              lat,
              lng,
              name: p.displayName ?? place.name ?? "Unnamed Place",
              address:
                p.formattedAddress ??
                place.formatted_address ??
                "Unknown address",
            });
            if (inputRef.current) inputRef.current.value = "";
          }
        } catch {
          if (lat != null && lng != null) {
            map?.panTo({ lat, lng });
            map?.setZoom(18);
            onPlacePicked({
              lat,
              lng,
              name: place.name ?? "Unnamed Place",
              address: place.formatted_address ?? "Unknown address",
            });
            if (inputRef.current) inputRef.current.value = "";
          }
        }
      }
    });

    setAutocomplete(ac);
    return () => {
      setAutocomplete(null);
    };
  }, [placesLib, map]);

return (
    <div
      className="
        absolute z-10
        top-4
        left-1/2 -translate-x-1/2
        lg:left-6 lg:translate-x-0
        bg-white/90 backdrop-blur-md
        rounded-2xl
        shadow-xl
        border border-black/5
        p-1
      "
    >
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="
        w-[320px] sm:w-[360px]
        px-5 py-3
        rounded-xl
        bg-transparent
        text-gray-800
        placeholder-gray-400
        focus:outline-none
        focus:ring-2 focus:ring-[#36B9CB]
        focus:ring-offset-0
        transition
      "
    />
  </div>
);

}
