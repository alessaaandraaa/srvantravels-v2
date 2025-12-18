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
    return <p>Loading...</p>; // wait for Zustand hydration
  }

  if (!bookedPackage || bookedPackage.package_ID.toString() !== params.id) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="border-amber-600 m-10">
      <h1>PACKAGE SUMMARY</h1>
      <hr />
      <p>
        <b>Name:</b> {bookedPackage.package_name}
      </p>
      <p>
        <b>Description:</b> {bookedPackage.description}
      </p>
      <p>
        <b>Route:</b> {bookedPackage.route}
      </p>
      <p>
        <b>Inclusions:</b> {bookedPackage.inclusions}
      </p>
    </div>
  );
}
