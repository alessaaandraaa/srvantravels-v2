import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UserInboxHeader = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">Send A Request</CardTitle>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1 text-sm font-medium"
          >
            <TrendingUp className="w-4 h-4 text-green-500" />
            27
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export default UserInboxHeader;
