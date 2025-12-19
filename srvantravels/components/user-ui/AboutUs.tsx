import Image from "next/image";

export default function AboutUs() {
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
        backgroundImage: "url('/bg-images/bg9.jpg')",
      }}
    >
      {/* OVERLAY (lighter so bg is visible) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-12 space-y-10">
        
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
            <Image
              src="/images/srvanlogo2.png"
              alt="SR Van Travels Logo"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-black">
            ABOUT US
          </h1>
          <p className="text-xl italic text-black">
            Why do we drive?
          </p>
        </div>

        <p className="text-lg leading-relaxed text-black text-justify">
          SR Van Travels is one of Cebu&apos;s growing transport service providers,
          offering standard itineraries that bring clients from one destination
          to another with comfort and reliability. We cater to tourists and
          locals who require efficient, safe, and stress-free travel across
          multiple locations.
          <br /><br />
          With a fleet of well-maintained vans, experienced drivers, and a
          friendly team, SR Van Travels is more than just transportation —
          we&apos;re your travel partner. Whether you&apos;re discovering Cebu for
          the first time or exploring it all over again, we are here to take
          you there — safely, comfortably, and on time.
        </p>

        <div className="text-center space-y-1">
          <p className="text-3xl md:text-4xl font-extrabold text-black">
            Your journey matters.
          </p>
          <p className="text-lg text-black">
            Let SR Van Travels drive you to unforgettable destinations.
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-black text-center">
            Contact Us
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-black">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold mb-2">Facebook</h4>
              <p>SR Van Travels</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold mb-2">Email</h4>
              <p>srvantravels@gmail.com</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold mb-4">Phone Numbers</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>09452866649</p>
                <p>09478196739</p>
                <p>09166240642</p>
                <p>09166629657</p>
                <p>0916660527</p>
                <p>09569430826</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold mb-2">Location</h4>
              <p>
                Jugan, Consolacion, Cebu City, Philippines
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
