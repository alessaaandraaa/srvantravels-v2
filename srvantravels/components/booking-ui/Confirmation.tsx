import Link from "next/link";

export default function Confirmation({ orderId }: { orderId: number }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1>Booking Confirmed!</h1>
        <p>Thank you for booking.</p>
        <p>Your details have been submitted successfully.</p>

        <h3>
          <b>Order ID:</b>
          {orderId}
        </h3>

        <Link href="/home" className="hover:bg-amber-400">
          Return to home
        </Link>
      </div>
    </div>
  );
}
