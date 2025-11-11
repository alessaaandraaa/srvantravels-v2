import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import PackageList from "../../../../components/ui/PackageList";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div>
        <PackageList />
      </div>
    );
  }

  return (
    <>
      <p>Please log in.</p>
    </>
  );
}
