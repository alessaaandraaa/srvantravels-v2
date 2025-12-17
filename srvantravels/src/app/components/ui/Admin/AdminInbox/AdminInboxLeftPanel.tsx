"use client"

import { Flower, MailWarning } from "lucide-react"
import { Card } from "../card"
import { ScrollArea } from "../scroll-area"
import { InboxMessageSummary } from "../../../../(admin)/admin/inbox/page"

interface Props {
  messages: InboxMessageSummary[]
  selectedId: number | null
  onSelect: (id: number) => void
}

const AdminInboxLeftPanel = ({ messages, selectedId, onSelect }: Props) => {
  return (
    <div>
      <div className="flex gap-4 pl-1">
        <MailWarning />
        <p>Pending Mails</p>
      </div>

      <ScrollArea className="h-[460px] mt-4 pr-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <Card
              key={msg.message_ID}
              onClick={() => onSelect(msg.message_ID)}
              className={`cursor-pointer ${
                selectedId === msg.message_ID
                  ? "border-primary"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-4 pl-4">
                <Flower className="h-4" />
                <label className="text-sm text-muted-foreground">
                  {index + 1}. {msg.subject ?? "No Subject"} |{" "}
                  {msg.sender.name}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default AdminInboxLeftPanel
