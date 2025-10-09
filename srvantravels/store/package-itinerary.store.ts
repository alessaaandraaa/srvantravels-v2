import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

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

interface Customer_Details {
  customer_id: number;
  itinerary_id: number | null; //package id btw
  type: "PACKAGE";
  number_of_PAX: number;
  date_of_travel: Date;
  number_of_luggage: number | null;
  ID_picture: string | null;
  // pickup_address: string,
}

type payment_method = string;

interface PackageState {
  bookedPackage: Package | null;
  setBookedPackage: (pkg: Package) => void;
}

interface CustomerState {
  customerDetails: Customer_Details | null;
  setCustomerDetails: (pkg: Customer_Details) => void;
}

interface PaymentState {
  payment_method: payment_method | null;
  setPayment: (pkg: payment_method) => void;
}

const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      payment_method: null,
      setPayment: (pkg) => set({ payment_method: pkg }),
    }),
    { name: "payment-store" }
  )
);

const usePackageStore = create<PackageState>()(
  persist(
    (set) => ({
      bookedPackage: null,
      setBookedPackage: (pkg) => set({ bookedPackage: pkg }),
    }),
    { name: "package-store" }
  )
);

const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customerDetails: null,
      setCustomerDetails: (pkg) => set({ customerDetails: pkg }),
    }),
    { name: "customer-store" }
  )
);

export { usePackageStore, useCustomerStore, usePaymentStore };
