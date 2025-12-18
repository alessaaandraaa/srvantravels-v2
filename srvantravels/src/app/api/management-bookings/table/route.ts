import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const statusMap: Record<string, string> = {
  FULLY_PAID: "FULLY PAID",
  PARTIALLY_PAID: "PARTIALLY PAID",
  NOT_PAID: "NOT PAID",
};

export async function GET() {
  const orders = await prisma.order_Details.findMany({
    orderBy: {
      order_ID: "desc",
    },
    include: {
      customer: {
        include: {
          person: true,
          payment: true,
          van: true
        },
      },
      itinerary: true,
      driver: {
        include: {
          employee: {
            include: {
              person: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(
    orders.map((o) => {
        const rawStatus = o.customer?.payment?.payment_status;

        return {
        paymentstatus: rawStatus
            ? statusMap[rawStatus]
            : "NOT PAID",

        orderid: o.order_ID,
        name: o.customer?.person?.name ?? "Unknown",
        type: o.itinerary?.type === "PACKAGE" ? "Package" : "Custom",
        date: o.date_of_travel
            ? o.date_of_travel.toISOString().split("T")[0]
            : "—",
        driver: o.driver?.employee?.person?.name ?? "—",
        vanplatenumber: o.customer?.van?.[0]?.plate_number ?? "—",
        };
    })
    );

}
