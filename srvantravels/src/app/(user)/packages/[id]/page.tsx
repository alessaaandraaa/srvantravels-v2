import PackageBooking from "@/components/booking-ui/PackageBooking";

export default async function Package({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await the Promise
  const pkgId = Number(id);
  if (!Number.isFinite(pkgId)) return <div>Invalid package id.</div>;
  return (
    <div>
      <PackageBooking package_ID={pkgId} />;
    </div>
  );
}

//
