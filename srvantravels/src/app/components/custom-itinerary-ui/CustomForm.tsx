"use client";

import { useInitialDetailsStore } from "@store/custom-itinerary.store";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type details = {
  date_of_travel: Date;
  time_for_pickup: Date;
  time_for_dropoff: Date;
};

export default function CustomForm() {
  const router = useRouter();
  const setInitialDetails = useInitialDetailsStore(
    (state) => state.setInitDets
  );

  const { register, handleSubmit } = useForm<details>();

  const onSubmit = async (FormData: details) => {
    setInitialDetails({
      date_of_travel: new Date(FormData.date_of_travel),
      time_for_pickup: new Date(FormData.time_for_pickup),
      time_for_dropoff: new Date(FormData.time_for_dropoff),
    });

    router.push(`/home`);
  };

  return (
    <>
      <form className="w-full max-w-3xl m-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date of travel */}
          <div>
            <label
              htmlFor="date_of_travel"
              className="block text-xs font-semibold tracking-wide text-gray-700 mb-2 uppercase"
            >
              Select Date
            </label>
            <input
              id="date_of_travel"
              type="date"
              {...register("date_of_travel")}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Pickup time */}
          <div>
            <label
              htmlFor="time_for_pickup"
              className="block text-xs font-semibold tracking-wide text-gray-700 mb-2 uppercase"
            >
              Pickup Time
            </label>
            <input
              id="time_for_pickup"
              type="time"
              {...register("time_for_pickup")}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Dropoff time */}
          <div>
            <label
              htmlFor="time_for_dropoff"
              className="block text-xs font-semibold tracking-wide text-gray-700 mb-2 uppercase"
            >
              Time for Dropoff
            </label>
            <input
              id="time_for_dropoff"
              type="time"
              {...register("time_for_dropoff")}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
      </form>
    </>
  );
}
