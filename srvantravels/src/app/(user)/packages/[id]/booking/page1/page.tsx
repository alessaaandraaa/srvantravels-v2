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
        py-16
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* GLOBAL OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

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
