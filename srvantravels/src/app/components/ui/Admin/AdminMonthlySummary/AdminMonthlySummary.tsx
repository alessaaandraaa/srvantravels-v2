"use client"

import { useEffect, useState } from "react"
import { CalendarDays, UsersRound } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select"
import { Dialog, DialogContent } from "../dialog"
import { DataTable } from "./data-table"
import { getColumns, orderSummary } from "./columns"

type MonthlySummary = {
  month: number
  bookingsCompleted: number
  totalRevenue: number
  avgPerBooking: number
  totalClients: number
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const AdminMonthlySummary = () => {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [months, setMonths] = useState<MonthlySummary[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [orders, setOrders] = useState<orderSummary[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/yearly-summary?year=${selectedYear}`)
      .then(res => res.json())
      .then(setMonths)
  }, [selectedYear])

  useEffect(() => {
    if (!selectedMonth) return

    setLoading(true)
    fetch(`/api/monthly-summary?year=${selectedYear}&month=${selectedMonth}`)
      .then(res => res.json())
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [selectedMonth, selectedYear])

  return (
    <div className="flex flex-col gap-6 p-4">

      {/* YEAR SELECT */}
      <Select onValueChange={val => setSelectedYear(Number(val))}>
        <SelectTrigger>Year: {selectedYear}</SelectTrigger>
        <SelectContent>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
        </SelectContent>
      </Select>

      {/* MONTH GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {months.map(m => (
          <Card
            key={m.month}
            onClick={() => {
              setSelectedMonth(m.month)
              setOpen(true)
            }}
            className="cursor-pointer hover:shadow-md transition"
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                {MONTHS[m.month - 1]} {selectedYear}
              </CardTitle>
              <CardDescription>Monthly overview</CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Bookings</span>
                <span className="text-lg font-semibold block">
                  {m.bookingsCompleted}
                </span>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">Revenue</span>
                <span className="text-lg font-semibold block">
                  ₱ {m.totalRevenue.toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">Avg / Booking</span>
                <span className="text-lg font-semibold block">
                  ₱ {Math.round(m.avgPerBooking).toLocaleString()}
                </span>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">Clients</span>
                <span className="text-lg font-semibold flex items-center gap-1">
                  <UsersRound className="h-4 w-4 text-blue-500" />
                  {m.totalClients}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MONTH DETAILS DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[920px] h-[420px] p-4">
          {selectedMonth && (
            <>
              <h2 className="text-lg font-semibold mb-4">
                {MONTHS[selectedMonth - 1]} {selectedYear} — Orders
              </h2>

              {loading ? (
                <div className="text-center text-muted-foreground">
                  Loading orders…
                </div>
              ) : (
                <DataTable columns={getColumns()} data={orders} />
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminMonthlySummary
