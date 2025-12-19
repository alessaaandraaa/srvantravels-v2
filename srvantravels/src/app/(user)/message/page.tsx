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
        px-6
        py-20
      "
      style={{
        backgroundImage: "url('/bg-images/bg3.jpg')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Inbox
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Manage your inquiries, cancellations, and rebooking requests here.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
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
