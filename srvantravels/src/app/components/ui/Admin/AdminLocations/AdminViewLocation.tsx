"use client";

import AdminMap from "@/components/map/adminMap";
import AdminForm from "./AdminForm";
import { useState } from "react";

type Place = {
  name: string | undefined;
  address: string;
  lat: number;
  lng: number;
};

export default function AdminViewLocation() {
  const [marker, setMarker] = useState<Place | null>(null);

  const handleMarkerSelect = (newMarker: Place) => {
    setMarker(newMarker);
  };
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="col-span-2 rounded-lg bg-primary-foreground h-[600px]">
        <AdminMap
          // 4. Pass the setter function down to AdminMap
          onMarkerSelect={handleMarkerSelect}
          // Optionally pass the current marker to highlight it
          selectedMarker={marker}
        />
      </div>
      <div className="flex flex-col col-span-2 gap-4">
        <div className="rounded-lg bg-primary-foreground h-[275px]">
          {marker ? (
            <AdminForm {...marker} />
          ) : (
            <p className="text-gray-400">
              Click a location on the map to start editing.
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary-foreground h-[275px]">Table</div>
      </div>
    </div>
  );
}
