// components/custom-itinerary-ui/CustomFormMap.tsx

"use client";

import CustomForm from "@/components/custom-itinerary-ui/CustomForm";
import MapComponent from "@/components/map/map";
import { useState } from "react";

export default function CustomFormMap() {
  const [isRouted, setIsRouted] = useState(false);
  const [time, setTime] = useState(-1);
  const [numStops, setNumStops] = useState(0);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-20">
      {/* TOP — FORM */}
      <CustomForm
        isRouted={isRouted}
        time={time}
        numStops={numStops}
      />

      {/* DIVIDER */}
      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        <span className="relative z-10 px-4 py-2 text-sm font-semibold text-white/80 tracking-wide">
          Route Planner
        </span>
      </div>

      {/* BOTTOM — MAP */}
      <MapComponent
        onSetRoute={setIsRouted}
        onTime={setTime}
        onNumStops={setNumStops}
      />
    </div>
  );
}
