"use client"

import { useEffect, useState } from "react"
import { CircleDollarSign } from "lucide-react"

interface Props {
  messageId: number | null
}

interface InboxMessage {
  subject: string | null
  content: string
  sent_at: string
  sender?: {
    name: string | null
  } | null
}

const AdminInboxRightPanel = ({ messageId }: Props) => {
  const [message, setMessage] = useState<InboxMessage | null>(null)

  useEffect(() => {
    if (!messageId) {
      setMessage(null)
      return
    }

    fetch(`/api/inbox/${messageId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch message")
        return res.json() as Promise<InboxMessage>
      })
      .then(setMessage)
      .catch(err => {
        console.error(err)
        setMessage(null)
      })
  }, [messageId])

  if (!message) {
    return <div className="p-8 text-muted-foreground">Select a message</div>
  }

  return (
    <div className="flex flex-col p-8 gap-4 border-2 rounded-lg h-full">
      <div className="flex gap-4">
        <CircleDollarSign />
        [{message.subject ?? "No Subject"}]
      </div>

      <span className="text-[12px] text-muted-foreground">
        by {message.sender?.name ?? "Unknown Sender"}
      </span>

      <div className="text-sm pt-4">
        {message.content}
      </div>

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
