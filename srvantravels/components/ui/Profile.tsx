import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import OrdersList from "@/components/ui/OrdersList";

export default async function UserProfile(customer_id: {
  customer_id: number;
}) {
  const session = await getServerSession(authOptions);
  console.log("CUSTOMER ID: ", customer_id);
  return (
    <div className="flex items-start p-5">
      <div className="bg-white p-5 border-2 border-black rounded-2xl max-w-3xl">
        <h1 className="font-extrabold text-teal-600 text-4xl">
          Welcome, {session?.user?.name}!
        </h1>
      </div>
      <div className="border-2 border-black rounded-2xl ml-5 p-10 max-w-full">
        <OrdersList customer_id={customer_id.customer_id} />
      </div>
    </div>
  );
}
