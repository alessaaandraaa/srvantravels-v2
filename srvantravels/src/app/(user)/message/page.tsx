import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserInboxHeader from "@/components/user-message-ui/UserInboxHeader";
import UserInboxLeftPanel from "@/components/user-message-ui/UserInboxLeftPanel";
import UserPanelServer from "@/components/user-message-ui/UserInboxPanelServer";

export default async function MessagePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Please log in to view your inbox.
        </p>
      </div>
    );
  }

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        px-4 md:px-6 lg:px-8
        py-8 md:py-14
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER CARD */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#36B9CB] mb-2">
            Your Inbox
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage your inquiries, cancellations, and rebooking requests all in one place.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6 md:gap-8
            items-start
          "
        >
          {/* LEFT PANEL */}
          <div className="lg:col-span-1">
            <UserInboxLeftPanel />
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">
            <UserPanelServer />
          </div>
        </div>
      </div>
    </section>
  );
}
