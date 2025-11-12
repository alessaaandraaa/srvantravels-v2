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
    <div className="w-[320px] bg-white h-full rounded-2xl p-4 overflow-y-auto shadow-md mr-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm">No presets available</p>
      )}

      <ul className="space-y-2">
        {items.map((p) => {
          const added = isAdded?.(p) ?? false;
          return (
            <li
              key={keyOf(p)}
              className="p-3 border rounded-lg flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{p.name}</p>
              </div>
              <button
                type="button"
                onClick={() => onPick(p)}
                disabled={added}
                className={`shrink-0 text-sm px-3 py-1.5 rounded-md border ${
                  added ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
                title={added ? "Already added" : "Add to my list"}
                aria-disabled={added}
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
