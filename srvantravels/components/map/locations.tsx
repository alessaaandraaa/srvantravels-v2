"use client";
import { useLocationsStore } from "@/store/custom-itinerary.store";
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
    <div className="w-[400px] bg-white h-full rounded-2xl p-4 overflow-y-auto shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Markers</h2>
        {!!locations.length && onClear && (
          <button
            type="button"
            className="text-sm px-2 py-1 rounded-md border hover:bg-gray-50"
            onClick={onClear}
            aria-label="Clear all markers"
            title="Clear all"
          >
            Clear all
          </button>
        )}
      </div>

      {locations.length === 0 && (
        <p className="text-gray-500 text-sm">
          Click the map or use search to select <b>at least two</b> markers. By
          default the first location you select is your pickup location.
        </p>
      )}

      <ul className="space-y-2">
        {locations.map((l) => {
          const isStart = startId === l.id;
          return (
            <li
              key={l.id}
              className="p-3 border rounded-lg flex items-start justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {onSetStart && (
                    <input
                      type="radio"
                      name="start-location"
                      checked={isStart}
                      onChange={() => onSetStart(l.id)}
                      className="h-4 w-4 accent-blue-600"
                      aria-label="Set as starting location"
                      title="Set as starting location"
                    />
                  )}
                  <p
                    className={
                      l.isCustom
                        ? "font-medium text-blue-600"
                        : "font-medium text-green-800"
                    }
                  >
                    {l.name ?? "Unnamed Place"}
                    {isStart && (
                      <span className="ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                        Start
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{l.address}</p>
                <p className="text-xs text-gray-500">
                  ({l.lat.toFixed(5)}, {l.lng.toFixed(5)})
                </p>
              </div>

              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(l.id)}
                  className="shrink-0 text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50"
                  aria-label={`Remove ${l.name ?? "location"}`}
                  title="Remove"
                >
                  Remove
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
