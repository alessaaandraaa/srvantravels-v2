import PackageBooking from "../../../components/booking-ui/PackageBooking";

export default function Package({ params }: { params: { id: string } }) {
  const id = Number(params["id"]);
  return (
    <div>
      <PackageBooking package_ID={id} />;
    </div>
  );
}

//
