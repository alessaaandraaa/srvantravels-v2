import { prisma } from "@/lib/db";

export async function GET() {
  const value = "/id-uploads/test.jpg";
  console.log("Before:", value);
  try {
    await prisma.customer.create({
      data: {
        customer_ID: 1,
        payment_ID: 1,
        number_of_PAX: 1,
        date_of_travel: new Date(),
        ID_Picture: value,
      },
    });
  } catch (err) {
    console.error("Caught:", err);
  }
  return new Response("done");
}
