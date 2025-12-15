import UserInboxHeader from "@/components/user-message-ui/UserInboxHeader";
import UserInboxLeftPanel from "@/components/user-message-ui/UserInboxLeftPanel";
import UserInboxRightPanel from "@/components/user-message-ui/UserInboxRightPanel";

const inbox = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-8 p-4">
      <div className="bg-primary-foreground rounded-lg col-span-4 h-[80px] flex items-center">
        <UserInboxHeader />
      </div>
      <div className="bg-primary-foreground rounded-lg col-span-1 p-4">
        <UserInboxLeftPanel />
      </div>
      <div className="bg-primary-foreground rounded-lg col-span-3 p-4">
        <UserInboxRightPanel />
      </div>
    </div>
  );
};

export default inbox;
