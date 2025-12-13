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
    <div className="flex items-start p-5">
      <div>
        <div className="bg-white p-5 border-2 border-black rounded-2xl max-w-3xl">
          <h1 className="font-extrabold text-teal-600 text-4xl">
            Welcome, {session?.user?.name}!
          </h1>
        </div>

        {shouldShowButton && (
          <button
            onClick={() => setIsDialogOpen(true)}
            className="mt-4 p-2 bg-teal-500 text-white rounded"
          >
            Add Contact Number
          </button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <ContactDialog
              customer_id={customer_id}
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
