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
  // 1. State for visibility and local override
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactAdded, setContactAdded] = useState(false);

  // 2. Check server session
  const serverHasContact = !!session?.user?.contact_number;

  // 3. Logic: Show button only if server doesn't have it AND we haven't just added it
  const shouldShowButton = !serverHasContact && !contactAdded;

  // 4. 🎯 FIX: A wrapper function to handle BOTH actions (Update UI + Close Dialog)
  const handleDialogSuccess = () => {
    setContactAdded(true); // Hide the button
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex items-start p-5">
      <div>
        <div className="bg-white p-5 border-2 border-black rounded-2xl max-w-3xl">
          <h1 className="font-extrabold text-teal-600 text-4xl">
            Welcome, {session?.user?.name}!
          </h1>
        </div>

        {/* 5. Render Button if needed */}
        {shouldShowButton && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="mt-4 p-2 bg-teal-500 text-white rounded"
          >
            Add Contact Number
          </button>
        )}

        {/* 6. Render Dialog controlled by 'isDialogOpen' */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <ContactDialog
              customer_id={customer_id}
              // 🎯 FIX: Pass the wrapper function, not the state setter
              onSuccess={handleDialogSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border-2 border-black rounded-2xl ml-5 p-10 max-w-full">
        <OrdersList customer_id={customer_id} />
      </div>
    </div>
  );
}
