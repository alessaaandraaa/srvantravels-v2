"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../Sidebar/sheet";
import { Input } from "../input";
import { Label } from "../../../../../../components/ui/label";
import { Textarea } from "../../../../../../components/ui/textarea";
import { ScrollArea } from "../scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddPackageSheet({ onAdded }: { onAdded?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAddFromUrl = searchParams.get("add") === "true";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAddFromUrl) {
      setOpen(true);
    }
  }, [isAddFromUrl]);


  const [name, setName] = useState("");
  const [pax, setPax] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const [routes, setRoutes] = useState<string[]>([]);
  const [routeInput, setRouteInput] = useState("");

  const [inclusions, setInclusions] = useState<string[]>([]);
  const [inclusionInput, setInclusionInput] = useState("");

  const addRoute = () => {
    if (!routeInput.trim()) return;
    setRoutes(prev => [...prev, routeInput.trim()]);
    setRouteInput("");
  };

  const addInclusion = () => {
    if (!inclusionInput.trim()) return;
    setInclusions(prev => [...prev, inclusionInput.trim()]);
    setInclusionInput("");
  };

  const resetForm = () => {
    setName("");
    setPax("");
    setPrice("");
    setDescription("");
    setRoutes([]);
    setInclusions([]);
    setRouteInput("");
    setInclusionInput("");
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    await fetch("/api/packages-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        pax,
        routes,
        inclusions,
        description,
      }),
    })

    await onAdded?.()   
    resetForm()
    setOpen(false)    
  }


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Add New Package</SheetTitle>
          <SheetDescription>
            Fill out the details below to create a new travel package.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">

          <div className="space-y-2">
            <Label>Package Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Passenger Count</Label>
            <Input
              type="number"
              value={pax}
              onChange={e => setPax(e.target.valueAsNumber || "")}
            />
          </div>

          <div className="space-y-2">
            <Label>Price per PAX</Label>
            <Input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.valueAsNumber || "")}
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
              {routes.length === 0 && (
                <p className="text-sm text-muted-foreground">No routes added.</p>
              )}
              <ul className="space-y-1">
                {routes.map((r, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    {r}
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => setRoutes(routes.filter((_, idx) => idx !== i))}
                    >
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
              {inclusions.length === 0 && (
                <p className="text-sm text-muted-foreground">No inclusions added.</p>
              )}
              <ul className="space-y-1">
                {inclusions.map((i, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    {i}
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => setInclusions(inclusions.filter((_, id) => id !== idx))}
                    >
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

          {/* <div className="space-y-2">
            <Label>Attach Image</Label>
            <Input type="file" accept="image/*" />
          </div> */}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Package</Button>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
