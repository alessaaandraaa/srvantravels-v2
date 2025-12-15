import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSupport from "./UserInboxSupport";
import UserCancel from "./UserInboxCancel";
import UserRebook from "./UserInboxRebook";
const UserInboxRightPanel = () => {
  return (
    <Tabs defaultValue="support" className="flex flex-col">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="support">General Support</TabsTrigger>
        <TabsTrigger value="cancel">Cancel Booking</TabsTrigger>
        <TabsTrigger value="rebook">Rebook</TabsTrigger>
      </TabsList>
      <TabsContent value="support">
        <UserSupport />
      </TabsContent>
      <TabsContent value="cancel">
        <UserCancel />
      </TabsContent>
      <TabsContent value="rebook">
        <UserRebook />
      </TabsContent>
    </Tabs>
  );
};

export default UserInboxRightPanel;
