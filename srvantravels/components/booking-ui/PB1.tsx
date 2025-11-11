import PB1Form from "./PB1Form";
import PBPackageDisplay from "./PBPackageDisplay";

type id = { user_id: string | undefined };

export default function PB1({ user_id }: id) {
  const userId = Number(user_id);
  return (
    <>
      <PBPackageDisplay />
      <PB1Form user_id={userId} />
    </>
  );
}
