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
    <div className="w-full">
      <Tabs defaultValue="support" className="w-full">
        {/* Tab List */}
        <TabsList className="grid grid-cols-3 w-full bg-white border-b-2 border-gray-200 rounded-none p-0 mb-6">
          <TabsTrigger
            value="support"
            className="
              h-12
              px-4
              py-3
              rounded-none
              text-sm md:text-base
              font-bold
              text-gray-700
              border-b-4 border-transparent
              data-[state=active]:border-[#36B9CB]
              data-[state=active]:bg-transparent
              data-[state=active]:text-[#36B9CB]
              data-[state=inactive]:hover:bg-gray-50
              transition-all duration-200
            "
          >
            General
          </TabsTrigger>

          <TabsTrigger
            value="cancel"
            className="
              h-12
              px-4
              py-3
              rounded-none
              text-sm md:text-base
              font-bold
              text-gray-700
              border-b-4 border-transparent
              data-[state=active]:border-[#F87171]
              data-[state=active]:bg-transparent
              data-[state=active]:text-[#F87171]
              data-[state=inactive]:hover:bg-gray-50
              transition-all duration-200
            "
          >
            Cancel
          </TabsTrigger>

          <TabsTrigger
            value="rebook"
            className="
              h-12
              px-4
              py-3
              rounded-none
              text-sm md:text-base
              font-bold
              text-gray-700
              border-b-4 border-transparent
              data-[state=active]:border-[#F3B54D]
              data-[state=active]:bg-transparent
              data-[state=active]:text-[#F3B54D]
              data-[state=inactive]:hover:bg-gray-50
              transition-all duration-200
            "
          >
            Rebook
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <TabsContent value="support" className="mt-0">
            <UserSupport user_id={id} />
          </TabsContent>

          <TabsContent value="cancel" className="mt-0">
            <UserCancel user_id={id} />
          </TabsContent>

          <TabsContent value="rebook" className="mt-0">
            <UserRebook user_id={id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserInboxRightPanel;
