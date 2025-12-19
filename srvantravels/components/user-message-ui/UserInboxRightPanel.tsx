import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSupport from "./UserInboxSupport";
import UserCancel from "./UserInboxCancel";
import UserRebook from "./UserInboxRebook";
import { Session } from "next-auth";
import { Card } from "@/components/ui/card";

interface PanelProps {
  session: Session | null;
}

const UserInboxRightPanel = ({ session }: PanelProps) => {
  const id = session?.user?.id ? Number(session.user.id) : null;

  return (
    <Card className="p-4 shadow-lg">
      <Tabs defaultValue="support" className="flex flex-col gap-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="support">General</TabsTrigger>
          <TabsTrigger value="cancel">Cancel</TabsTrigger>
          <TabsTrigger value="rebook">Rebook</TabsTrigger>
        </TabsList>

        <TabsContent value="support">
          <UserSupport user_id={id} />
        </TabsContent>

        <TabsContent value="cancel">
          <UserCancel user_id={id} />
        </TabsContent>

        <TabsContent value="rebook">
          <UserRebook user_id={id} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default UserInboxRightPanel;
