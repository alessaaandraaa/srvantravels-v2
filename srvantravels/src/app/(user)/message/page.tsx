import UserInboxHeader from "@/components/user-message-ui/UserInboxHeader";
import UserInboxLeftPanel from "@/components/user-message-ui/UserInboxLeftPanel";
import UserPanelServer from "@/components/user-message-ui/UserInboxPanelServer";
const inbox = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-8 p-4">
      <div className="bg-primary-foreground rounded-lg col-span-4 h-20 flex items-center">
        <UserInboxHeader />
      </div>
      <div className="bg-primary-foreground rounded-lg col-span-3 p-4">
        <UserPanelServer />
      </div>
    </div>
  );
};

export default inbox;
