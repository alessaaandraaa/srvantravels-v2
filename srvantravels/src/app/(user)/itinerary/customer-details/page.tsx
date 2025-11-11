import CustomP2 from "@/components/custom-itinerary-ui/CustomP2";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function CustomerDetails() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  console.log("USER ID: ", id);

  return <CustomP2 user_id={id} />;
}
