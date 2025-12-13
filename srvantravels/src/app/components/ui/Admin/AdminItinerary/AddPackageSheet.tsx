"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../Sidebar/sheet";
import { Input } from "../input";
import { Label } from "../../../../../../components/ui/label";
import { Textarea } from "../../../../../../components/ui/textarea";
import { ScrollArea } from "../scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddPackageSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // open sheet if URL contains ?add=true
  const isAddFromUrl = searchParams.get("add") === "true";

  const [open, setOpen] = useState(isAddFromUrl);

  // keep sheet state synced when URL changes
  useEffect(() => {
    setOpen(isAddFromUrl);
  }, [isAddFromUrl]);

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
    setRoutes([]);
    setInclusions([]);
    setRouteInput("");
    setInclusionInput("");
  };

  // when opening the sheet through button click
  const handleOpen = () => {
    router.push("?add=true", { scroll: false });
  };

  // when closing the sheet through "X" or cancel button
  const handleClose = () => {
    router.push("?add=false", { scroll: false });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={(state) => state ? handleOpen() : handleClose()}>
      <SheetTrigger asChild>
        <Button className=""><Plus/></Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Add New Package</SheetTitle>
          <SheetDescription>
            Fill out the details below to create a new travel package.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          
          {/* Package Name */}
          <div className="space-y-2">
            <Label>Package Name</Label>
            <Input placeholder="Enter package name" />
          </div>

          {/* Passenger Count */}
          <div className="space-y-2">
            <Label>Passenger Count</Label>
            <Input type="number" placeholder="e.g. 20" />
          </div>

          {/* Price per PAX */}
          <div className="space-y-2">
            <Label>Price per PAX</Label>
            <Input type="number" placeholder="₱ price" />
          </div>

          {/* Route Section */}
          <div className="space-y-2">
            <Label>Route</Label>

            <div className="flex gap-2">
              <Input
                placeholder="Enter route"
                value={routeInput}
                onChange={(e) => setRouteInput(e.target.value)}
              />
              <Button onClick={addRoute}>Add</Button>
            </div>

            <ScrollArea className="h-24 w-full rounded-md border p-2">
              {routes.length === 0 && (
                <p className="text-sm text-muted-foreground">No routes added.</p>
              )}

              <ul className="space-y-1">
                {routes.map((r, i) => (
                  <li key={i} className="text-sm flex justify-between">
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

          {/* Inclusions Section */}
          <div className="space-y-2">
            <Label>Inclusions</Label>

            <div className="flex gap-2">
              <Input
                placeholder="Enter inclusion"
                value={inclusionInput}
                onChange={(e) => setInclusionInput(e.target.value)}
              />
              <Button onClick={addInclusion}>Add</Button>
            </div>

            <ScrollArea className="h-24 w-full rounded-md border p-2">
              {inclusions.length === 0 && (
                <p className="text-sm text-muted-foreground">No inclusions added.</p>
              )}

              <ul className="space-y-1">
                {inclusions.map((inc, i) => (
                  <li key={i} className="text-sm flex justify-between">
                    {inc}
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Enter package description..." />
          </div>

          {/* Attach Image */}
          <div className="space-y-2">
            <Label>Attach Image</Label>
            <Input type="file" accept="image/*" />
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={() => console.log("Add package submitted")}>
              Add Package
            </Button>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
