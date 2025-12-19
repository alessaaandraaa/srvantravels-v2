import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import PB1Form from "@/components/booking-ui/PB1Form";
import PBDetailsSummary from "@/components/booking-ui/PBDetailsSummary";

export default async function BookingPackage1() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* PAGE CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          pt-24
          pb-20
        "
      >
        {/* PAGE TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Package Booking
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Please review your package details and fill in the required
            information to proceed with your booking.
          </p>
        </div>

        {/* FORM + SUMMARY */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-12
            items-start
            justify-center
          "
        >
          {/* LEFT — FORM */}
          <div className="w-full lg:w-1/2">
            <PB1Form user_id={Number(userId)} />
          </div>

          {/* RIGHT — SUMMARY */}
          <div className="w-full lg:w-1/2">
            <PBDetailsSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
