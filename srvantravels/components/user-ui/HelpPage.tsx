export default function HelpPage() {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        py-24
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* LIGHT OVERLAY (does NOT kill bg) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-12 space-y-12">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black">
            HELP CENTER
          </h1>
          <p className="text-xl text-gray-700">
            Welcome to the SR Van Travels Help Center!
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-black">
            Frequently Asked Questions (FAQs)
          </h2>
          <hr className="border-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                1. How do I book a trip with SR Van Travels?
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Visit the Home Page and click on the “Book Now” button.</li>
                <li>Choose a travel type: custom or regular packages.</li>
                <li>
                  Fill out the Booking form with your travel date, passengers,
                  and other details.
                </li>
                <li>Proceed to payment and confirm your booking.</li>
                <li>
                  A confirmation number will be sent via email or text.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                2. Can I customize my itinerary?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! You can design your own itinerary via the Custom Itinerary
                page. A ₱500 down payment is required, and final pricing depends
                on distance, fuel, and service fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                3. What payment options are available?
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><b>GCash</b></li>
                <li>
                  <b>Physical Payments:</b> online down payment required
                </li>
              </ul>
              <p className="italic text-sm text-gray-600 mt-2">
                Credit cards and bank transfers are not yet supported.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                4. How do I know if my booking was successful?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                After payment, you will see a confirmation screen and receive
                your booking reference via email and SMS.
              </p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-black">
            Tips for a Smooth Booking
          </h2>
          <hr className="border-gray-300" />

          <div className="bg-white rounded-2xl shadow-md p-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Book at least 3–5 days before travel.</li>
              <li>Double-check itinerary details.</li>
              <li>Use an active email and phone number.</li>
              <li>Coordinate with group members ahead of time.</li>
            </ul>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-2xl md:text-3xl font-bold text-black">
          Let us help you travel better. Thank you for choosing SR Van Travels.
        </p>
      </div>
    </section>
  );
}
