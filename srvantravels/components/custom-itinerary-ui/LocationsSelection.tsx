"use client";
import { useLocationsStore } from "@/store/custom-itinerary.store";

export default function LocationsSelection() {
  const locations = useLocationsStore((state) => state.locations);

  return (
    <div>
      <div className="shadow-2xl w-full gap-2 p-5 rounded-2xl">
        <h1 className="text-2xl font-bold">CHOSEN PIT STOPS</h1>
        {locations.map((l) => (
          <div className="border p-3 m-3 rounded-2xl" key={l.id}>
            <h1>{l.name}</h1>
            <p>{l.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
