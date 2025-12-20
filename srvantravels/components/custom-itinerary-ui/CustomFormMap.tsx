"use client";

import CustomForm from "@/components/custom-itinerary-ui/CustomForm";
import MapComponent from "@/components/map/map";
import { useState } from "react";

export default function CustomFormMap() {
  const [isRouted, setIsRouted] = useState(false);
  const [time, setTime] = useState(-1);
  const [numStops, setNumStops] = useState(0);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* LEFT — FORM */}
      <CustomForm
        isRouted={isRouted}
        time={time}
        numStops={numStops}
      />

      {/* RIGHT — MAP */}
      <MapComponent
        onSetRoute={(routed) => setIsRouted(routed)}
        onTime={(time) => setTime(time)}
        onNumStops={(stops) => setNumStops(stops)}
      />
    </div>
  );
}
