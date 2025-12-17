import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "../badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

export function Sales({ total }: { total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Sales</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {total.toLocaleString()}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            Live
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Accepted bookings <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Updated in real time
        </div>
      </CardFooter>
    </Card>
  );
}

export function Revenue({ total }: { total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          ₱{total.toLocaleString()}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            Live
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Fully paid transactions <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Based on payments received
        </div>
      </CardFooter>
    </Card>
  );
}

export function Customers({ total }: { total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Customers</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {total.toLocaleString()}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingDown />
            Live
          </Badge>
        </CardAction>
      </CardHeader>

      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Registered customers
        </div>
        <div className="text-muted-foreground">
          Total unique users
        </div>
      </CardFooter>
    </Card>
  );
}
