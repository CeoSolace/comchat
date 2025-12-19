'use client'

import { useEffect, useRef } from 'react'
import { useChannelMessages } from '../lib/hooks'
import { useSocket } from '../lib/socket'
import { useAuth } from './AuthProvider'

interface Props {
  channelId: string
}

export default function MessageList({ channelId }: Props) {
  const { data, isLoading, refetch } = useChannelMessages(channelId)
  const { user } = useAuth()
  const socket = useSocket()
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data])
  useEffect(() => {
    if (!socket) return
    socket.emit('joinChannel', channelId)
    socket.on('message', (msg: any) => {
      if (msg.channelId === channelId) {
        refetch()
      }
    })
    return () => {
      socket.emit('leaveChannel', channelId)
      socket.off('message')
    }
  }, [socket, channelId, refetch])
  if (isLoading) {
    return <div className="flex-1 p-4">Loading...</div>
  }
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {data && data.map((msg: any) => (
        <div key={msg._id} className="px-2">
          <span className="font-semibold mr-2">{msg.userId === user?.id ? 'You' : msg.userId}</span>
          <span>{msg.content}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

TODO: Highlight mentions and show avatars