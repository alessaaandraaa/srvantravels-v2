import Navbar from "../../../components/user-ui/Navbar";
import ToastButton from "../../../components/user-ui/ToastButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar />
      {!session?.user?.contact_number ? <ToastButton /> : <p />}
      {children}
    </>
  );
}
