import { NextResponse } from "next/server";
import { getAcceptedRejectedPerMonth } from "../../../../../../lib/dashboard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get("year")) || new Date().getFullYear();

  const data = await getAcceptedRejectedPerMonth(year);

  return NextResponse.json(data);
}
