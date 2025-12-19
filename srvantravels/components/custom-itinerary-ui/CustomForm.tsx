"use client";
const SECONDS_PER_STOP = 3600;

import {
  useCustomerDetailsStore,
  useLocationsStore,
} from "@/store/custom-itinerary.store";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WarningDialog from "./WarningDialog";

type FormDetails = {
  date_of_travel: string;
  time_for_pickup: string;
  time_for_dropoff: string;
};

type CustomFormProps = {
  isRouted: boolean;
  time: number;
  numStops: number;
};

const pad = (n: number) => String(n).padStart(2, "0");
const asDate = (
  v: string | number | Date | null | undefined
): Date | undefined => {
  if (!v) return undefined;
  if (v instanceof Date) return isNaN(v.getTime()) ? undefined : v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
};

const toDateStr = (v?: string | number | Date | null | undefined) => {
  const d = asDate(v);
  return d
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    : "";
};

function timeToSeconds(timeString: string) {
  const [hours, minutes, seconds = 0] = timeString.split(":").map(Number);

  return hours * 3600 + minutes * 60 + seconds;
}

function isItineraryValid(itineraryTime: number, stopsTime: number) {
  return itineraryTime > stopsTime;
}

export default function CustomForm({
  isRouted,
  time,
  numStops,
}: CustomFormProps) {
  const router = useRouter();
  const details = useCustomerDetailsStore((l) => l.customerDetails);
  const selectedCount = useLocationsStore((l) => l.locations.length);
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingData, setPendingData] = useState<FormDetails | null>(null);

  const setCustomerDetails = useCustomerDetailsStore(
    (state) => state.setCustomerDetails
  );

  const navigate = (data: FormDetails) => {
    setCustomerDetails({
      date_of_travel: new Date(data.date_of_travel),
      time_for_pickup: data.time_for_pickup,
      time_for_dropoff: data.time_for_dropoff,
    });
    router.push(`/itinerary/customer-details`);
  };

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<FormDetails>({
    mode: "onChange",
    defaultValues: {
      date_of_travel: toDateStr(details?.date_of_travel),
      time_for_pickup: details?.time_for_pickup ?? "",
      time_for_dropoff: details?.time_for_dropoff ?? "",
    },
  });

  const canSubmit = isValid && selectedCount >= 2 && isRouted && time > 0;

  const onSubmit = async (FormData: FormDetails) => {
    const pickupSec = timeToSeconds(FormData.time_for_pickup);
    const dropoffSec = timeToSeconds(FormData.time_for_dropoff);

    let allocatedTime = dropoffSec - pickupSec;
    if (allocatedTime < 0) {
      allocatedTime = 0;
    }

    const drivingTimeOnly = Math.max(0, time);
    const stopsTime = selectedCount * SECONDS_PER_STOP;
    const totalRequiredTime = drivingTimeOnly + stopsTime;

    if (!canSubmit) {
      if (!isValid) alert("Please fill up the form.");
      else if (selectedCount < 2)
        alert("Please select at least two locations.");
      else if (!isRouted) alert("Please route your itinerary!");
      else if (time <= 0)
        alert("Route invalid (Time is 0). Please clear and re-route.");
      return;
    }

    if (allocatedTime < drivingTimeOnly) {
      alert(`Your itinerary is too short for your allocated time!`);
      return;
    }

    if (allocatedTime < totalRequiredTime) {
      setPendingData(FormData);
      setOpenDialog(true);
      return;
    }

    navigate(FormData);
  };

  return (
  <>
    <WarningDialog
      open={openDialog}
      onOpenChange={setOpenDialog}
      onConfirm={() => {
        if (pendingData) {
          navigate(pendingData);
          setOpenDialog(false);
        }
      }}
    />

    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat py-8 md:py-14 px-4 md:px-6"
      style={{
        backgroundImage: "url('/bg-images/bg8.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/40" />

      {/* Content */}
      <div className="relative z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            w-full max-w-4xl mx-auto
            bg-white rounded-3xl shadow-2xl
            p-8 md:p-10
          "
        >
          <h2 className="text-3xl font-extrabold text-[#36B9CB] mb-8 text-center">
            Travel Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date of travel */}
            <div>
              <label
                htmlFor="date_of_travel"
                className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
              >
                Select Date
              </label>
              <input
                id="date_of_travel"
                type="date"
                {...register("date_of_travel", { required: "Required" })}
                className="
                  block w-full rounded-xl
                  border border-gray-300
                  bg-white px-4 py-3
                  text-gray-800
                  focus:outline-none
                  focus:ring-2 focus:ring-[#36B9CB]
                  focus:border-[#36B9CB]
                  transition
                "
              />
            </div>

            {/* Pickup time */}
            <div>
              <label
                htmlFor="time_for_pickup"
                className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
              >
                Pickup Time
              </label>
              <input
                id="time_for_pickup"
                type="time"
                {...register("time_for_pickup", { required: "Required" })}
                className="
                  block w-full rounded-xl
                  border border-gray-300
                  bg-white px-4 py-3
                  text-gray-800
                  focus:outline-none
                  focus:ring-2 focus:ring-[#36B9CB]
                  focus:border-[#36B9CB]
                  transition
                "
              />
            </div>

            {/* Dropoff time */}
            <div>
              <label
                htmlFor="time_for_dropoff"
                className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
              >
                Dropoff Time
              </label>
              <input
                id="time_for_dropoff"
                type="time"
                {...register("time_for_dropoff", { required: "Required" })}
                className="
                  block w-full rounded-xl
                  border border-gray-300
                  bg-white px-4 py-3
                  text-gray-800
                  focus:outline-none
                  focus:ring-2 focus:ring-[#36B9CB]
                  focus:border-[#36B9CB]
                  transition
                "
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="
                px-10 py-3 rounded-2xl
                bg-gradient-to-r from-[#F3B54D] to-[#eaa93f]
                text-white font-bold
                shadow-md
                hover:shadow-lg
                hover:-translate-y-0.5
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);

}
