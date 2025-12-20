"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCustomerDetailsStore } from "@/store/custom-itinerary.store";
import Link from "next/link";

type CustomerForm = {
  pax: number;
  date_of_travel: string;
  luggage: number;
  file_image: FileList;
  time_for_pickup: string;
};

type Props = {
  user_id: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

const toDateStr = (v?: string | number | Date | null) => {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export default function CustomFormP2({ user_id }: Props) {
  const router = useRouter();
  const setCustomerDetails = useCustomerDetailsStore(
    (state) => state.setCustomerDetails
  );
  const details = useCustomerDetailsStore(
    (state) => state.customerDetails
  );

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const { register, handleSubmit } = useForm<CustomerForm>({
    defaultValues: {
      date_of_travel: toDateStr(details?.date_of_travel),
      time_for_pickup: details?.time_for_pickup ?? "",
      pax: details?.number_of_PAX ?? 1,
      luggage: details?.number_of_luggage ?? 0,
    },
  });

  const onSubmit = async (data: CustomerForm) => {
    const file = data.file_image?.[0];
    const base64Image = file ? await toBase64(file) : null;

    setCustomerDetails({
      customer_id: user_id,
      type: "CUSTOM",
      number_of_PAX: data.pax,
      date_of_travel: new Date(data.date_of_travel),
      time_for_pickup: data.time_for_pickup,
      number_of_luggage: data.luggage,
      ID_picture: base64Image,
    });

    router.push("/itinerary/customer-details/summary");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl shadow-xl border border-black/5 p-8 md:p-10 space-y-8 text-black"
    >
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">
        Customer Details
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Passengers
          </label>
          <input
            type="number"
            {...register("pax", { required: true })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Pickup Date
          </label>
          <input
            type="date"
            {...register("date_of_travel", { required: true })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Pickup Time
          </label>
          <input
            type="time"
            {...register("time_for_pickup", { required: true })}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#36B9CB]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
            Luggage (optional)
          </label>
          <input
            type="number"
            {...register("luggage")}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#36B9CB]"
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
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <Link
          href="/itinerary"
          className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-center hover:bg-gray-200 transition"
        >
          ← Back
        </Link>

        <button
          type="submit"
          className="px-8 py-3 rounded-2xl bg-[#36B9CB] text-white font-bold hover:bg-[#2fa6b6] transition"
        >
          Proceed to Summary →
        </button>
      </div>
    </form>
  );
}
