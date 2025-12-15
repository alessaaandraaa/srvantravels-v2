import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import OrderSelectServer from "./UserOrderSelectServer";
import Order from "../user-ui/Order";
export default function UserCancel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Cancellation Request</CardTitle>
        <CardDescription>
          Send a cancellation request for your booking. Please note that we will
          review your cancellation before confirming it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form>
          <OrderSelectServer />
          <div className="space-y-1">
            <Label htmlFor="message" className="pb-3">
              Reason
            </Label>
            <Input id="message" placeholder="Send your reason here." />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Submit Cancellation Request</Button>
      </CardFooter>
    </Card>
  );
}
