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
  onClear?: () => void;
};

export default function LocationsList({
  locations,
  onRemove,
  onClear,
}: Props) {
  return (
    <div className="h-full bg-white rounded-3xl shadow-xl border border-black/10 flex flex-col overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-extrabold">Markers</h2>
        {!!locations.length && onClear && (
          <button
            onClick={onClear}
            className="text-sm px-3 py-1.5 rounded-xl border"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {locations.length === 0 ? (
          <p className="text-sm text-gray-500">
            Select at least two locations.
          </p>
        ) : (
          locations.map((l) => (
            <div
              key={l.id}
              className="p-3 rounded-2xl border flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="font-semibold truncate">{l.name}</p>
                <p className="text-xs text-gray-600 break-words">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
