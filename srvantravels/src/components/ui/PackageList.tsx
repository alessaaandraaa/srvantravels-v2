"use client";

import { useEffect, useState } from "react";
import Packages from "./Packages";
import { PackageWithTags } from "@/types/package.types";

export default function PackageList() {
  const [packages, setPackages] = useState<PackageWithTags[]>([]);

  useEffect(() => {
    fetch("/api/packages")
      .then((response) => response.json())
      .then((json) => setPackages(json.packages));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#79C6D1]/50 to-white px-6 py-14">
      
      {/* HEADER */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#36B9CB] mb-10 tracking-tight">
        WELCOME TO SR VAN TRAVELS!
      </h2>

      {/* CARD LIST */}
      <ul className="flex flex-col items-center gap-2">
        {Array.isArray(packages) &&
          packages.map((pack) => (
            <li key={pack.package_ID} className="w-full max-w-6xl">
              <Packages {...pack} />
            </li>
          ))}
      </ul>
    </div>
  );
}
