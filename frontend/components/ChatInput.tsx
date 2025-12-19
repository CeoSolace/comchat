'use client'

import { useState, useEffect } from 'react'
import { useSendMessage } from '../lib/hooks'
import { useSocket } from '../lib/socket'

export default function ChatInput({ channelId }: { channelId: string }) {
  const [content, setContent] = useState('')
  const sendMessage = useSendMessage(channelId)
  const socket = useSocket()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    await sendMessage.mutateAsync(content)
    socket?.emit('sendMessage', { channelId, content })
    setContent('')
  }
  useEffect(() => {
    if (!socket) return
    if (content.length > 0) {
      socket.emit('typing', channelId, true)
    } else {
      socket.emit('typing', channelId, false)
    }
  }, [socket, channelId, content])
  return (
    <form onSubmit={handleSubmit} className="p-2 border-t">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Send a message..."
        className="w-full px-3 py-2 border rounded"
      />
    </form>
  )
}

// TODO: Support attachments, emoji picker and mentions autocomplete