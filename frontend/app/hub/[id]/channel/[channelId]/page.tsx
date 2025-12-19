'use client'

import { useParams } from 'next/navigation'
import HubSidebar from '../../../../../components/HubSidebar'
import MessageList from '../../../../../components/MessageList'
import ChatInput from '../../../../../components/ChatInput'

export default function ChannelPage() {
  const params = useParams() as { id: string; channelId: string }
  const { id: hubId, channelId } = params
  return (
    <div className="flex h-screen overflow-hidden">
      <HubSidebar hubId={hubId} />
      <div className="flex flex-col flex-1">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Channel</h2>
        </div>
        <MessageList channelId={channelId} />
        <ChatInput channelId={channelId} />
      </div>
    </div>
  )
}

TODO: Add channel header with actions and members list