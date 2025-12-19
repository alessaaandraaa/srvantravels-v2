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
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!bookedPackage || bookedPackage.package_ID.toString() !== params.id) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        py-16
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-8 md:p-10
            space-y-6
          "
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#36B9CB] text-center">
            PACKAGE SUMMARY
          </h1>

          <hr className="border-gray-300" />

          <div className="space-y-4 text-gray-800 text-sm md:text-base">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {bookedPackage.package_name}
            </p>

            <p>
              <span className="font-semibold">Description:</span>{" "}
              {bookedPackage.description}
            </p>

            <p>
              <span className="font-semibold">Route:</span>{" "}
              {bookedPackage.route}
            </p>

            <p>
              <span className="font-semibold">Inclusions:</span>{" "}
              {bookedPackage.inclusions}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
