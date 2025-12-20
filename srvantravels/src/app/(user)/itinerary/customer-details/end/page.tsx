import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Confirmation from "@/components/booking-ui/Confirmation";

type Search = { order_id?: string };

export default async function End({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const session = await getServerSession(authOptions);
  const { order_id } = await searchParams;

  if (!session?.user) {
    return <p>Session ended. Please log in again.</p>;
  }

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        py-20
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <Confirmation orderId={Number(order_id)} />
      </div>
    </section>
  );
}
