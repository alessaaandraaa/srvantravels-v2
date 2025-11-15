export default function HelpPage() {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl m-5 max-w-5xl">
      <div className="flex items-start content-center">
        <h1 className="text-7xl font-bold mr-6 ">HELP CENTER</h1>
        <h1 className="text-2xl">Welcome to the SR Van Travels Help Center!</h1>
      </div>
      <h1 className="text-2xl font-extrabold">
        Frequently Asked Questions (FAQs)
      </h1>
      <hr className="text-teal-600 border-1 mt-3" />
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h1 className="text-2xl text-teal-400 font-bold">
            1. How do I book a trip with SR Van Travels?
          </h1>
          <ul className="list-disc p-3">
            <li>Visit the Home Page and click on the “Book Now” button.</li>
            <li>Choose a travel type: custom or regular packages.</li>
            <li>
              Fill out the Booking form, complete with the travel date, number
              of passengers, and other relevant information.
            </li>
            <li>Proceed to the Payment Page, then confirm your booking.</li>
            <li>
              You’ll receive a confirmation number via email or text once your
              payment is processed.
            </li>
          </ul>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h1 className="text-2xl text-teal-400 font-bold">
            2. Can I customize my itinerary?
          </h1>
          <p className="p-3">
            Yes! In the Home page, there is a designated button meant to direct
            you to the custom itinerary page, where you can freely design and
            coordinate your stops, destinations, and schedules. Making a custom
            itinerary comes with a downpayment of 500 PESOS, and the final
            payment will be calculated based on gasoline consumption, driver’s
            fee, and maintenance fee for the van. Lastly, our team will reach
            out to you to confirm the plan’s feasibility and availability
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h1 className="text-2xl text-teal-400 font-bold">
            3. What payment options are available?
          </h1>
          <ul className="list-disc p-3">
            <li>
              <b>GCash</b>
            </li>
            <li>
              <b>Physical Payments: </b>requires an online down payment;
              remaining balance is payable in person
            </li>
          </ul>
          <p>
            <i>
              Note: Credit card and direct bank transfers are not yet available.
            </i>
          </p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h1 className="text-2xl text-teal-400 font-bold">
            4. How do I know if my booking was successful?
          </h1>
          <p className="p-3">
            Once you complete the payment, a confirmation screen will appear and
            a Booking Reference Number will be sent to your email and phone
            number. If you don’t receive confirmation within 24 hours, please
            contact us.
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-extrabold mt-5">
        Tips for a Smooth Booking:
      </h1>
      <hr className="text-teal-600 border-1 mt-3" />
      <div className="bg-white rounded-2xl shadow-md p-5">
        <ul className="list-disc p-3">
          <li>Book at least 3–5 days before your intended travel date.</li>
          <li>
            Review your selected itinerary and trip details before confirming.
          </li>
          <li>
            Use a valid and active email and mobile number to ensure you receive
            updates.
          </li>
          <li>
            If traveling in a group, coordinate with members beforehand to avoid
            schedule conflicts.
          </li>
          <li>
            Use accurate names and contact numbers to avoid booking delays or
            confusion.
          </li>
        </ul>
      </div>
      <h1 className="text-3xl font-extrabold mt-5">
        Let us help you travel better. Thank you for choosing SR Van Travels —
        your reliable itinerary companion.
      </h1>
    </div>
  );
}
