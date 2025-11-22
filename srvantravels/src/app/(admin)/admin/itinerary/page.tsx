"use client"

import { Actives, Inactives, TotalItineraries } from "@/app/components/ui/Admin/AdminItinerary/AdminViewItineraryKPIS";
import { DataTable } from "@/app/components/ui/Admin/AdminItinerary/data-table";
import { getColumns, packageItinerary } from "../../../components/ui/Admin/AdminItinerary/columns"

export const packageItineraries: packageItinerary[] = [
  {
    id: 1001,
    name: "Cebu Island Adventure",
    price: 8500,
    status: "Active",
    createdby: "Cliff Hysilens",
  },
  {
    id: 1002,
    name: "Bohol Countryside Escape",
    price: 7200,
    status: "Active",
    createdby: "Erika Lave",
  },
  {
    id: 1003,
    name: "Palawan Tropical Getaway",
    price: 12800,
    status: "Inactive",
    createdby: "Daniel Reyes",
  },
  {
    id: 1004,
    name: "Siargao Surfing Retreat",
    price: 9600,
    status: "Active",
    createdby: "Alyssa Morales",
  },
  {
    id: 1005,
    name: "Manila Heritage Tour",
    price: 5500,
    status: "Inactive",
    createdby: "John Cruz",
  },
  {
    id: 1006,
    name: "Baguio City Chill",
    price: 6300,
    status: "Active",
    createdby: "Cliff Hysilens",
  },
  {
    id: 1007,
    name: "Davao Nature Experience",
    price: 10500,
    status: "Active",
    createdby: "Alyssa Morales",
  },
  {
    id: 1008,
    name: "Boracay Island Bliss",
    price: 11200,
    status: "Inactive",
    createdby: "Erika Lave",
  },
  {
    id: 1009,
    name: "Iloilo Cultural Expedition",
    price: 8900,
    status: "Active",
    createdby: "John Cruz",
  },
  {
    id: 1010,
    name: "Tagaytay Weekend Getaway",
    price: 7400,
    status: "Inactive",
    createdby: "Daniel Reyes",
  },
];


const page = () => {
    return (
         <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
            <div className="bg-primary-foreground rounded-lg">
                <TotalItineraries/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <Actives/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <Inactives/>
            </div>
            <div className="bg-primary-foreground rounded-lg col-span-3 p-4">   
                <DataTable columns={getColumns()} data={packageItineraries}/>
            </div>
         </div>
    )
}

export default page;