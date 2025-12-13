"use client";

import { useEffect, useState } from "react";
import Packages from "./Packages";
import PackageButton from "./PackageButton";
import { PackageWithTags } from "@/types/package.types";
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
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch("/api/packages")
      .then((response) => response.json())
      .then((json) => setPackages(json.packages));
  }, []);

  console.log("PACKAGES: ", packages);

  return (
    <div>
      <h2> PACKAGE LIST </h2>
      <ul>
        {packages.map((pack: PackageWithTags) => (
          <div
            key={pack.package_ID}
            className="p-3 pb-10 bg-white border-5 border-teal-500 rounded-2xl shadow-2xl m-5"
          >
            <Packages {...pack} />
            <PackageButton package_ID={pack.package_ID} />
          </div>
        ))}
      </ul>
    </div>
  );
}
