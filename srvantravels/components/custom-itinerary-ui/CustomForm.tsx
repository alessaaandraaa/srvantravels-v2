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
  const [h, m, s = 0] = timeString.split(":").map(Number);
  return h * 3600 + m * 60 + s;
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
    formState: { isValid, isSubmitting },
  } = useForm<FormDetails>({
    mode: "onChange",
    defaultValues: {
      date_of_travel: toDateStr(details?.date_of_travel),
      time_for_pickup: details?.time_for_pickup ?? "",
      time_for_dropoff: details?.time_for_dropoff ?? "",
    },
  });

  const canSubmit = isValid && selectedCount >= 2 && isRouted && time > 0;

  const onSubmit = (data: FormDetails) => {
    const pickup = timeToSeconds(data.time_for_pickup);
    const dropoff = timeToSeconds(data.time_for_dropoff);
    const allocated = Math.max(0, dropoff - pickup);

    const drivingTime = Math.max(0, time);
    const stopsTime = selectedCount * SECONDS_PER_STOP;
    const totalNeeded = drivingTime + stopsTime;

    if (!canSubmit) return;

    if (allocated < totalNeeded) {
      setPendingData(data);
      setOpenDialog(true);
      return;
    }

    navigate(data);
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full
          max-w-3xl
          bg-white
          rounded-3xl
          border
          shadow-xl
          p-8
        "
      >
        <h2 className="text-3xl font-extrabold text-[#36B9CB] mb-8 text-center">
          Travel Details
        </h2>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
              Date of Travel
            </label>
            <input
              type="date"
              {...register("date_of_travel", { required: true })}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
              Pickup Time
            </label>
            <input
              type="time"
              {...register("time_for_pickup", { required: true })}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
              Dropoff Time
            </label>
            <input
              type="time"
              {...register("time_for_dropoff", { required: true })}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>
        </div>

        {/* CONTINUE BUTTON — AFTER FORM */}
        <div className="mt-12 flex justify-end">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="
              px-12 py-3
              rounded-2xl
              bg-[#F3B54D]
              text-white
              font-bold
              text-base
              hover:bg-[#eaa93f]
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            Continue →
          </button>
        </div>
      </form>
    </>
  );
}
