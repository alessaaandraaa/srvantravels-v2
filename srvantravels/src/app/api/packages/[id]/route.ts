import { NextResponse } from "next/server";
import PackageService from "@/services/package-service";

const packageService = new PackageService();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await Number(params.id);
    const packageById = await packageService.getPackages(id);
    return NextResponse.json({ packageById }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching package: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
