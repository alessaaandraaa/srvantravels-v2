"use client";

import { useEffect, useState } from "react";
import Packages from "../user-ui/Packages";
import { usePackageStore } from "@/store/package-itinerary.store";
import Link from "next/link";
import { useRouter } from "next/router";

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
  package_itinerary_tag: {
    tag: {
      color: string;
      name: string;
      tag_ID: number;
    };
    package_ID: number;
    tag_ID: number;
    package_itinerary_tag_ID: number;
  }[];
}

export default function PackageBooking({ package_ID }: { package_ID: number }) {
  const router = useRouter();
  const [pack, setPack] = useState<Package | null>(null);
  const setBookedPackage = usePackageStore((state) => state.setBookedPackage);

  useEffect(() => {
    fetch(`/api/packages/${package_ID}`)
      .then((response) => response.json())
      .then((json) => setPack(json.packageById));
  }, [package_ID]);

  return (
    <main className="flex justify-center px-4 md:px-6">
      <div className="w-full max-w-5xl">
        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#36B9CB] mb-2">
            Package Details
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Review the package information and book your travel experience
          </p>
        </div>

        {/* Package Details Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 mb-6">
          {pack ? (
            <Packages key={pack.package_ID} {...pack} />
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-[#36B9CB] border-t-transparent rounded-full" />
              <p className="text-center text-[#36B9CB] text-lg ml-3">
                Loading package details...
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <Link
              href="/packages"
              className="
                flex-1 text-center py-4 md:py-5 rounded-2xl 
                bg-gradient-to-r from-[#36B9CB] to-[#2fa6b6]
                text-white font-bold text-lg
                shadow-lg
                hover:shadow-xl hover:-translate-y-1
                active:translate-y-0
                transition-all duration-200
              "
            >
              ← Back to Plans
            </Link>

            <Link
  href="#"
  onClick={(e) => {
    if (pack) {
      setBookedPackage(pack);
      router.push(`/packages/${package_ID}/booking/page1`);
    }
  }}
  className="
    flex-1 text-center py-4 md:py-5 rounded-2xl 
    bg-gradient-to-r from-[#F3B54D] to-[#eaa93f]
    text-white font-bold text-lg
    shadow-lg
    hover:shadow-xl hover:-translate-y-1
    active:translate-y-0
    transition-all duration-200
  "
>
  Book this Package →
</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
