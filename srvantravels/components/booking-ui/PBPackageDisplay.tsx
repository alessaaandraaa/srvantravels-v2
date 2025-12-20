"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePackageStore } from "@/store/package-itinerary.store";

export default function PB1PackageDisplay() {
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

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        space-y-6
        h-full
      "
    >
      <h2 className="text-2xl font-extrabold text-[#36B9CB]">
        Package Summary
      </h2>

      <div className="space-y-4 text-gray-800 text-sm md:text-base">
        <p>
          <span className="font-semibold text-gray-600">Name:</span>{" "}
          {bookedPackage.package_name}
        </p>

        <p>
          <span className="font-semibold text-gray-600">
            Description:
          </span>{" "}
          {bookedPackage.description}
        </p>

        <p>
          <span className="font-semibold text-gray-600">Route:</span>{" "}
          {bookedPackage.route}
        </p>

        <p>
          <span className="font-semibold text-gray-600">
            Inclusions:
          </span>{" "}
          {bookedPackage.inclusions}
        </p>
      </div>
    </div>
  );
}
