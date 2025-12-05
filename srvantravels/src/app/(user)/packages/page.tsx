import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import PackageList from "../../../../components/user-ui/PackageList";

export default async function Packages() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user.name) {
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
