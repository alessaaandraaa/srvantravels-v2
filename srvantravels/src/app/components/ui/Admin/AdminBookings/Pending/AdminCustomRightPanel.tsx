"use client"

import { useEffect, useState } from "react"
import { CreditCard } from "lucide-react"
import { Button } from "../../button"

interface Props {
  orderId: number | null
  onActionComplete?: (orderId: number) => void
}

const AdminCustomRightPanel = ({ orderId, onActionComplete }: Props) => {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (!orderId) {
      setBooking(null)
      return
    }

    setLoading(true)

    fetch(`/api/pending-bookings/${orderId}`, {
      cache: "no-store",
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch booking")
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

  const handleApprove = async () => {
      if (!orderId) return

      setActionLoading(true)

      try {
        const res = await fetch(`/api/pending-bookings/${orderId}/approve`, {
          method: "PATCH",
        })

        if (!res.ok) {
          throw new Error("Approve failed")
        }

        onActionComplete?.(orderId)
        setBooking(null)
      } catch (err) {
        console.error(err)
      } finally {
        setActionLoading(false)
      }
    }

    const handleReject = async () => {
      if (!orderId) return

      setActionLoading(true)

      try {
        const res = await fetch(`/api/pending-bookings/${orderId}/reject`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: "Booking rejected by administrator.",
          }),
        })

        if (!res.ok) {
          throw new Error("Reject failed")
        }

        onActionComplete?.(orderId)
        setBooking(null)
      } catch (err) {
        console.error(err)
      } finally {
        setActionLoading(false)
      }
    }


  if (!orderId) {
    return (
      <div className="p-8 text-muted-foreground">
        Select a booking to view details
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-8 text-muted-foreground">
        Loading booking details...
      </div>
    )
  }

  if (!booking) {
    return null 
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
            <span
              key={index}
              className="text-[13px] before:content-['•'] before:mr-2"
            >
              {stop}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t my-2" />

      {/* Date / Time */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground text-[12px]">Date</span>
          <div className="font-medium">
            {booking.date
              ? new Date(booking.date).toLocaleDateString()
              : "—"}
          </div>
        </div>
        <div>
          <span className="text-muted-foreground text-[12px]">Time</span>
          <div className="font-medium">
            {booking.time
              ? new Date(booking.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </div>
        </div>
      </div>

      {/* Pax / Luggage */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground text-[12px]">
            Number of Party Members
          </span>
          <div className="font-medium">{booking.pax ?? "—"}</div>
        </div>
        <div>
          <span className="text-muted-foreground text-[12px]">
            Luggage
          </span>
          <div className="font-medium">{booking.luggage ?? "—"}</div>
        </div>
      </div>

      {/* Payment */}
      <div className="text-sm">
        <span className="text-muted-foreground text-[12px]">
          Payment Method
        </span>
        <div className="flex items-center gap-1 font-medium">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          {booking.paymentMethod ?? "—"}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 flex gap-2">
        <Button
          variant="destructive"
          className="w-1/2"
          onClick={handleReject}
          disabled={actionLoading}
        >
          Reject
        </Button>

        <Button
          className="w-1/2"
          onClick={handleApprove}
          disabled={actionLoading}
        >
          Approve
        </Button>
      </div>
    </div>
  )
}

export default AdminCustomRightPanel
