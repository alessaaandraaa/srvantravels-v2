"use client";
import { useLocationsStore } from "@/store/custom-itinerary.store";

export default function LocationsSelection() {
  const locations = useLocationsStore((state) => state.locations);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 text-black">
          <h1 className="text-2xl font-extrabold mb-4">
            Chosen Pit Stops
          </h1>

          {locations.length === 0 ? (
            <p className="text-sm text-gray-600">
              No pit stops selected yet.
            </p>
          ) : (
            <div className="space-y-3">
              {locations.map((l) => (
                <div
                  key={l.id}
                  className="
                    border border-gray-200
                    rounded-2xl
                    p-4
                    hover:shadow-md
                    transition
                  "
                >
                  <h2 className="font-semibold text-base">
                    {l.name ?? "Unnamed Location"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {l.address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
