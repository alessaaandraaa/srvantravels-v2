import CustomFormP2 from "@/components/custom-itinerary-ui/CustomFormP2";
import LocationsSelection from "@/components/custom-itinerary-ui/LocationsSelection";

type id = { user_id: string | undefined };
export default function CustomP2({ user_id }: id) {
  console.log("USER ID TEST 1: ", user_id);
  return (
    <div className="flex items-center m-5">
      <CustomFormP2 user_id={Number(user_id)} />
      <LocationsSelection />
    </div>
  );
}
