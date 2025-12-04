"use client";

import CustomForm from "@/components/custom-itinerary-ui/CustomForm";
import MapComponent from "@/components/map/map";
import { useState } from "react";
export default function CustomFormMap() {
  const [isRouted, setIsRouted] = useState(false);
  const [time, setTime] = useState(-1);
  const [numStops, setNumStops] = useState(0);

  /*
    0 - default invalid
    1 - valid, but risky itinerary
    2 - valid
  */

  return (
    <div>
      <div className="flex items-center justify-center align-middle">
        <CustomForm isRouted={isRouted} time={time} numStops={numStops} />
      </div>
      <MapComponent
        onSetRoute={(routed) => setIsRouted(routed)}
        onTime={(time) => setTime(time)}
        onNumStops={(stops) => setNumStops(stops)}
      />
    </div>
  );
}
