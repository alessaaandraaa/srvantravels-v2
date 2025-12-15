import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OrderSelectServer from "./UserOrderSelectServer";
export default function UserRebook() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Rebooking Request</CardTitle>
        <CardDescription>
          Send a rebooking request for your booking. Please note that we will
          review your request before confirming it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form>
          <OrderSelectServer />
          <div className="p-3 gap-2">
            <label htmlFor="rebook_date" className="font-medium mr-2">
              Rebooking Date:
            </label>
            <input
              type="date"
              id="rebook_date"
              name="rebook_date"
              className="border border-gray-200 p-3 rounded-2xl"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="message" className="pb-3">
              Reason
            </Label>
            <Input id="message" placeholder="Send your reason here." />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Submit Rebook Request</Button>
      </CardFooter>
    </Card>
  );
}
