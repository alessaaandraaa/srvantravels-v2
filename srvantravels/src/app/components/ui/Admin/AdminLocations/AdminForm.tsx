import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

type Place = {
  name: string | undefined;
  address: string;
  lat: number;
  lng: number;
};

export default function AdminForm(props: Place) {
  const [placeName, setPlaceName] = useState(props.name || "");
  const router = useRouter();

  useEffect(() => {
    setPlaceName(props.name || "");
  }, [props.name]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("contact");

    const body = {
      location_name: placeName,
      location_address: props.address,
      lat: props.lat,
      lng: props.lng,
      is_custom_made: false,
    };

    console.log("BODY: ", body);

    const response = await fetch("/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      router.refresh();
      router.push(`/admin/locations`);
    } else {
      console.error("Location add failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={props.address}
            readOnly
            style={{
              cursor: "not-allowed",
            }}
          />
        </div>
      </div>
      <Button type="submit">Add Location</Button>
    </form>
  );
}
