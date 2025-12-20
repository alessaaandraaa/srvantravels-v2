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
    <div className="h-full bg-white rounded-3xl shadow-xl border border-black/10 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-black/10">
        <h2 className="text-lg font-extrabold text-gray-900">
          Presets
        </h2>
        <p className="text-xs text-gray-600">
          Quick add locations
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((p) => {
          const added = isAdded?.(p) ?? false;
          return (
            <div
              key={`${p.name}-${p.address}`}
              className="p-3 rounded-2xl border border-black/10 flex items-start justify-between gap-3 bg-white"
            >
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {p.name}
                </p>
                <p className="text-xs text-gray-700 break-words">
                  {p.address}
                </p>
              </div>

              <button
                onClick={() => onPick(p)}
                disabled={added}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium flex-shrink-0 ${
                  added
                    ? "bg-gray-200 text-gray-500"
                    : "bg-[#36B9CB] text-white hover:bg-[#2fa6b6]"
                }`}
              >
                {added ? "Added" : "Add"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
