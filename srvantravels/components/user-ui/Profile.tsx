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

export default function UserProfile({
  customer_id,
  session,
}: userProfileProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactAdded, setContactAdded] = useState(false);

  const serverHasContact = !!session?.user?.contact_number;
  const shouldShowButton = !serverHasContact && !contactAdded;

  const handleDialogSuccess = () => {
    setContactAdded(true);
    setIsDialogOpen(false);
  };

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
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Profile Card */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 space-y-4">
              <h1 className="font-extrabold text-[#36B9CB] text-4xl">
                Welcome, {session?.user?.name}!
              </h1>

              <p className="text-gray-600">
                Manage your account details and bookings here.
              </p>

              {shouldShowButton && (
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="
                    mt-4 px-5 py-3 rounded-xl
                    bg-[#36B9CB] text-white font-semibold
                    hover:bg-[#2fa6b6]
                    transition
                  "
                >
                  Add Contact Number
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Orders */}
          <div className="flex-[1.5]">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#36B9CB] mb-4">
                Your Orders
              </h2>

              <OrdersList customer_id={customer_id} />
            </div>
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
