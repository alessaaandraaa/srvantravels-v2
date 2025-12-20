import CustomFormMap from "../../../../components/custom-itinerary-ui/CustomFormMap";

export default function Itinerary() {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{ backgroundImage: "url('/bg-images/bg3.jpg')" }}
    >
      {/* DARK OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-12">
        <CustomFormMap />
      </div>
    </section>
  );
}
