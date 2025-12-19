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
    <Card className="bg-slate-50 border border-slate-200 shadow-md p-6 w-full">
      <Tabs defaultValue="support" className="flex flex-col gap-4 w-full">
        <TabsList className="grid grid-cols-3 w-full bg-white border border-slate-200 rounded-2xl p-1">
          <TabsTrigger
            value="support"
            className="
              h-9
              px-3
              rounded-lg
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              relative
              z-10
              text-slate-700
              data-[state=active]:bg-[#36B9CB]
              data-[state=active]:text-white
              data-[state=active]:shadow-sm
              transition-all
            "
          >
            General
          </TabsTrigger>

          <TabsTrigger
            value="cancel"
            className="
              h-9
              px-3
              rounded-lg
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              relative
              z-10
              text-slate-700
              data-[state=active]:bg-[#F87171]
              data-[state=active]:text-white
              data-[state=active]:shadow-sm
              transition-all
            "
          >
            Cancel
          </TabsTrigger>

          <TabsTrigger
            value="rebook"
            className="
              h-9
              px-3
              rounded-lg
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              relative
              z-10
              text-slate-700
              data-[state=active]:bg-[#F3B54D]
              data-[state=active]:text-white
              data-[state=active]:shadow-sm
              transition-all
            "
          >
            Rebook
          </TabsTrigger>
        </TabsList>

        <TabsContent value="support" className="mt-2 w-full">
          <UserSupport user_id={id} />
        </TabsContent>

        <TabsContent value="cancel" className="mt-2 w-full">
          <UserCancel user_id={id} />
        </TabsContent>

        <TabsContent value="rebook" className="mt-2 w-full">
          <UserRebook user_id={id} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default UserInboxRightPanel;
