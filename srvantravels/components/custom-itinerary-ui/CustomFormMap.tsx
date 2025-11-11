import CustomForm from "@/components/custom-itinerary-ui/CustomForm";
import MapComponent from "@/components/map/map";

export default function CustomFormMap() {
  return (
    <div>
      <div className="flex items-center justify-center align-middle">
        <CustomForm />
      </div>
      <MapComponent />
    </div>
  );
}
