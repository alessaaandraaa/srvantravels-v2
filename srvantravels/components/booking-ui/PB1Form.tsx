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
  luggage: number;
  file_image: FileList;
};

type id = { user_id: number };

export default function PB1Form({ user_id }: id) {
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

    setCustomerDetails({
      customer_id: Number(user_id),
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        bg-white
        rounded-3xl
        shadow-xl
        p-8 md:p-10
        space-y-8
      "
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#36B9CB] text-center">
        PACKAGE BOOKING DETAILS
      </h1>

      <hr className="border-gray-300" />

      {/* PASSENGERS */}
      <div>
        <label
          htmlFor="pax"
          className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
        >
          Number of Passengers
        </label>
        <input
          id="pax"
          type="number"
          {...register("pax")}
          className="
            block w-full
            rounded-xl
            border border-gray-300
            bg-white
            px-4 py-3
            text-gray-800
            focus:outline-none
            focus:ring-2 focus:ring-[#36B9CB]
          "
        />
      </div>

      {/* DATE + LUGGAGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="pickup_date"
            className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
          >
            Pickup Date
          </label>
          <input
            id="pickup_date"
            type="date"
            {...register("pickup_date")}
            className="
              block w-full
              rounded-xl
              border border-gray-300
              bg-white
              px-4 py-3
              text-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-[#36B9CB]
            "
          />
        </div>

        <div>
          <label
            htmlFor="luggage"
            className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
          >
            Number of Luggage (optional)
          </label>
          <input
            id="luggage"
            type="number"
            {...register("luggage")}
            className="
              block w-full
              rounded-xl
              border border-gray-300
              bg-white
              px-4 py-3
              text-gray-800
              focus:outline-none
              focus:ring-2 focus:ring-[#36B9CB]
            "
          />
        </div>
      </div>

      {/* FILE UPLOAD */}
      <div>
        <label
          htmlFor="file_image"
          className="block text-xs font-semibold tracking-wide text-gray-600 mb-2 uppercase"
        >
          Upload Valid ID
        </label>
        <input
          id="file_image"
          type="file"
          accept=".png, .jpg, .jpeg"
          {...register("file_image")}
          className="
            block w-full
            text-sm
            text-gray-700
            border border-gray-300
            rounded-xl
            cursor-pointer
            bg-gray-50
            focus:outline-none
            focus:ring-2 focus:ring-[#36B9CB]
          "
        />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
        <Link
          href="/packages"
          className="
            px-6 py-3
            rounded-2xl
            bg-red-600
            text-white
            font-semibold
            text-center
            hover:bg-red-700
            transition
          "
        >
          Back to Packages
        </Link>

        <button
          type="submit"
          className="
            px-6 py-3
            rounded-2xl
            bg-[#F3B54D]
            text-white
            font-bold
            hover:bg-[#eaa93f]
            transition
          "
        >
          Proceed to Summary →
        </button>
      </div>
    </form>
  );
}
