import { NextResponse } from "next/server";
import { PackageKPIService } from "@/services/package-KPIS-service";

export async function GET() {
  const data = await PackageKPIService.getKPIs();
  return NextResponse.json(data);
}
