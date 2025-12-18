"use client";

import { Flower, MailWarning } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserInboxLeftPanel = () => {
  return (
    <div className="">
      <div className="flex gap-4 pl-1">
        <MailWarning />
        <p>Current Requests</p>
      </div>
      {/* PENDING LISTS */}
      <ScrollArea className="h-115 mt-4 overflow-y-auto pr-4">
        {/* LIST ITEMS */}
        <div className="flex flex-col gap-4">
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Erika Lave
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                2. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Cliff Jao
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Columbina Canon
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                4. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Hello Lyre
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                5. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Keepy Tepo
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                6. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Keepy Tepo
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                7. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Keepy Tepo
              </label>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4 pl-4">
              <Flower className="h-4" />
              <label className="text-sm text-muted-foreground">
                8. Lorem ipsum dolor, sit amet consectetur adipisicing elit. |
                Keepy Tepo
              </label>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserInboxLeftPanel;
