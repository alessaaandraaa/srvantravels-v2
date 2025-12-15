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

type SupportFormValues = {
  message: string;
};

export default function UserSupport() {
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

  const onSubmit: SubmitHandler<SupportFormValues> = async (formData) => {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push(`/messages`);
    } else {
      console.error("Request failed.");
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
    </Card>
  );
}
