import { prisma } from "@/lib/db"

export class PackageItineraryService {

  static async getAllPackages() {
    const packages = await prisma.package_Itinerary.findMany({
      include: {
        itinerary: true,
        manager: {
          include: {
            employee: {
              include: { person: true },
            },
          },
        },
      },
      orderBy: { package_ID: "desc" },
    })

    return packages.map(p => ({
      id: p.package_ID,
      name: p.package_name,
      price: p.itinerary?.price ? Number(p.itinerary.price) : null,
      status: p.is_available ? "Active" : "Inactive",
      createdby: p.manager?.employee?.person?.name ?? "System",
      routes: p.route ? p.route.split(" -> ") : [],
      inclusions: p.inclusions ? p.inclusions.split(" -> ") : [],
      description: p.description,
    }))
  }

  static async createPackage(data: {
    name: string
    price: number
    pax: number
    routes: string[]
    inclusions: string[]
    description: string
    managerId: number
  }) {
    return prisma.itinerary.create({
      data: {
        type: "PACKAGE",
        price: data.price,
        package_itinerary: {
          create: {
            package_name: data.name,
            number_of_PAX: data.pax,
            route: data.routes.join(" -> "),
            inclusions: data.inclusions.join(" -> "),
            description: data.description,
            is_made_by_manager: data.managerId,
            is_available: true,
          },
        },
      },
    })
  }

  static async updatePackage(packageId: number, data: {
    name: string
    price: number
    routes: string[]
    inclusions: string[]
    description: string
    is_available: boolean
  }) {
    return prisma.package_Itinerary.update({
      where: { package_ID: packageId },
      data: {
        package_name: data.name,
        route: data.routes.join(" -> "),
        inclusions: data.inclusions.join(" -> "),
        description: data.description,
        is_available: data.is_available,
        itinerary: {
          update: {
            price: data.price,
          },
        },
      },
    })
  }
}
