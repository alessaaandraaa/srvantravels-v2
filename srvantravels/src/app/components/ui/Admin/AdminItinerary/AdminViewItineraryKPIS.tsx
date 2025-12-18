import { TrendingUp, TrendingDown } from "lucide-react"

import { useState, useEffect } from "react";
import { Badge } from "../badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card"

export function TotalItineraries() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/packages-itinerary/kpis")
      .then(res => res.json())
      .then(data => setCount(data.total));
  }, []);

  return (
    <div className="">
      <Card className="max-h-[150px]">
        <CardHeader>
          <CardDescription>Total Packages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {count}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +17.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            More Packages to Add <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export function Actives() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/packages-itinerary/kpis")
      .then(res => res.json())
      .then(data => setCount(data.active));
  }, []);

  return (
    <div className="">
      <Card className="max-h-[150px]">
        <CardHeader>
          <CardDescription>Total Active Packages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {count}
          </CardTitle>  
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +21.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Set Packages for Availability <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export function Inactives() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/packages-itinerary/kpis")
      .then(res => res.json())
      .then(data => setCount(data.inactive));
  }, []);

  return (
    <div className="">
      <Card className="max-h-[150px]">
        <CardHeader className="aspect-auto h-auto">
          <CardDescription>Total Inactive Packages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {count}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              +37.5%
            </Badge>  
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Unavailable Packages this Month <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}