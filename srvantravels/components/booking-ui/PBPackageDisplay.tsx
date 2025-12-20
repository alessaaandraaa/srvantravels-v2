"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePackageStore } from "@/store/package-itinerary.store";

export default function PBPackageDisplay() {
  const params = useParams();
  const router = useRouter();
  const bookedPackage = usePackageStore((state) => state.bookedPackage);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (
      hydrated &&
      (!bookedPackage || bookedPackage.package_ID.toString() !== params.id)
    ) {
      router.push("/packages");
    }
  }, [hydrated, bookedPackage, params.id, router]);

  if (!hydrated) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  if (!bookedPackage || bookedPackage.package_ID.toString() !== params.id) {
    return <p className="text-center mt-10 text-white">Redirecting...</p>;
  }

  // Helper: bullets for route + inclusions only
  const toBullets = (text?: string) =>
    text
      ?.split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8 md:p-10
        space-y-8
      "
    >
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-[#36B9CB]">
          Package Summary
        </h2>
        <p className="text-lg font-semibold text-gray-800">
          {bookedPackage.package_name}
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* CONTENT */}
      <div className="space-y-8 text-sm md:text-base text-gray-700">
        {/* DESCRIPTION — NO BULLETS */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-800">Description</h3>
          <p className="leading-relaxed">
            {bookedPackage.description}
          </p>
        </div>

        {/* ROUTE + INCLUSIONS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >
          {/* ROUTE */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-800">Route</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {toBullets(bookedPackage.route).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* INCLUSIONS */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-800">Inclusions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {toBullets(bookedPackage.inclusions).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
