"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose, // Keep DialogClose for the Cancel button
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react"; // 🎯 FIX 1: Import useState

interface ContactDialogProps {
  customer_id: number;
  // 🎯 FIX 2: Change onSuccess to accept the necessary boolean if the parent needs it,
  // OR, change it back to a simple void function if the parent just wants to know it succeeded.
  // Sticking to the simple void function based on your original request:
  onSuccess: () => void;
}

// 🎯 NOTE: This component assumes the parent wraps it in <Dialog open={...} onOpenChange={...}>

export function ContactDialog({ customer_id, onSuccess }: ContactDialogProps) {
  const router = useRouter();
  const customerId = customer_id;

  // State for optional future use (e.g., loading spinners), not strictly needed here
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const value = formData.get("contact");

    const body = {
      contact_details: {
        customer_id: customerId,
        contact: value,
      },
    };

    const response = await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setIsSubmitting(false);

    if (response.ok) {
      // 🎯 FIX 3: Call the destructured onSuccess function with NO arguments
      onSuccess();

      // 🎯 STEP 4: Refresh and redirect (This happens AFTER the dialog closes in the parent)
      router.refresh();
      // No need for router.push if the refresh correctly reloads the profile page URL
    } else {
      console.error("Update failed.");
      // Handle failure case (e.g., show error message)
    }
  };

  return (
    // 🎯 FIX 5: Remove DialogClose from the return statement if the parent controls the Dialog (which it should)
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Add Contact Number</DialogTitle>
        <DialogDescription>
          Add your contact number so we can contact you for updates.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="contact">Contact Number</Label>
          <Input
            id="contact"
            name="contact"
            placeholder="09XXXXXXXXX"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <DialogFooter className="mt-4">
        {/* We use a simple button here. The parent component's DialogClose button handles the actual closure */}
        <Button
          variant="outline"
          type="button"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
