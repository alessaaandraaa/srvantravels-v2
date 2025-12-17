"use client"

import { useEffect, useState } from "react"
import { CircleDollarSign } from "lucide-react"

interface Props {
  messageId: number | null
}

const AdminInboxRightPanel = ({ messageId }: Props) => {
  const [message, setMessage] = useState<any>(null)

  useEffect(() => {
    if (!messageId) return

    fetch(`/api/inbox/${messageId}`)
      .then(res => res.json())
      .then(setMessage)
  }, [messageId])

  if (!message) {
    return <div className="p-8 text-muted-foreground">Select a message</div>
  }

  return (
    <div className="flex flex-col p-8 gap-4 border-2 rounded-lg h-full">
      <div className="flex gap-4">
        <CircleDollarSign />
        [{message.subject}]
      </div>

      <span className="text-[12px] text-muted-foreground">
        by {message.sender.name}
      </span>

      <div className="text-sm pt-4">{message.content}</div>

      <div className="mt-auto flex justify-between">
        <span className="text-[12px] text-muted-foreground">
          Created at: {new Date(message.sent_at).toLocaleDateString()}
        </span>
        <span className="text-[12px] text-muted-foreground">
          Sent on: {new Date(message.sent_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}

export default AdminInboxRightPanel
