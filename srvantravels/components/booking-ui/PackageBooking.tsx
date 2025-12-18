"use client";

import { useEffect, useState } from "react";
import Packages from "../ui/Packages";
import { usePackageStore } from "@store/package-itinerary.store";
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

  return (
    <main className="min-h-screen bg-[rgba(121,198,209,0.52)] flex justify-center px-6 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10 space-y-10">

        {/* Package Details */}
        {pack ? (
          <Packages key={pack.package_ID} {...pack} />
        ) : (
          <p className="text-center text-cyan-700 text-lg">Loading package...</p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between">
          <Link
            href="/packages"
            className="flex-1 text-center py-4 rounded-2xl 
                       bg-[#36B9CB] text-white font-semibold
                       hover:bg-cyan-800 transition"
          >
            ← Back to Plans
          </Link>

          <Link
            href={`/packages/${package_ID}/booking/page1`}
            onClick={() => {
              if (pack) setBookedPackage(pack);
            }}
            className="flex-1 text-center py-4 rounded-2xl 
                       bg-[#F3B54D] text-white font-semibold
                       hover:bg-orange-600 transition"
          >
            Book this Package
          </Link>
        </div>
      </div>
    </main>
  );
}
