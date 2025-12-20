// components/map/presets.tsx

"use client";
import { useEffect, useState } from "react";

type Place = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export default function Presets({
  onPick,
  isAdded,
}: {
  onPick: (p: Place) => void;
  isAdded?: (p: Place) => boolean;
}) {
  const [items, setItems] = useState<Place[]>([]);

  useEffect(() => {
    fetch("/api/locations?onlyPreset=true")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.locations)) {
          setItems(
            d.locations.map((x: any) => ({
              name: x.location_name,
              address: x.location_address,
              lat: x.lat,
              lng: x.lng,
            }))
          );
        }
      });
  }, []);

  return (
        <div
          className="
            w-full lg:w-[380px]
            h-full
            bg-white
            text-black
            rounded-3xl
            shadow-xl
            border border-black/5
            flex flex-col
            overflow-hidden
          "
        >
      <div className="p-5 border-b">
        <h2 className="text-xl font-extrabold text-black">
          Presets
        </h2>
        <p className="text-xs text-black">
          Quick add locations
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <ul className="space-y-3">
          {items.map((p) => {
            const added = isAdded?.(p) ?? false;
            return (
              <li
                key={`${p.name}-${p.address}`}
                className="p-4 rounded-2xl border flex justify-between sm:flex-col sm:items-start sm:gap-2"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{p.name}</p>
                  <p className="text-xs text-black truncate">
                    {p.address}
                  </p>
                </div>
                <button
                  onClick={() => onPick(p)}
                  disabled={added}
                  className={`px-3 py-1.5 rounded-xl text-sm ${
                    added
                      ? "bg-gray-200 text-gray-500"
                      : "bg-[#36B9CB] text-white"
                  }`}
                >
                  {added ? "Added" : "Add"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
