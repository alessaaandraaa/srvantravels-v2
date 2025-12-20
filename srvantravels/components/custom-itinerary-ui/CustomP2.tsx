import CustomFormP2 from "@/components/custom-itinerary-ui/CustomFormP2";

type id = { user_id: string | undefined };

export default function CustomP2({ user_id }: id) {
  return (
    <section
      className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        px-6 py-16
      "
      style={{ backgroundImage: "url('/bg-images/bg3.jpg')" }}
    >
      {/* Page content */}
      <div className="max-w-7xl mx-auto flex justify-center">
        <CustomFormP2 user_id={Number(user_id)} />
      </div>
    </section>
  );
}
