import { Server, Socket } from 'socket.io'
import { Message } from '../models'
import { parseMentions } from '../utils/mentionParser'
import { requireChannelPermission } from '../middleware/permissions'

export function initSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.auth.userId
    if (!userId) {
      socket.disconnect(true)
      return
    }
    socket.on('joinChannel', (channelId: string) => {
      socket.join(`channel:${channelId}`)
    })
    socket.on('leaveChannel', (channelId: string) => {
      socket.leave(`channel:${channelId}`)
    })
    socket.on('typing', (channelId: string, typing: boolean) => {
      socket.to(`channel:${channelId}`).emit('typing', { userId, typing })
    })
    socket.on('sendMessage', async (payload: { channelId: string; content: string }) => {
      const { channelId, content } = payload
      const mentions = parseMentions(content)
      const message = await Message.create({ channelId, userId, content, mentions })
      io.to(`channel:${channelId}`).emit('message', { id: message.id, channelId, userId, content, mentions, createdAt: message.createdAt })
    })
  })
}

TODO: Add authentication and permissions enforcement on socket events