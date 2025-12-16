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
import { useForm, SubmitHandler } from "react-hook-form";
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
      headers: {
        "Content-Type": "application/json",
      },

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
    <Card>
      <CardHeader>
        <CardTitle>Send a Cancellation Request</CardTitle>
        <CardDescription>
          Send a cancellation request for your booking. Please note that we will
          review your cancellation before confirming it.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <OrderSelect
            user_id={user_id}
            registration={register("order_id", {
              required: "Please select an order",
            })}
          />

          {errors.order_id && (
            <p className="text-red-500 text-sm">{errors.order_id.message}</p>
          )}

          <div className="space-y-1">
            <Label htmlFor="message" className="pb-3">
              Reason
            </Label>

            <Input
              id="message"
              placeholder="Send your reason here."
              {...register("message", { required: "Reason is required" })}
            />

            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
