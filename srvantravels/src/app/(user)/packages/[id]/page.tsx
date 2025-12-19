import PackageBooking from "@/components/booking-ui/PackageBooking";

export default async function Package({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkgId = Number(id);
  if (!Number.isFinite(pkgId)) return <div>Invalid package id.</div>;
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/bg-images/bg7.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 py-8 md:py-14 px-4 md:px-6">
        <PackageBooking package_ID={pkgId} />
      </div>
    </div>
  );
}
