import { prisma } from "@/lib/db";

class PackageService {
  async getPackages() {
    try {
      const packages = await prisma.package_itinerary.findMany();
      return packages;
    } catch (error) {
      console.error("Error fetching packages:", error);
      throw new Error("Could not fetch packages.");
    }
  }

  // TODO: ADD, EDIT, AND DELETE
}

export default PackageService;
