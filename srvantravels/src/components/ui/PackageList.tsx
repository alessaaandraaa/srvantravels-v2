"use client";

import { useEffect, useState } from "react";
import Packages from "./Packages";

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

export default function PackageList() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetch("/api/packages")
      .then((response) => response.json())
      .then((json) => setPackages(json.packages));
  }, []);

  return (
    <main className="min-h-screen bg-[rgba(121,198,209,0.52)] px-10 py-14">
      <h1 className="text-4xl font-bold text-center text-[#36B9CB] mb-12">
        Available Travel Packages
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {packages.map((pack: Package) => (
          <Packages key={pack.package_ID} {...pack} />
        ))}
      </ul>
    </main>
  );
}
