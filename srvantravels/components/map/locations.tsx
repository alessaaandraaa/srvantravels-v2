// components/map/locations.tsx

"use client";
import React from "react";

export type MarkerData = {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  address: string;
  isCustom: boolean;
};

type Props = {
  locations: MarkerData[];
  onRemove?: (id: string) => void;
  startId?: string | null;
  onSetStart?: (id: string) => void;
  onClear?: () => void;
};

export default function LocationsList({
  locations,
  onRemove,
  startId,
  onSetStart,
  onClear,
}: Props) {
  return (
        <div
          className="
            w-full lg:w-[440px]
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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-black">
            Markers
          </h2>
          {!!locations.length && onClear && (
            <button
              onClick={onClear}
              className="text-sm px-3 py-1.5 rounded-xl border"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
          {locations.length === 0 ? (
          <p className="text-sm text-black">
            Select at least two locations.
          </p>
        ) : (
          <ul className="space-y-3">
            {locations.map((l) => (
              <li
                key={l.id}
                className="p-4 rounded-2xl border flex justify-between gap-3 sm:flex-col sm:items-start sm:gap-2"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{l.name}</p>
                  <p className="text-xs text-black truncate">
                    {l.address}
                  </p>
                </div>
                {onRemove && (
                  <button
                    onClick={() => onRemove(l.id)}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
