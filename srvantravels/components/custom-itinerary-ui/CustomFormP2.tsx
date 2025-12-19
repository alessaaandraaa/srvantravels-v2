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

  const onSubmit = async (FormData: customerForm) => {
    const file = FormData.file_image?.[0];
    let base64Image: string | null = null;

    if (file) {
      base64Image = await toBase64(file);
    }

    setCustomerDetails({
      customer_id: Number(user_id),
      type: "CUSTOM",
      number_of_PAX: FormData.pax,
      date_of_travel: new Date(FormData.date_of_travel),
      time_for_pickup: FormData.time_for_pickup,
      number_of_luggage: FormData.luggage,
      ID_picture: base64Image,
    });

    router.push(`/itinerary/customer-details/summary`);
  };

  return (
    <div
      className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        px-6 py-10
      "
      style={{ backgroundImage: "url('/bg-images/bg6.jpg')" }}
    >
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            bg-white rounded-3xl shadow-xl
            p-8 md:p-10
            space-y-8
          "
        >
          <h2 className="text-3xl font-extrabold text-[#36B9CB] text-center">
            Customer Details
          </h2>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Passengers */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
                Number of Passengers
              </label>
              <input
                type="number"
                {...register("pax")}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
                Pickup Date
              </label>
              <input
                type="date"
                {...register("date_of_travel")}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
                Pickup Time
              </label>
              <input
                type="time"
                {...register("time_for_pickup")}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
                No. of Luggage (optional)
              </label>
              <input
                type="number"
                {...register("luggage")}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase">
                Upload ID Image
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register("file_image")}
                className="w-full rounded-xl border px-4 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
            <Link
              href="/itinerary"
              className="px-6 py-3 rounded-2xl bg-gray-200 text-gray-700 font-semibold text-center"
            >
              ← Back to Location Selection
            </Link>

            <button
              type="submit"
              className="
                px-8 py-3 rounded-2xl
                bg-[#F3B54D] text-white font-bold
                hover:bg-[#eaa93f]
                transition
              "
            >
              Proceed to Summary →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
