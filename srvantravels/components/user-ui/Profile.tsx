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
  const [orderIndex, setOrderIndex] = useState(0);

  const serverHasContact = !!session?.user?.contact_number;
  const shouldShowButton = !serverHasContact && !contactAdded;

  const handleDialogSuccess = () => {
    setContactAdded(true);
    setIsDialogOpen(false);
  };

  const tabs = [
    { id: "profile" as TabType, label: "Profile" },
    { id: "orders" as TabType, label: "Orders" },
    { id: "settings" as TabType, label: "Settings" },
  ];

  return (
    <div
      className="relative min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/bg-images/bg10.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/50" />

      <div className="relative z-10 p-4 md:p-8 lg:p-10 py-8 md:py-14">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
            <h1 className="font-extrabold text-[#36B9CB] text-3xl md:text-4xl">
              Welcome, {session?.user?.name}!
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Manage your account details and bookings here.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="flex flex-wrap md:flex-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 px-4 md:px-6 py-4
                    font-semibold text-sm md:text-base
                    border-b-4 transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "border-[#36B9CB] text-[#36B9CB]"
                        : "border-gray-200 text-gray-600 hover:text-gray-800"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Full Name
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-2">
                      {session?.user?.name}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Email Address
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-2 break-all">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Contact Number
                    </p>
                    {serverHasContact ? (
                      <p className="text-lg font-bold text-gray-800 mt-2">
                        {session?.user?.contact_number}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic mt-2">
                        Not yet added
                      </p>
                    )}
                  </div>
                </div>

                {shouldShowButton && (
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className="
                      mt-4 px-6 py-3 rounded-2xl
                      bg-gradient-to-r from-[#36B9CB] to-[#2fa6b6]
                      text-white font-bold
                    "
                  >
                    Add Contact Number
                  </button>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                  Your Orders
                </h2>

                <OrdersList
                  customer_id={customer_id}
                  page={orderIndex}
                  pageSize={1}
                />

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setOrderIndex((i) => Math.max(i - 1, 0))}
                    disabled={orderIndex === 0}
                    className="px-4 py-2 rounded-xl bg-gray-200 font-semibold disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-500">
                    Order {orderIndex + 1}
                  </span>

                  <button
                    onClick={() => setOrderIndex((i) => i + 1)}
                    className="px-4 py-2 rounded-xl bg-[#36B9CB] text-white font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-gray-100 pb-4">
                  Settings
                </h2>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="font-semibold">Customer ID</p>
                  <p className="text-sm font-mono">{customer_id}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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