import { NextResponse } from "next/server";
import PackageService from "@/services/package-service";

const packageService = new PackageService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pkgId = Number(id);
    const packageById = await packageService.getPackages(pkgId);
    return NextResponse.json({ packageById }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching package: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
