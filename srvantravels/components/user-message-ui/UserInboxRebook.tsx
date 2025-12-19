"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderSelect from "./UserOrderSelect";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type id = { user_id: number | null };

type RebookFormValues = {
  message: string;
  rebook_date: string;
  order_id: string;
};

export default function UserRebook({ user_id }: id) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RebookFormValues>({
    defaultValues: {
      message: "",
      order_id: "",
      rebook_date: "",
    },
  });

  const onSubmit = async (formData: RebookFormValues) => {
    const body = {
      sender_ID: user_id,
      order_ID: Number(formData.order_id),
      subject: "Rebooking Request",
      requested_date: new Date(formData.rebook_date),
      content: formData.message,
      type: "REBOOKING_REQUEST",
    };

    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.push(`/message`);
    } else {
      const errorData = await response.json().catch(() => null);
      console.error("SERVER ERROR:", response.status, errorData);
    }
  };

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold text-[#36B9CB]">
          Rebooking Request
        </CardTitle>

        <CardDescription className="text-sm text-gray-600">
          Request a new date for your existing booking. Our team will review and
          confirm availability before approval.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* ORDER SELECT */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Select Booking
            </Label>

            <OrderSelect
              user_id={user_id}
              registration={register("order_id", {
                required: "Please select an order",
              })}
            />

            {errors.order_id && (
              <p className="text-red-500 text-xs">
                {errors.order_id.message}
              </p>
            )}
          </div>

          {/* REBOOK DATE */}
          <div className="space-y-2">
            <Label
              htmlFor="rebook_date"
              className="text-sm font-semibold text-gray-700"
            >
              Preferred Rebooking Date
            </Label>

            <Input
              id="rebook_date"
              type="date"
              {...register("rebook_date", {
                required: "Rebooking date is required",
              })}
            />

            {errors.rebook_date && (
              <p className="text-red-500 text-xs">
                {errors.rebook_date.message}
              </p>
            )}
          </div>

          {/* REASON */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm font-semibold text-gray-700"
            >
              Reason for Rebooking
            </Label>

            <Input
              id="message"
              placeholder="Briefly explain why you want to rebook..."
              {...register("message", {
                required: "Reason is required",
              })}
            />

            {errors.message && (
              <p className="text-red-500 text-xs">
                {errors.message.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              bg-[#F3B54D]
              text-white
              font-semibold
              hover:bg-[#eaa93f]
              transition
            "
          >
            {isSubmitting ? "Sending..." : "Submit Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
