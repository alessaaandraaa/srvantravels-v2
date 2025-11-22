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
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch("/api/packages")
      .then((response) => response.json())
      .then((json) => setPackages(json.packages));
  }, []);

  return (
    <div>
      <h2> PACKAGE LIST </h2>
      <ul>
        {packages.map((pack: Package) => (
          <Packages key={pack.package_ID} {...pack} />
        ))}
      </ul>
    </div>
  );
}
