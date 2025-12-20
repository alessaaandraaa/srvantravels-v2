import CustomP2 from "@/components/custom-itinerary-ui/CustomP2";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default function CustomP2({ user_id }: id) {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: "url('/bg-images/bg3.jpg')" }}
    >
      {/* optional overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* centered content */}
      <div className="relative z-10 flex justify-center">
        <CustomFormP2 user_id={Number(user_id)} />
      </div>
    </section>
  );
}

