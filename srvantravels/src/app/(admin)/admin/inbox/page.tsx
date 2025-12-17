"use client"

import { useEffect, useState } from "react"
import AdminInboxLeftPanel from "../../../components/ui/Admin/AdminInbox/AdminInboxLeftPanel"
import AdminInboxRightPanel from "../../../components/ui/Admin/AdminInbox/AdminInboxRightPanel"
import AdminInboxHeader from "../../../components/ui/Admin/AdminInbox/AdminInboxHeader"

export interface InboxMessageSummary {
  message_ID: number
  subject: string | null
  type: string
  sent_at: string
  sender: {
    name: string | null
  }
}

const InboxPage = () => {
  const [messages, setMessages] = useState<InboxMessageSummary[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/inbox")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMessages(data)
        if (data.length > 0) {
          setSelectedId(data[0].message_ID) // auto-select first
        }
      })
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-8">
      <div className="bg-primary-foreground rounded-lg col-span-4 h-[80px] flex items-center">
        <AdminInboxHeader />
      </div>

      <div className="bg-primary-foreground rounded-lg col-span-1 p-4">
        <AdminInboxLeftPanel
          messages={messages}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      <div className="bg-primary-foreground rounded-lg col-span-3 p-4">
        <AdminInboxRightPanel messageId={selectedId} />
      </div>
    </div>
  )
}

export default InboxPage
