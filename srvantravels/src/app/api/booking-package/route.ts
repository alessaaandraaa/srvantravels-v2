import fs from "fs";
import path from "path";

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
    console.log(newPayment);

    const base64Data = body.customer.ID_PictureB64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64Data, "base64");

    const uploadsDir = path.join(process.cwd(), "public/id-uploads");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const filename = `id_${body.customer.customer_ID}_${Date.now()}.jpg`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    const relativePath = `/id-uploads/${filename}`;

    try {
      console.log(relativePath);
      const newCustomer = await customerService.addCustomer({
        customer_ID: body.customer.customer_ID,
        payment_ID: newPayment.payment_ID,
        number_of_PAX: body.customer.number_of_PAX,
        date_of_travel: new Date(body.customer.date_of_travel),
        number_of_luggage: body.customer.number_of_luggage,
        ID_Picture: relativePath,
      });

      console.log(newCustomer);

      const newOrder = await orderDetailsService.addOrderDetails({
        customer_ID: body.customer.customer_ID,
        payment_ID: newPayment.payment_ID,
        itinerary_ID: body.customer.itinerary_ID,
        number_of_PAX: body.customer.number_of_PAX,
        date_of_travel: new Date(body.customer.date_of_travel),
      });

      console.log(newOrder);
      return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
      console.error("Error adding customer:", error);
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  } catch (error) {
    console.error("Error adding payment:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
