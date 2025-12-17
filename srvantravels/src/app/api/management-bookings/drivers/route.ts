import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const drivers = await prisma.driver.findMany({
    where: {
      Availability: true,
    },
    include: {
      employee: {
        include: {
          person: true,
        },
      },
    },
  });

  return NextResponse.json(
    drivers.map((d) => ({
      driverid: d.driver_ID,
      name: d.employee.person.name,
      availability: d.Availability ?? false,
    }))
  );
}
