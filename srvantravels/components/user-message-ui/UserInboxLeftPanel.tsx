"use client";

import { Flower, MailWarning } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserInboxLeftPanel = () => {
  return (
    <Card className="p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <MailWarning className="text-[#36B9CB]" />
        <h2 className="text-lg font-bold">Current Requests</h2>
      </div>

      <ScrollArea className="h-[420px] pr-3">
        <div className="flex flex-col gap-3">
          {[...Array(8)].map((_, i) => (
            <Card
              key={i}
              className="
                p-3
                cursor-pointer
                hover:bg-gray-50
                transition
              "
            >
              <div className="flex items-center gap-3">
                <Flower className="h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {i + 1}. Sample request preview | User Name
                </p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default UserInboxLeftPanel;
