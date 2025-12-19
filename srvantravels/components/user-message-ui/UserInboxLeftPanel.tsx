"use client";

import { Flower, MailWarning } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserInboxLeftPanel = () => {
  return (
    <Card
      className="
        bg-slate-50
        border
        border-slate-200
        shadow-md
        p-5
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5">
        <MailWarning className="text-[#36B9CB]" />
        <h2 className="text-lg font-bold text-slate-800">
          Current Requests
        </h2>
      </div>

      {/* LIST */}
      <ScrollArea className="h-[420px] pr-3">
        <div className="flex flex-col gap-3">
          {[...Array(8)].map((_, i) => (
            <Card
              key={i}
              className="
                bg-white
                border
                border-slate-200
                p-3
                cursor-pointer
                hover:bg-slate-100
                hover:border-[#36B9CB]
                transition-all
              "
            >
              <div className="flex items-center gap-3">
                <Flower className="h-4 w-4 text-[#36B9CB]" />

                <p className="text-sm text-slate-600 line-clamp-2">
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
