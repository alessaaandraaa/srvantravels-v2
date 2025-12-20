"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCustomerDetailsStore } from "@/store/custom-itinerary.store";
import Link from "next/link";

type customerForm = {
  pax: number;
  date_of_travel: string;
  luggage: number;
  file_image: FileList;
  time_for_pickup: string;
  time_for_dropoff: string;
};

type id = { user_id: number };

const pad = (n: number) => String(n).padStart(2, "0");
const asDate = (v: string | number | Date | null | undefined) => {
  if (!v) return undefined;
  const d = new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
};
const toDateStr = (v?: string | number | Date | null | undefined) => {
  const d = asDate(v);
  return d
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    : "";
};

export default function CustomFormP2({ user_id }: id) {
  const router = useRouter();
  const setCustomerDetails = useCustomerDetailsStore(
    (state) => state.setCustomerDetails
  );
  const details = useCustomerDetailsStore((s) => s.customerDetails);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const { register, handleSubmit } = useForm<customerForm>({
    defaultValues: {
      date_of_travel: toDateStr(details?.date_of_travel),
      time_for_pickup: details?.time_for_pickup ?? "",
      time_for_dropoff: details?.time_for_dropoff ?? "",
    },
  });

  const onSubmit = async (data: customerForm) => {
    const file = data.file_image?.[0];
    const base64Image = file ? await toBase64(file) : null;

    setCustomerDetails({
      customer_id: Number(user_id),
      type: "CUSTOM",
      number_of_PAX: data.pax,
      date_of_travel: new Date(data.date_of_travel),
      time_for_pickup: data.time_for_pickup,
      number_of_luggage: data.luggage,
      ID_picture: base64Image,
    });

    router.push(`/itinerary/customer-details/summary`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        w-full
        bg-white
        rounded-3xl
        shadow-lg
        border border-black/5
        p-8
        space-y-8
      "
    >
      <h2 className="text-2xl font-extrabold text-gray-900">
        Customer Details
      </h2>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Passengers
          </label>
          <input
            type="number"
            {...register("pax")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Pickup Date
          </label>
          <input
            type="date"
            {...register("date_of_travel")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Pickup Time
          </label>
          <input
            type="time"
            {...register("time_for_pickup")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Luggage (optional)
          </label>
          <input
            type="number"
            {...register("luggage")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Upload ID Image
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            {...register("file_image")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-between pt-6">
        <Link
          href="/itinerary"
          className="text-sm font-semibold text-gray-600 hover:text-black"
        >
          ← Back
        </Link>

        <button
          type="submit"
          className="
            px-8 py-3
            rounded-xl
            bg-[#36B9CB]
            text-white
            font-semibold
            hover:bg-[#2fa6b6]
            transition
          "
        >
          Proceed to Summary →
        </button>
      </div>
    </form>
  );
}
