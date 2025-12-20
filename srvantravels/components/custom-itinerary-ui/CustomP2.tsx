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
    <section
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        px-6
        py-14
        flex
        items-center
        justify-center
        relative
      "
      style={{
        backgroundImage: "url('/images/custom-bg.jpg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-4xl">
        <CustomFormP2 user_id={user_id} />
      </div>
    </section>
  );
}
