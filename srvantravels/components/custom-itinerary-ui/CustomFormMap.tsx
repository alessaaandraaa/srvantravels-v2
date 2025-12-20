"use client";

import CustomForm from "@/components/custom-itinerary-ui/CustomForm";
import MapComponent from "@/components/map/map";
import { useState } from "react";

export default function CustomFormMap() {
  const [isRouted, setIsRouted] = useState(false);
  const [time, setTime] = useState(-1);
  const [numStops, setNumStops] = useState(0);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-16">
      {/* TOP — FORM */}
      <CustomForm
        isRouted={isRouted}
        time={time}
        numStops={numStops}
      />

      {/* BOTTOM — MAP SECTION */}
      <MapComponent
        onSetRoute={setIsRouted}
        onTime={setTime}
        onNumStops={setNumStops}
      />
    </div>
  );
}
