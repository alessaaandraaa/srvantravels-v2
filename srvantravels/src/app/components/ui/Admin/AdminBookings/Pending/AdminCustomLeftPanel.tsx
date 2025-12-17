"use client"

import { Flower, MailWarning } from "lucide-react"
import { Card } from "../../card"
import { ScrollArea } from "../../scroll-area"
import { PendingBookingSummary } from "@/src/app/(admin)/admin/bookings/pending/page"

interface Props {
  bookings: PendingBookingSummary[]
  selectedOrderId: number | null
  onSelect: (id: number) => void
}

const AdminCustomLeftPanel = ({
  bookings,
  selectedOrderId,
  onSelect,
}: Props) => {
  return (
    <div>
      <div className="flex gap-4 pl-1">
        <MailWarning />
        <p>Pending Bookings</p>
      </div>

      <ScrollArea className="h-[565px] mt-4 pr-4">
        <div className="flex flex-col gap-4">
          {bookings.map((booking, index) => (
            <Card
              key={booking.order_ID}
              onClick={() => onSelect(booking.order_ID)}
              className={`cursor-pointer ${
                selectedOrderId === booking.order_ID
                  ? "border-primary"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-4 pl-4">
                <Flower className="h-4" />
                <label className="text-sm text-muted-foreground">
                    {index + 1}.{" "}
                    {booking.itinerary?.type === "PACKAGE"
                        ? booking.itinerary.package_itinerary?.package_name
                        : "Custom Itinerary"}{" "}
                    | {booking.customer.person.name}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default AdminCustomLeftPanel
