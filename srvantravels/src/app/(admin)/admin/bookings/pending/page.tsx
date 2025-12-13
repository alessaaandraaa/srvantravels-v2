import AdminCustomLeftPanel from "@/src/app/components/ui/Admin/AdminBookings/Pending/AdminCustomLeftPanel";
import AdminCustomRightPanel from "@/src/app/components/ui/Admin/AdminBookings/Pending/AdminCustomRightPanel";

const page = async () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
      <div className="bg-primary-foreground rounded-lg col-span-1 p-4">
        <AdminCustomLeftPanel />
      </div>
      <div className="bg-primary-foreground rounded-lg col-span-2 p-4">
        <AdminCustomRightPanel />
      </div>
    </div>
  );
};

export default page;
