import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return <div></div>;
  }

  return (
    <>
      <p>Please log in.</p>
    </>
  );
}
