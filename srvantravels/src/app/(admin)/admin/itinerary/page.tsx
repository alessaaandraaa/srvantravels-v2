"use client";

import {
  Actives,
  Inactives,
  TotalItineraries,
} from "@/src/app/components/ui/Admin/AdminItinerary/AdminViewItineraryKPIS";
import { DataTable } from "@/src/app/components/ui/Admin/AdminItinerary/data-table";
import {
  getColumns,
  packageItinerary,
} from "../../../components/ui/Admin/AdminItinerary/columns";
import { useState, useEffect } from "react";


const page = () => {
  const [data, setData] = useState<packageItinerary[]>([])

  const fetchData = async () => {
    const res = await fetch("/api/packages-itinerary", {
      cache: "no-store",
    })
    const json = await res.json()
    setData(json)
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
      <div className="bg-primary-foreground rounded-lg">
        <TotalItineraries />
      </div>
      <div className="bg-primary-foreground rounded-lg">
        <Actives />
      </div>
      <div className="bg-primary-foreground rounded-lg">
        <Inactives />
      </div>
      <div className="bg-primary-foreground rounded-lg col-span-3 p-4">
        <DataTable columns={getColumns()} data={data} onAdded={fetchData}/>
      </div>
    </div>
  );
};

export default page;
