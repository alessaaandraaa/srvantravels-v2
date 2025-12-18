"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../Sidebar/sheet"
import { Button } from "../button"
import {
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  XCircle,
} from "lucide-react"
import { cn } from "../../../../../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import { Label } from "../../../../../../components/ui/label"
import { Input } from "../../../../../../components/ui/input"
import { Textarea } from "../../../../../../components/ui/textarea"
import { ScrollArea } from "../../../../../../components/ui/scroll-area"

export type packageItinerary = {
  id: number
  name: string
  price?: number | null
  status: "Active" | "Inactive"
  createdby: string
  routes?: string[]
  inclusions?: string[]
  description?: string
}

export const getColumns = (
  onUpdated?: () => void
): ColumnDef<packageItinerary>[] => [
  {
    accessorKey: "createdby",
    header: "Created by",
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Package ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: "Package Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const pkg = row.original

      const updateStatus = async (newStatus: "Active" | "Inactive") => {
        await fetch(`/api/packages-itinerary/${pkg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            is_available: newStatus === "Active",
          }),
        })

        onUpdated?.()
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "flex items-center gap-2 w-[120px] justify-center",
                pkg.status === "Active"
                  ? "border-emerald-500/60 bg-emerald-100/30 text-emerald-700"
                  : "border-rose-500/60 bg-rose-100/30 text-rose-700"
              )}
            >
              {pkg.status === "Active" ? <CheckCircle2 /> : <XCircle />}
              {pkg.status}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => updateStatus("Active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus("Inactive")}>
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const pkg = row.original
      const router = useRouter()

      const [open, setOpen] = useState(false)
      const [name, setName] = useState(pkg.name)
      const [price, setPrice] = useState<number | undefined>(pkg.price ?? undefined)
      const [description, setDescription] = useState(pkg.description ?? "")
      const [routes, setRoutes] = useState<string[]>([])
      const [routeInput, setRouteInput] = useState("")
      const [inclusions, setInclusions] = useState<string[]>([])
      const [inclusionInput, setInclusionInput] = useState("")

      useEffect(() => {
        setRoutes(pkg.routes ?? [])
        setInclusions(pkg.inclusions ?? [])
      }, [])

      const addRoute = () => {
        if (!routeInput.trim()) return
        setRoutes(prev => [...prev, routeInput.trim()])
        setRouteInput("")
      }

      const addInclusion = () => {
        if (!inclusionInput.trim()) return
        setInclusions(prev => [...prev, inclusionInput.trim()])
        setInclusionInput("")
      }

      const handleSave = async () => {
        await fetch(`/api/packages-itinerary/${pkg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            price,
            routes,
            inclusions,
            description,
            // is_available: pkg.status === "Active",
          }),
        })
        setOpen(false)
        onUpdated?.()
      }

      return (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost">View more info</Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto p-4">
            <SheetHeader>
              <SheetTitle>Edit Package</SheetTitle>
              <SheetDescription>Update package details</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label>Package Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Price per PAX</Label>
                <Input
                  type="number"
                  value={price ?? ""}
                  onChange={e => setPrice(e.target.valueAsNumber)}
                />
              </div>

              <div className="space-y-2">
                <Label>Route</Label>
                <div className="flex gap-2">
                  <Input
                    value={routeInput}
                    onChange={e => setRouteInput(e.target.value)}
                  />
                  <Button onClick={addRoute}>Add</Button>
                </div>
                <ScrollArea className="h-24 border p-2">
                  <ul className="space-y-1">
                    {routes.map((r, i) => (
                      <li key={i} className="flex justify-between text-sm">
                        {r}
                        <button onClick={() => setRoutes(routes.filter((_, idx) => idx !== i))}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Inclusions</Label>
                <div className="flex gap-2">
                  <Input
                    value={inclusionInput}
                    onChange={e => setInclusionInput(e.target.value)}
                  />
                  <Button onClick={addInclusion}>Add</Button>
                </div>
                <ScrollArea className="h-24 border p-2">
                  <ul className="space-y-1">
                    {inclusions.map((i, idx) => (
                      <li key={idx} className="flex justify-between text-sm">
                        {i}
                        <button onClick={() => setInclusions(inclusions.filter((_, id) => id !== idx))}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )
    },
  },
]
