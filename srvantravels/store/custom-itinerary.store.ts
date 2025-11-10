import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface InitialDetails {
  date_of_travel: Date;
  time_for_pickup: Date;
  time_for_dropoff: Date;
}

interface InitialDetailsState {
  initDets: InitialDetails | null;
  setInitDets: (det: InitialDetails) => void;
}

const useInitialDetailsStore = create<InitialDetailsState>()(
  persist(
    (set) => ({
      initDets: null,
      setInitDets: (det) => set({ initDets: det }),
    }),
    { name: "initial-details-store" }
  )
);

export { useInitialDetailsStore };
