import CustomFormP2 from "@/components/custom-itinerary-ui/CustomFormP2";
import LocationsSelection from "@/components/custom-itinerary-ui/LocationsSelection";

type id = { user_id: string | undefined };

export default function CustomP2({ user_id }: id) {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <CustomFormP2 user_id={Number(user_id)} />
        </div>

        {/* Locations */}
        <div className="bg-white rounded-3xl shadow-lg border border-black/5 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Selected Locations
          </h3>
          <LocationsSelection />
        </div>
      </div>
    </div>
  );
}
