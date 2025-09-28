import { NextResponse } from "next/server";
import PackageService from "@/services/package-service";

const packageService = new PackageService();

export async function GET() {
  try {
    const packages = await packageService.getPackages();
    return NextResponse.json(
      { packages, count: packages.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in fetching packages: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
