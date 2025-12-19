"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import OrderSelect from "./UserOrderSelect";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type id = { user_id: number | null };

type CancelFormValues = {
  message: string;
  order_id: string;
};

export default function UserCancel({ user_id }: id) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CancelFormValues>({
    defaultValues: {
      message: "",
      order_id: "",
    },
  });

  const onSubmit = async (formData: CancelFormValues) => {
    const body = {
      sender_ID: user_id,
      order_ID: Number(formData.order_id),
      subject: "Cancellation Request",
      content: formData.message,
      type: "CANCELLATION_REQUEST",
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
    <Card
      className="
        bg-slate-50
        border
        border-slate-200
        shadow-md
      "
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold text-[#36B9CB]">
          Cancellation Request
        </CardTitle>

        <CardDescription className="text-sm text-slate-600">
          Request to cancel a booking. Our team will review your request and
          respond as soon as possible.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {/* ORDER SELECT */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">
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

          {/* REASON */}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm font-semibold text-slate-700"
            >
              Reason for Cancellation
            </Label>

            <Input
              id="message"
              placeholder="Please explain why you want to cancel this booking..."
              {...register("message", { required: "Reason is required" })}
              className="
                bg-white
                border-slate-300
                focus:border-[#36B9CB]
                focus:ring-[#36B9CB]
              "
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
