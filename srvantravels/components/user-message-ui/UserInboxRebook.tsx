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
import { useForm, SubmitHandler } from "react-hook-form";
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
        <CardTitle>Send a Rebooking Request</CardTitle>
        <CardDescription>
          Send a rebooking request for your booking. Please note that we will
          review your request before confirming it.
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

          <div className="p-3 gap-2">
            <label htmlFor="rebook_date" className="font-medium mr-2">
              Rebooking Date:
            </label>
            <Input
              type="date"
              id="rebook_date"
              {...register("rebook_date", {
                required: "Rebooking date is required",
              })}
              className="border border-gray-200 p-3 rounded-2xl"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="message" className="pb-3">
              Reason
            </Label>
            <Input
              id="message"
              placeholder="Send your reason here."
              {...register("message", { required: "Reason is required" })}
            />
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
