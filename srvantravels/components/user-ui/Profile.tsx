"use client";

import { Session } from "next-auth";
import OrdersList from "@/components/user-ui/OrdersList";
import { ContactDialog } from "./ContactDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface userProfileProps {
  customer_id: number;
  session: Session | null;
}

type TabType = "profile" | "orders" | "settings";

export default function UserProfile({
  customer_id,
  session,
}: userProfileProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactAdded, setContactAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const serverHasContact = !!session?.user?.contact_number;
  const shouldShowButton = !serverHasContact && !contactAdded;

  const handleDialogSuccess = () => {
    setContactAdded(true);
    setIsDialogOpen(false);
  };

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: "👤" },
    { id: "orders" as TabType, label: "Orders", icon: "📋" },
    { id: "settings" as TabType, label: "Settings", icon: "⚙️" },
  ];

  return (
    <div
      className="
        relative min-h-screen
        bg-cover bg-center bg-no-repeat
      "
      style={{
        backgroundImage: "url('/bg-images/bg10.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/50" />

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8 lg:p-10 py-8 md:py-14">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
            <h1 className="font-extrabold text-[#36B9CB] text-3xl md:text-4xl">
              Welcome, {session?.user?.name}!
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Manage your account details and bookings here.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="flex flex-wrap md:flex-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 px-4 md:px-6 py-4
                    font-bold text-sm md:text-base
                    border-b-4 transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "border-[#36B9CB] bg-[#36B9CB]/5 text-[#36B9CB]"
                        : "border-gray-200 text-gray-700 hover:text-[#36B9CB]"
                    }
                  `}
                >
                  <span className="hidden sm:inline mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Full Name
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-2">
                      {session?.user?.name}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Email Address
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-2 break-all">
                      {session?.user?.email}
                    </p>
                  </div>

                  {/* Contact Number */}
                  <div className="bg-gray-50 rounded-2xl p-5 md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Contact Number
                    </p>
                    {serverHasContact ? (
                      <p className="text-lg font-bold text-gray-800 mt-2">
                        {session?.user?.contact_number}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic mt-2">Not yet added</p>
                    )}
                  </div>
                </div>

                {shouldShowButton && (
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className="
                      w-full md:w-auto
                      mt-4 px-6 py-3 rounded-2xl
                      bg-gradient-to-r from-[#36B9CB] to-[#2fa6b6]
                      text-white font-bold
                      hover:shadow-lg hover:-translate-y-0.5
                      transition-all duration-200
                    "
                  >
                    Add Contact Number
                  </button>
                )}
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                  Your Orders
                </h2>
                <OrdersList customer_id={customer_id} />
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                  Settings
                </h2>

                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-xl">
                    <p className="font-semibold text-blue-900">Account Security</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Your account is protected with NextAuth authentication.
                    </p>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-xl">
                    <p className="font-semibold text-green-900">Notifications</p>
                    <p className="text-sm text-green-700 mt-1">
                      You will receive email notifications for order updates.
                    </p>
                  </div>

                  <div className="bg-gray-50 border-l-4 border-gray-300 p-5 rounded-xl">
                    <p className="font-semibold text-gray-900">Customer ID</p>
                    <p className="text-sm text-gray-700 mt-1 font-mono">
                      {customer_id}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-2xl">
          <ContactDialog
            customer_id={customer_id}
            onSuccess={handleDialogSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
