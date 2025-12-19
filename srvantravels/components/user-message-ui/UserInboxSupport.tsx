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
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

type SupportFormValues = {
  message: string;
};

type id = { user_id: number | null };

export default function UserSupport({ user_id }: id) {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      toast.success("Your message has been sent!");
    } else {
      const errorData = await response.json().catch(() => null);
      console.error("SERVER ERROR:", response.status, errorData);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl font-bold text-[#36B9CB]">
            Contact Support
          </CardTitle>

          <CardDescription className="text-sm text-gray-600">
            Have a question or concern? Send us a message and we’ll get back to
            you as soon as possible.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-semibold text-gray-700"
              >
                Your Message
              </Label>

              <Input
                id="message"
                placeholder="Type your concern or question here..."
                {...register("message", { required: "Message is required" })}
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
                bg-[#36B9CB]
                text-white
                font-semibold
                hover:bg-[#2ea8b9]
                transition
              "
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Toaster position="bottom-right" />
    </>
  );
}
