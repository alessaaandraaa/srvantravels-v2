import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { ITINERARY_TYPES } from "@/types/db.types";

/*interface InitialDetails {
  date_of_travel: Date;
  time_for_pickup: Date;
  time_for_dropoff: Date;
}*/
type payment_method = string;

interface Itinerary {
  price: number;
  type: "CUSTOM";
}

interface Customer_Details {
  customer_id: number;
  itinerary_id: number | null; // custom itinerary id btw
  type: "CUSTOM";
  number_of_PAX: number;
  date_of_travel: Date;
  number_of_luggage: number | null;
  ID_picture: string | null;
  time_for_pickup: string;
  time_for_dropoff: string;
  // pickup_address: string,
}

interface Custom_Itinerary {
  custom_ID: number;
  is_made_by_customer: number;
}

interface Locations {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  address: string;
  isCustom: boolean;
}

interface PaymentState {
  payment_method: payment_method | null;
  setPayment: (pkg: payment_method) => void;
}

interface CustomerDetailsState {
  customerDetails: Partial<Customer_Details | null>;
  setCustomerDetails: (det: Partial<Customer_Details>) => void;
  resetCustomerDetails: () => void;
}

interface CustomItineraryState {
  customItinerary: Custom_Itinerary | null;
  setCustomItinerary: (i: Custom_Itinerary) => void;
}

interface LocationsState {
  locations: Locations[];
  setLocation: (l: Locations) => void;
  setLocationAll: (l: Locations[]) => void;
  remove: (id: string) => void;
  clear: () => void;
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

const useCustomerDetailsStore = create<CustomerDetailsState>()(
  persist(
    (set) => ({
      customerDetails: {},
      setCustomerDetails: (det) =>
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...det },
        })),
      resetCustomerDetails: () => set({ customerDetails: {} }),
    }),
    {
      name: "customer-details-store",
    }
  )
);

const useCustomItineraryStore = create<CustomItineraryState>()(
  persist(
    (set) => ({
      customItinerary: null,
      setCustomItinerary: (c) => set({ customItinerary: c }),
    }),
    { name: "custom-itinerary-store" }
  )
);

const useLocationsStore = create<LocationsState>()(
  persist(
    (set, get) => ({
      locations: [],
      setLocation: (loc) => set({ locations: [...get().locations, loc] }),
      setLocationAll: (list) => set({ locations: list }),
      remove: (id) =>
        set({ locations: get().locations.filter((l) => l.id !== id) }),
      clear: () => set({ locations: [] }),
    }),
    { name: "locations-store" }
  )
);

export {
  usePaymentStore,
  useCustomerDetailsStore,
  useCustomItineraryStore,
  useLocationsStore,
};
