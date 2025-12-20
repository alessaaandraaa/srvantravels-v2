import CustomSummaryFull from "@/components/custom-itinerary-ui/CustomSummaryFull";

export default function Summary() {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        py-20
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* CONTENT */}
      <div className="relative z-10">
        <CustomSummaryFull />
      </div>
    </section>
  );
}
