import UserProfileServer from "@/components/user-ui/Profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    <UserProfileServer
      customer_id={Number(session?.user?.id)}
      session={session}
    />
  );
}
