import { prisma } from "@/lib/db"   

export class PackageKPIService {
  static async getKPIs() {
    const total = await prisma.package_Itinerary.count()
    const active = await prisma.package_Itinerary.count({
      where: { is_available: true },
    })

    return {
      total,
      active,
      inactive: total - active,
    }
  }
}
