import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSupport from "./UserInboxSupport";
import UserCancel from "./UserInboxCancel";
import UserRebook from "./UserInboxRebook";
import { Session } from "next-auth";

interface PanelProps {
  session: Session | null;
}

const UserInboxRightPanel = ({ session }: PanelProps) => {
  const id = session?.user?.id ? Number(session.user.id) : null;

  return (
    <Tabs defaultValue="support" className="w-full">
      {/* Tabs Header */}
      <TabsList className="flex w-full border-b border-slate-200 bg-transparent rounded-none p-0 mb-6">
        <TabsTrigger
          value="support"
          className="
            flex-1
            h-11
            text-sm font-semibold
            text-slate-600
            border-b-2 border-transparent
            data-[state=active]:border-[#36B9CB]
            data-[state=active]:text-[#36B9CB]
          "
        >
          General
        </TabsTrigger>

        <TabsTrigger
          value="cancel"
          className="
            flex-1
            h-11
            text-sm font-semibold
            text-slate-600
            border-b-2 border-transparent
            data-[state=active]:border-[#F87171]
            data-[state=active]:text-[#F87171]
          "
        >
          Cancel
        </TabsTrigger>

        <TabsTrigger
          value="rebook"
          className="
            flex-1
            h-11
            text-sm font-semibold
            text-slate-600
            border-b-2 border-transparent
            data-[state=active]:border-[#F3B54D]
            data-[state=active]:text-[#F3B54D]
          "
        >
          Rebook
        </TabsTrigger>
      </TabsList>

      {/* Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <TabsContent value="support">
          <UserSupport user_id={id} />
        </TabsContent>

        <TabsContent value="cancel">
          <UserCancel user_id={id} />
        </TabsContent>

        <TabsContent value="rebook">
          <UserRebook user_id={id} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default UserInboxRightPanel;
