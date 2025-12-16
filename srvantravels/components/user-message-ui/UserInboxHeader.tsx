import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserInboxHeader = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">Send A Request</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default UserInboxHeader;
