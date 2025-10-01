import { prisma } from "@/lib/db";

class PackageService {
  async getPackages(id?: number) {
    try {
      if (id) {
        const pack = await prisma.package_Itinerary.findUnique({
          where: { package_ID: id },
        });
        return pack;
      }
      const packages = await prisma.package_Itinerary.findMany();
      return packages;
    } catch (error) {
      console.error("Error fetching packages:", error);
      throw new Error("Could not fetch packages.");
    }
  }

  // TODO: ADD, EDIT, AND DELETE
}

export default PackageService;
