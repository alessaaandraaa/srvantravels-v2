import { CreditCard, MapPin, Pin } from "lucide-react";
import { Button } from "../../button";

const AdminCustomRightPanel = () => {
    return (
        <div className="flex flex-col p-8 gap-4 border-2 rounded-lg h-full">
                {/* Header */}
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold tracking-tight">
                [Itinerary Booking Request]
                </h2>
                <span className="text-sm text-muted-foreground">
                Requested by: <span className="font-medium text-foreground">Cerydra Lava Hysilens</span>
                </span>
            </div>

            <div className="border-t my-2" />

            {/* Booking Details */}
            <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-[2px]" />
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Pick-up Location</span>
                        <span className="font-medium">Ayala Station, Makati City</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                    <span className="text-muted-foreground text-[12px]">
                        Stops (up to 12)
                    </span>

                    {/* Make an Array Later On */}
                    <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                        {[
                        "Rizal Park",
                        "Intramuros",
                        "SM Mall of Asia",
                        "Tagaytay Viewpoint",
                        "Ayala Triangle",
                        "Manila Ocean Park",
                        "Binondo Church",
                        "Fort Santiago",
                        "Greenbelt Park",
                        "National Museum",
                        "Manila Cathedral",
                        "Robinsons Place"
                        ]
                        .map((stop, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-[13px] text-foreground before:content-['•'] before:mr-2 before:text-muted-foreground">
                                    {stop}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t my-2" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Date</span>
                        <span className="font-medium">December 27, 2020</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Time</span>
                        <span className="font-medium">11:01 PM</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Number of Party Members</span>
                        <span className="font-medium">5</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Luggages</span>
                        <span className="font-medium">3</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Payment Method</span>
                        <span className="font-medium flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" /> Credit Card
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-muted-foreground text-[12px]">Number of Pit Stops</span>
                        <span className="font-medium">4</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 flex justify-between gap-2">
                <Button variant="destructive" className="w-1/2">Reject</Button>
                <Button variant="default" className="w-1/2">Approve</Button>
            </div>
         </div>
    )
}

export default AdminCustomRightPanel;