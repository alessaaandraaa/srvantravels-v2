import AdminInboxRightPanel from "../../components/ui/Admin/AdminInbox/AdminInboxRightPanel";
import AdminInboxLeftPanel from "../../components/ui/Admin/AdminInbox/AdminInboxLeftPanel";
import AdminInboxHeader from "../../components/ui/Admin/AdminInbox/AdminInboxHeader";

const inbox = () => {
    return (
         <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-8 p-4">
            <div className="bg-primary-foreground rounded-lg col-span-4 h-[80px] flex items-center">
                <AdminInboxHeader/>
            </div>
            <div className="bg-primary-foreground rounded-lg col-span-1 p-4">
                <AdminInboxLeftPanel/>
            </div>
            <div className="bg-primary-foreground rounded-lg col-span-3 p-4">
                <AdminInboxRightPanel/>
            </div>
         </div>
    )
}

export default inbox;