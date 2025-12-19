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
        w-full lg:w-[400px]
        h-auto lg:h-full
        bg-white
        rounded-3xl
        p-5
        overflow-y-auto
        shadow-xl
        border border-black/5
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-[#36B9CB]">
          Markers
        </h2>

        {!!locations.length && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear all markers"
            title="Clear all"
            className="
              text-sm font-semibold
              px-3 py-1.5 rounded-xl
              border border-gray-300
              text-gray-600
              hover:bg-gray-100
              transition
            "
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty state */}
      {locations.length === 0 && (
        <p className="text-sm text-gray-500 leading-relaxed">
          Click the map or use search to select{" "}
          <span className="font-semibold">at least two</span> locations.
          <br />
          The first location will be your pickup point.
        </p>
      )}

      {/* List */}
      <ul className="space-y-3 mt-4">
        {locations.map((l) => {
          const isStart = startId === l.id;

          return (
            <li
              key={l.id}
              className="
                flex items-start justify-between gap-4
                p-4
                rounded-2xl
                border border-gray-200
                bg-white
                hover:shadow-md
                transition
              "
            >
              {/* LEFT: Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  {onSetStart && (
                    <input
                      type="radio"
                      name="start-location"
                      checked={isStart}
                      onChange={() => onSetStart(l.id)}
                      className="h-4 w-4 accent-[#36B9CB]"
                      aria-label="Set as starting location"
                      title="Set as starting location"
                    />
                  )}

                  <p
                    className={`font-semibold truncate ${
                      l.isCustom
                        ? "text-[#36B9CB]"
                        : "text-green-700"
                    }`}
                  >
                    {l.name ?? "Unnamed Place"}
                  </p>

                  {isStart && (
                    <span
                      className="
                        ml-2
                        px-2 py-0.5
                        text-xs font-bold
                        rounded-full
                        bg-[#F3B54D]
                        text-white
                      "
                    >
                      Start
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 truncate">
                  {l.address}
                </p>

                <p className="text-xs text-gray-400">
                  {l.lat.toFixed(5)}, {l.lng.toFixed(5)}
                </p>
              </div>

              {/* RIGHT: Remove */}
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(l.id)}
                  aria-label={`Remove ${l.name ?? "location"}`}
                  title="Remove"
                  className="
                    shrink-0
                    px-3 py-1.5
                    rounded-xl
                    text-sm font-semibold
                    text-gray-600
                    border border-gray-300
                    hover:bg-red-50 hover:text-red-600 hover:border-red-300
                    transition
                  "
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
