import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Confirmation({ orderId }: { orderId: number }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#36B9CB]/10 to-[#F3B54D]/20 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center space-y-6">
        {/* ICON */}
        <div className="flex justify-center">
          <CheckCircle className="text-[#36B9CB]" size={64} />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          Booking Confirmed!
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600">
          Thank you for booking with <span className="font-semibold">SR Van Travels</span>.
        </p>
        <p className="text-gray-600">
          Your details have been submitted successfully.
        </p>

        {/* ORDER ID */}
        <div className="bg-gray-50 rounded-xl py-4 px-6">
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="text-xl font-bold text-gray-800 tracking-wide">
            #{orderId}
          </p>
        </div>

        {/* ACTION */}
        <Link
          href="/home"
          className="
            inline-block
            mt-4
            px-8 py-3
            rounded-xl
            bg-[#36B9CB]
            text-white
            text-lg
            font-semibold
            shadow-md
            hover:bg-[#2fa6b6]
            hover:shadow-xl
            hover:-translate-y-0.5
            transition-all duration-200
          "
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
