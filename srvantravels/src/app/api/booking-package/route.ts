import fs from "fs";
import path from "path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import CustomerService from "@/services/customer-service";
import OrderDetailsService from "@/services/orderdetails-service";
import PaymentService from "@/services/payment-service";

const customerService = new CustomerService();
const orderDetailsService = new OrderDetailsService();
const paymentService = new PaymentService();

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const newPayment = await paymentService.addPayment(body.payment);

    let relativePath: string | null = null;

    if (body.customer.ID_PictureB64) {
      const base64Data = body.customer.ID_PictureB64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const buffer = Buffer.from(base64Data, "base64");
      const filename = `id_${body.customer.customer_id}_${Date.now()}.jpg`;

      try {
        const blob = await put(`id-uploads/${filename}`, buffer, {
          access: "public",
          contentType: "image/jpeg",
        });

        relativePath = blob.url;
      } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    try {
      const newCustomer = await customerService.addCustomer({
        customer_ID: body.customer.customer_ID,
        payment_ID: newPayment.payment_ID,
        number_of_PAX: body.customer.number_of_PAX,
        date_of_travel: new Date(body.customer.date_of_travel),
        number_of_luggage: body.customer.number_of_luggage,
        ID_Picture: relativePath ?? "",
      });

      const newOrder = await orderDetailsService.addOrderDetails({
        customer_ID: body.customer.customer_ID,
        payment_ID: newPayment.payment_ID,
        itinerary_ID: body.customer.itinerary_ID,
        number_of_PAX: body.customer.number_of_PAX,
        date_of_travel: new Date(body.customer.date_of_travel),
      });

      return NextResponse.json(
        { message: "success", order_ID: newOrder.order_ID },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error adding customer:", error);
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  } catch (error) {
    console.error("Error adding payment:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
