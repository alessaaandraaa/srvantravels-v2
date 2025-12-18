import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserInboxRightPanel from "./UserInboxRightPanel";

export default async function UserPanelServer() {
  const session = await getServerSession(authOptions);
  return <UserInboxRightPanel session={session} />;
}
