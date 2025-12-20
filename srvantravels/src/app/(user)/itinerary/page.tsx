import CustomFormMap from "../../../../components/custom-itinerary-ui/CustomFormMap";

export default function Itinerary() {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-center
        bg-no-repeat
        flex
      "
      style={{
        backgroundImage: "url('/bg-images/bg6.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 py-12">
        <CustomFormMap />
      </div>
    </section>
  );
}
