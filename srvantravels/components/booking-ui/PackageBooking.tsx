"use client";

import { useEffect, useState } from "react";
import Packages from "../ui/Packages";
import { usePackageStore } from "@/store/package-itinerary.store";
import Link from "next/link";

interface Package {
  package_ID: number;
  package_name: string;
  inclusions: string;
  number_of_PAX: number;
  route: string;
  description: string;
  is_made_by_manager: number;
  is_available: boolean;
  package_picture: string;
}

export default function PackageBooking({ package_ID }: { package_ID: number }) {
  const [pack, setPack] = useState<Package | null>(null);
  const setBookedPackage = usePackageStore((state) => state.setBookedPackage);

  useEffect(() => {
    fetch(`/api/packages/${package_ID}`)
      .then((response) => response.json())
      .then((json) => setPack(json.packageById));
  }, [package_ID]);

  console.log("PACKAGE ID: ", package_ID);

  return (
    <div>
      {pack ? <Packages key={pack.package_ID} {...pack} /> : <p>Loading...</p>}

      <div className="flex">
        <Link
          href="/packages"
          className="p-5 rounded-3xl bg-cyan-400 text-amber-50 hover:bg-cyan-900 "
        >
          Back to Plans
        </Link>
        <Link
          href={`/packages/${package_ID}/booking/page1`}
          onClick={() => {
            if (pack) setBookedPackage(pack);
          }}
          className="p-5 rounded-3xl bg-orange-500 text-amber-50 hover:bg-orange-900"
        >
          Book this Package
        </Link>
      </div>
    </div>
  );
}
