"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  useCustomerStore,
  usePackageStore,
} from "@/store/package-itinerary.store";
import Link from "next/link";

type customerForm = {
  pax: number;
  pickup_date: string;
  // pickup_address: string,
  luggage: number;
  file_image: FileList;
};

export default function PB1Form() {
  const router = useRouter();

  const setCustomerDetails = useCustomerStore(
    (state) => state.setCustomerDetails
  );
  const bookedPackage = usePackageStore((state) => state.bookedPackage);
  const itinerary_id = bookedPackage?.package_ID ?? null;
  const params = useParams();
  const id = Number(params.id);

  const { register, handleSubmit } = useForm<customerForm>();

  const onSubmit = async (FormData: customerForm) => {
    const file = FormData.file_image[0];

    let base64Image: string | null = null;

    if (file) {
      base64Image = await toBase64(file);
    }

    // Save all form data to Zustand
    setCustomerDetails({
      customer_id: id,
      itinerary_id: itinerary_id,
      type: "PACKAGE",
      number_of_PAX: FormData.pax,
      date_of_travel: new Date(FormData.pickup_date),
      number_of_luggage: FormData.luggage,
      ID_picture: base64Image,
    });

    router.push(`/packages/${id}/booking/summary`);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <form className="w-full max-w-lg m-10" onSubmit={handleSubmit(onSubmit)}>
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
              htmlFor="pickup_date"
            >
              Pickup Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pickup_date"
              type="date"
              {...register("pickup_date")}
            />
          </div>
          {/*<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="pickup_address"
            >
              Pickup Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pickup_address"
              type="text"
            />
          </div>*/}
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
            href="/packages"
          >
            Back to Packages
          </Link>
          <button
            type="submit"
            className="bg-amber-500 text-amber-50 p-4 hover:bg-amber-800"
          >
            Proceed to Summary
          </button>
        </div>
      </form>
    </>
  );
}
