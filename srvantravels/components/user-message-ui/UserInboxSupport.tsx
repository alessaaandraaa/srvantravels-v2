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
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

type SupportFormValues = {
  message: string;
};

type id = { user_id: number | null };

export default function UserSupport({ user_id }: id) {
  console.log("USER ID ILOY SI CLIFF: ", user_id);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SupportFormValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (formData: SupportFormValues) => {
    const body = {
      sender_ID: user_id,
      subject: "General Inquiry",
      content: formData.message,
      type: "GENERAL_INQUIRY",
    };
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    if (response.ok) {
      toast.success("Successfully sent request!");
    } else {
      const errorData = await response.json().catch(() => null);
      console.error("SERVER ERROR:", response.status, errorData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support</CardTitle>
        <CardDescription>Ask us any of your concerns.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="message">Inquiry</Label>

            <Input
              id="message"
              placeholder="Send your question here."
              {...register("message", { required: "Message is required" })}
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
      <Toaster />
    </Card>
  );
}
