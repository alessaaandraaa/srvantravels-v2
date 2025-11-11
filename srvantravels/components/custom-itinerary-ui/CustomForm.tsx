"use client";

import {
  useCustomerDetailsStore,
  useLocationsStore,
} from "@/store/custom-itinerary.store";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormDetails = {
  date_of_travel: string;
  time_for_pickup: string;
  time_for_dropoff: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const asDate = (v: unknown): Date | undefined => {
  if (!v) return undefined;
  if (v instanceof Date) return isNaN(v.getTime()) ? undefined : v;
  const d = new Date(v as any);
  return isNaN(d.getTime()) ? undefined : d;
};

const toDateStr = (v?: unknown) => {
  const d = asDate(v);
  return d
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    : "";
};

export default function CustomForm() {
  const router = useRouter();
  const details = useCustomerDetailsStore((l) => l.customerDetails);
  const selectedCount = useLocationsStore((l) => l.locations.length);

  const setCustomerDetails = useCustomerDetailsStore(
    (state) => state.setCustomerDetails
  );

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

  const canSubmit = isValid && selectedCount >= 2;

  const onSubmit = async (FormData: FormDetails) => {
    if (canSubmit) {
      setCustomerDetails({
        date_of_travel: new Date(FormData.date_of_travel),
        time_for_pickup: FormData.time_for_pickup,
        time_for_dropoff: FormData.time_for_dropoff,
      });

      router.push(`/itinerary/customer-details`);
    } else {
      if (!isValid) {
        alert("Please fill up the form.");
      } else if (selectedCount < 2) {
        alert("Please select at least two locations and route them.");
      }
    }
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
