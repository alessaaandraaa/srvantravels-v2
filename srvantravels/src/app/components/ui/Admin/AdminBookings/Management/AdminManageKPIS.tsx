import { TrendingUp, TrendingDown } from "lucide-react"

import { Badge } from "../../badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../card"

export function NumberBookingsWeek({ total }: { total: number }) {
  return (
    <div className="">
      <Card className="max-h-[150px]">
        <CardHeader>
          <CardDescription>Number of Bookings this Week</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +19.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this Week <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function NeedsDriver({ total }: { total: number }) {
  return (
    <div className="">
      <Card className="max-h-[150px]">
        <CardHeader>
          <CardDescription>Needs Driver</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +42.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Driver Assignment Needed <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function NeedsVan({ total }: { total: number }) {
  return (
    <div className="">
      <Card className="max-h-[150px]">
        <CardHeader>
          <CardDescription>Needs Van</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +19.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            In Recruitment of Vans <TrendingUp className="size-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
