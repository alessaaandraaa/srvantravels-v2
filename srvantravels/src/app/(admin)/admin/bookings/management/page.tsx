import { NeedsDriver, NeedsVan, NumberBookingsWeek } from "@/app/components/ui/Admin/AdminBookings/Management/AdminManageKPIS";
import AdminManageCalendar from "@/app/components/ui/Admin/AdminBookings/Management/AdminManageCalendar";
import AdminManageTable from "@/app/components/ui/Admin/AdminBookings/Management/AdminManageTable";

const page = async () => {    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
            <div className="bg-primary-foreground rounded-lg max-h-[150px]">
                <NumberBookingsWeek/>    
            </div>
            <div className="bg-primary-foreground rounded-lg max-h-[150px]">
                <NeedsDriver/>
            </div>
            <div className="bg-primary-foreground rounded-lg max-h-[150px]">  
                <NeedsVan/>
            </div>
            <div className="bg-primary-foreground rounded-lg col-span-1">
                <AdminManageCalendar/>
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
                <AdminManageTable/>
            </div>
        </div>
    )
}
export default page;