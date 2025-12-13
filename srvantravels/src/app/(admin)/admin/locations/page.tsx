"use client"

import { getColumns } from "@/app/components/ui/Admin/AdminLocations/columns";
import AdminViewLocation from "@/app/components/ui/Admin/AdminLocations/AdminLocationForm";
import { DataTable } from "@/app/components/ui/Admin/AdminLocations/data-table";
import { locations } from "../../../components/ui/Admin/AdminLocations/columns"

export const sampleLocations: locations[] = [
  {
    location_name: "Central Park",
    location_address: "5th Ave, New York, NY 10022"
  },
  {
    location_name: "Eiffel Tower",
    location_address: "Champ de Mars, 5 Avenue Anatole, Paris, France"
  },
  {
    location_name: "Tokyo Tower",
    location_address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan"
  },
  {
    location_name: "Rizal Park",
    location_address: "Taft Ave, Ermita, Manila, Philippines"
  },
  {
    location_name: "Sydney Opera House",
    location_address: "Bennelong Point, Sydney NSW 2000, Australia"
  },
  {
    location_name: "Central Park",
    location_address: "5th Ave, New York, NY 10022"
  },
  {
    location_name: "Eiffel Tower",
    location_address: "Champ de Mars, 5 Avenue Anatole, Paris, France"
  },
  {
    location_name: "Tokyo Tower",
    location_address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan"
  },
  {
    location_name: "Rizal Park",
    location_address: "Taft Ave, Ermita, Manila, Philippines"
  },
  {
    location_name: "Sydney Opera House",
    location_address: "Bennelong Point, Sydney NSW 2000, Australia"
  },
  {
    location_name: "Central Park",
    location_address: "5th Ave, New York, NY 10022"
  },
  {
    location_name: "Eiffel Tower",
    location_address: "Champ de Mars, 5 Avenue Anatole, Paris, France"
  },
  {
    location_name: "Tokyo Tower",
    location_address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan"
  },
  {
    location_name: "Rizal Park",
    location_address: "Taft Ave, Ermita, Manila, Philippines"
  },
  {
    location_name: "Sydney Opera House",
    location_address: "Bennelong Point, Sydney NSW 2000, Australia"
  },
  {
    location_name: "Central Park",
    location_address: "5th Ave, New York, NY 10022"
  },
  {
    location_name: "Eiffel Tower",
    location_address: "Champ de Mars, 5 Avenue Anatole, Paris, France"
  },
  {
    location_name: "Tokyo Tower",
    location_address: "4 Chome-2-8 Shibakoen, Minato City, Tokyo, Japan"
  },
  {
    location_name: "Rizal Park",
    location_address: "Taft Ave, Ermita, Manila, Philippines"
  },
  {
    location_name: "Sydney Opera House",
    location_address: "Bennelong Point, Sydney NSW 2000, Australia"
  }
];


const page = () => {
    return (
         <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-2 rounded-lg bg-primary-foreground h-[600px]">
                {/* <Map/> */}
            </div>
            <div className="flex flex-col col-span-2 gap-4">
                <div className="rounded-lg bg-primary-foreground h-[290px] p-4">
                    <AdminViewLocation/>
                </div>
                <div className="rounded-lg bg-primary-foreground h-[290px] p-4">
                    <DataTable columns={getColumns()} data={sampleLocations}/>
                </div>
            </div>
         </div>
    )
}

export default page;