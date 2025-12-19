export default function HelpPage() {
  return (
    <section
      className="
        relative
        bg-cover
        bg-center
        bg-no-repeat
        py-16
        px-6
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* OPTIONAL OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-[rgba(121,198,209,0.52)]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black">
            HELP CENTER
          </h1>
          <p className="text-xl text-gray-700">
            Welcome to the SR Van Travels Help Center!
          </p>
        </div>

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
                  Fill out the Booking form, complete with the travel date,
                  number of passengers, and other relevant information.
                </li>
                <li>Proceed to the Payment Page, then confirm your booking.</li>
                <li>
                  You’ll receive a confirmation number via email or text once
                  your payment is processed.
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                2. Can I customize my itinerary?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! In the Home page, there is a designated button meant to
                direct you to the custom itinerary page, where you can freely
                design and coordinate your stops, destinations, and schedules.
                Making a custom itinerary comes with a downpayment of 500 PESOS,
                and the final payment will be calculated based on gasoline
                consumption, driver’s fee, and maintenance fee for the van.
                Lastly, our team will reach out to you to confirm the plan’s
                feasibility and availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                3. What payment options are available?
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><b>GCash</b></li>
                <li>
                  <b>Physical Payments:</b> requires an online down payment;
                  remaining balance is payable in person
                </li>
              </ul>
              <p className="italic text-sm text-gray-600 mt-2">
                Note: Credit card and direct bank transfers are not yet available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold text-[#36B9CB] mb-3">
                4. How do I know if my booking was successful?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Once you complete the payment, a confirmation screen will appear
                and a Booking Reference Number will be sent to your email and
                phone number. If you don’t receive confirmation within 24 hours,
                please contact us.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-black">
            Tips for a Smooth Booking
          </h2>
          <hr className="border-gray-300" />

          <div className="bg-white rounded-2xl shadow-md p-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Book at least 3 to 5 days before your intended travel date.</li>
              <li>
                Review your selected itinerary and trip details before
                confirming.
              </li>
              <li>
                Use a valid and active email and mobile number to ensure you
                receive updates.
              </li>
              <li>
                If traveling in a group, coordinate with members beforehand to
                avoid schedule conflicts.
              </li>
              <li>
                Use accurate names and contact numbers to avoid booking delays
                or confusion.
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-2xl md:text-3xl font-bold text-black">
          Let us help you travel better. Thank you for choosing SR Van Travels —
          your reliable itinerary companion.
        </p>
      </div>
    </section>
  );
}
