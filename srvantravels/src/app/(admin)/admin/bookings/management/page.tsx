import AdminManageCalendar from "@/src/app/components/ui/Admin/AdminBookings/Management/AdminManageCalendar";
import AdminManageTable from "@/src/app/components/ui/Admin/AdminBookings/Management/AdminManageTable";
import NumberBookingsWeekWrapper from "@/src/app/components/ui/Admin/AdminBookings/Management/AdminManageBookingsWeekWrapper";
import NeedsDriverWrapper from "@/src/app/components/ui/Admin/AdminBookings/Management/AdminNeedsDriverWrapper";
import NeedsVanWrapper from "@/src/app/components/ui/Admin/AdminBookings/Management/AdminNeedsVanWrapper";
import AdminManageTableWrapper from "@/src/app/components/ui/Admin/AdminBookings/Management/AdminManageTableWrapper";

const page = async () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
      <div className="bg-primary-foreground rounded-lg max-h-[150px]">
        <NumberBookingsWeekWrapper />
      </div>
      <div className="bg-primary-foreground rounded-lg max-h-[150px]">
        <NeedsDriverWrapper />
      </div>
      <div className="bg-primary-foreground rounded-lg max-h-[150px]">
        <NeedsVanWrapper />
      </div>
      <div className="bg-primary-foreground rounded-lg col-span-1">
        <AdminManageCalendar />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
        <AdminManageTableWrapper />
      </div>
    </div>
  );
};
export default page;
