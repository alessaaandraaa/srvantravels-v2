"use client";

import CustomFormP2 from "@/components/custom-itinerary-ui/CustomFormP2";

type Props = {
  user_id?: number;
};

export default function CustomP2({ user_id }: Props) {
  if (!user_id) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading user...
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-teal-50 to-white px-6 py-14">
      <div className="max-w-4xl mx-auto">
        <CustomFormP2 user_id={user_id} />
      </div>
    </section>
  );
}
