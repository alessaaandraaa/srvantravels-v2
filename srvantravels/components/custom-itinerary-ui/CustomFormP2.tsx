"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCustomerDetailsStore } from "@/store/custom-itinerary.store";
import Link from "next/link";
import LocationsSelection from "./LocationsSelection";
type customerForm = {
  pax: number;
  date_of_travel: string;
  // pickup_address: string,
  luggage: number;
  file_image: FileList;
  time_for_pickup: string;
  time_for_dropoff: string;
};

type id = { user_id: number };
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

export default function CustomFormP2({ user_id }: id) {
  const router = useRouter();

  const setCustomerDetails = useCustomerDetailsStore(
    (state) => state.setCustomerDetails
  );
  const details = useCustomerDetailsStore((s) => s.customerDetails);
  const params = useParams();

  console.log("USER ID TEST 2: ", user_id);

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
    const file = FormData.file_image[0];

    let base64Image: string | null = null;

    if (file) {
      base64Image = await toBase64(file);
    }

    // Save all form data to Zustand
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
    <>
      <div>
        <form
          className="w-full max-w-lg m-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="pax"
              >
                Number of Passengers
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="pax"
                type="number"
                {...register("pax")}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="date_of_travel"
              >
                Pickup Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="pickup_date"
                type="date"
                {...register("date_of_travel")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="time_for_pickup"
              >
                Pickup Time
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="time_for_pickup"
                type="time"
                {...register("time_for_pickup")}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="luggage"
              >
                No. of Luggage (optional)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="luggage"
                type="number"
                {...register("luggage")}
              />
            </div>
            <div className="w-full mt-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_image"
              >
                Upload image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_image"
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register("file_image")}
              />
            </div>
          </div>
          <div className="flex m-10 gap-4">
            <Link
              className="bg-red-700 text-amber-50 p-4 hover:bg-red-800"
              href="/itinerary"
            >
              Back to Location Selection
            </Link>
            <button
              type="submit"
              className="bg-amber-500 text-amber-50 p-4 hover:bg-amber-800"
            >
              Proceed to Summary
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
