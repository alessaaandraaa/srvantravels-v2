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
              {...register("date_of_travel", { required: "Required" })}
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
              {...register("time_for_pickup", { required: "Required" })}
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
              {...register("time_for_dropoff", { required: "Required" })}
              className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <input
              type="submit"
              className="bg-teal-500 rounded-2xl p-3 text-white hover:bg-teal-900"
            />
          </div>
        </div>
      </form>
    </>
  );
}
