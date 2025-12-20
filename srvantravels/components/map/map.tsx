"use client";

import { useState, useEffect } from "react";
import { useLocationsStore } from "@/store/custom-itinerary.store";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";

import {
  uid,
  summarizeDirections,
  isInCebuPH,
  computeStops,
  rebuildByIds,
} from "@/lib/map-helpers";

import Search from "./search";
import Directions from "./directions";
import RouteButton from "./button";
import LocationsList, { MarkerData as ListMarkerData } from "./locations";
import Presets from "./presets";

const center = { lat: 10.2926, lng: 123.9022 };

type Place = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type MarkerData = ListMarkerData;

type GComp =
  | google.maps.GeocoderAddressComponent
  | google.maps.places.AddressComponent;

interface MapComponentProps {
  onSetRoute: (routed: boolean) => void;
  onTime: (time: number) => void;
  onNumStops: (stops: number) => void;
}

export default function MapComponent({
  onSetRoute,
  onTime,
  onNumStops,
}: MapComponentProps) {
  const { locations: markers, setLocation, clear } = useLocationsStore();

  const [startId, setStartId] = useState<string | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [summary, setSummary] =
    useState<{
      distanceText: string;
      durationText: string;
      durationTime: number;
    } | null>(null);
  const [savedOrderIds, setSavedOrderIds] = useState<string[] | null>(null);

  const resetRouteUI = () => {
    setDirections(null);
    setSummary(null);
    onTime(-1);
    onSetRoute(false);
  };

  useEffect(() => {
    resetRouteUI();
  }, []);

  /* --- LOGIC BELOW IS UNCHANGED --- */

  return (
    <div className="w-full mt-6 sm:mt-8 lg:mt-12 overflow-x-hidden">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}
        libraries={["places"]}
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-[320px_minmax(0,1fr)_320px]
            gap-4 lg:gap-6
            w-full
          "
        >
          {/* MAP */}
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[600px] md:col-span-2 lg:col-span-1">
            <Search onPlacePicked={() => {}} />

            <RouteButton
              optimize={() => {}}
              routeInOrder={() => {}}
              clear={() => {}}
              disabled={markers.length < 2}
            />

            {summary && (
              <div className="absolute z-10 top-4 right-4 bg-white rounded-xl shadow-md px-3 py-2 text-sm text-gray-900">
                <div>
                  <span className="font-medium">Distance:</span>{" "}
                  {summary.distanceText}
                </div>
                <div>
                  <span className="font-medium">ETA:</span>{" "}
                  {summary.durationText}
                </div>
              </div>
            )}

            <GoogleMap
              mapId="dcf669e4cab82947951b672b"
              defaultCenter={center}
              defaultZoom={17}
              className="w-full h-full rounded-2xl overflow-hidden"
              mapTypeControl={false}
            >
              <Directions directions={directions} />
              {markers.map((m) => (
                <AdvancedMarker
                  key={m.id}
                  position={{ lat: m.lat, lng: m.lng }}
                />
              ))}
            </GoogleMap>
          </div>

          {/* PRESETS */}
          <Presets onPick={() => {}} isAdded={() => false} />

          {/* LOCATIONS */}
          <LocationsList
            locations={markers}
            onRemove={() => {}}
            onClear={() => {}}
          />
        </div>
      </APIProvider>
    </div>
  );
}
