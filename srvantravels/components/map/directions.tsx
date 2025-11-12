"use client";
import { useEffect, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export default function Directions({
  directions,
}: {
  directions: google.maps.DirectionsResult | null;
}) {
  const map = useMap();
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!map || !window.google) return;

    if (!rendererRef.current) {
      rendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: false,
      });
      rendererRef.current.setMap(map);
    }

    const renderer = rendererRef.current;

    if (!directions) {
      // Safe clear without throwing InvalidValueError
      renderer.set("directions", null);
      return;
    }

    renderer.setDirections(directions);
  }, [map, directions]);

  useEffect(() => {
    return () => {
      rendererRef.current?.setMap(null);
      rendererRef.current = null;
    };
  }, []);

  return null;
}
