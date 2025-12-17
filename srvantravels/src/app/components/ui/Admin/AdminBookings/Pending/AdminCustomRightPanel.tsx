"use client"

import { useEffect, useState } from "react"
import { CreditCard } from "lucide-react"
import { Button } from "../../button"

interface Props {
  orderId: number | null
}

const AdminCustomRightPanel = ({ orderId }: Props) => {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setBooking(null)
      return
    }

    setLoading(true)

    fetch(`/api/pending-bookings/${orderId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch booking")
        }
        return res.json()
      })
      .then(data => {
        setBooking(data)
      })
      .catch(err => {
        console.error(err)
        setBooking(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [orderId])

  // 🔹 No selection yet
  if (!orderId) {
    return (
      <div className="p-8 text-muted-foreground">
        Select a booking to view details
      </div>
    )
  }

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="p-8 text-muted-foreground">
        Loading booking details...
      </div>
    )
  }

  // 🔹 API returned nothing
  if (!booking) {
    return (
      <div className="p-8 text-muted-foreground">
        Booking not found
      </div>
    )
  }

  return (
    <div className="flex flex-col p-8 gap-4 border-2 rounded-lg h-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">
          [{booking.itineraryType} Itinerary Booking]
        </h2>
        <span className="text-sm text-muted-foreground">
          Requested by{" "}
          <span className="font-medium text-foreground">
            {booking.customerName}
          </span>
        </span>
      </div>

      <div className="border-t my-2" />

      {/* Stops */}
      <div className="space-y-2 text-sm">
        <span className="text-muted-foreground text-[12px]">Stops</span>
        <div className="grid grid-cols-3 gap-x-6 gap-y-1">
          {booking.stops.map((stop: string, index: number) => (
            <div key={index} className="flex items-start">
              <span className="text-[13px] before:content-['•'] before:mr-2">
                {stop}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t my-2" />

      {/* Date / Time */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[12px]">Date</span>
          <span className="font-medium">
            {booking.date
              ? new Date(booking.date).toLocaleDateString()
              : "—"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[12px]">Time</span>
          <span className="font-medium">
            {booking.time
              ? new Date(booking.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </span>
        </div>
      </div>

      {/* Pax / Luggage */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[12px]">
            Number of Party Members
          </span>
          <span className="font-medium">{booking.pax ?? "—"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[12px]">
            Luggage
          </span>
          <span className="font-medium">{booking.luggage ?? "—"}</span>
        </div>
      </div>

      {/* Payment */}
      <div className="flex flex-col text-sm">
        <span className="text-muted-foreground text-[12px]">
          Payment Method
        </span>
        <span className="font-medium flex items-center gap-1">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          {booking.paymentMethod ?? "—"}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 flex gap-2">
        <Button variant="destructive" className="w-1/2">
          Reject
        </Button>
        <Button className="w-1/2">
          Approve
        </Button>
      </div>
    </div>
  )
}

export default AdminCustomRightPanel
