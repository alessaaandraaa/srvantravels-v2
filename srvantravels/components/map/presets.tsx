"use client";
import React, { useEffect, useState } from "react";

/* ----- Types ----- */
type Place = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type ApiPlace = {
  location_name?: unknown;
  location_address?: unknown;
  lat?: unknown;
  lng?: unknown;
};

type ApiResponse = {
  locations?: unknown;
};

/* ----- Runtime guards (tiny & fast) ----- */
const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;

const isApiPlace = (x: unknown): x is ApiPlace => isObject(x);

const toPlace = (x: ApiPlace): Place => ({
  name: String(x.location_name ?? ""),
  address: String(x.location_address ?? ""),
  lat: Number(x.lat),
  lng: Number(x.lng),
});

const isValidPlace = (p: Place) =>
  Boolean(
    p.name && p.address && Number.isFinite(p.lat) && Number.isFinite(p.lng)
  );

export default function Presets({
  onPick,
  isAdded,
  title = "Presets",
  src = "/api/locations?onlyPreset=true",
}: {
  onPick: (p: Place) => void;
  isAdded?: (p: Place) => boolean;
  title?: string;
  src?: string;
}) {
  const [items, setItems] = useState<Place[]>([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(src, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();

        const rawList = Array.isArray(data?.locations)
          ? (data.locations as unknown[])
          : [];
        const mapped = rawList
          .filter(isApiPlace)
          .map(toPlace)
          .filter(isValidPlace);

        if (alive) setItems(mapped);
      } catch (e) {
        console.error("[Presets] fetch failed:", e);
        if (alive) setItems([]);
      }
    })();

    return () => {
      alive = false;
    };
  }, [src]);

  const keyOf = (p: Place) => `${p.name}__${p.address}`;

  return (
  <div
    className="
      w-full lg:w-[320px]
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
    <div className="mb-4">
      <h2 className="text-xl font-extrabold text-[#36B9CB]">
        {title}
      </h2>
      <p className="text-xs text-gray-500">
        Quick add popular locations
      </p>
    </div>

    {items.length === 0 && (
      <div className="mt-6 text-center text-sm text-gray-500">
        No presets available
      </div>
    )}

    {/* List */}
    <ul className="space-y-3">
      {items.map((p) => {
        const added = isAdded?.(p) ?? false;

        return (
          <li
            key={keyOf(p)}
            className="
              flex items-center justify-between gap-3
              p-4
              rounded-2xl
              bg-white
              border border-gray-200
              hover:shadow-md
              transition
            "
          >
            {/* Place info */}
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {p.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {p.address}
              </p>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={() => onPick(p)}
              disabled={added}
              aria-disabled={added}
              title={added ? "Already added" : "Add to my list"}
              className={`
                shrink-0
                px-4 py-1.5
                rounded-xl
                text-sm font-semibold
                transition
                ${
                  added
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#36B9CB] text-white hover:bg-[#2fa6b6]"
                }
              `}
            >
              {added ? "Added" : "Add"}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

}
