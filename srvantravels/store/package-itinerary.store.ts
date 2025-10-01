import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

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

interface PackageState {
  bookedPackage: Package | null;
  setBookedPackage: (pkg: Package) => void;
}

const usePackageStore = create<PackageState>()(
  persist(
    (set) => ({
      bookedPackage: null,
      setBookedPackage: (pkg) => set({ bookedPackage: pkg }),
    }),
    { name: "package-store" }
  )
);

export default usePackageStore;
