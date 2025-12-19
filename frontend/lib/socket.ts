import { io, Socket } from 'socket.io-client'
import { useEffect, useRef } from 'react'
import { useAuth } from '../components/AuthProvider'

export function useSocket() {
  const { user } = useAuth()
  const socketRef = useRef<Socket | null>(null)
  useEffect(() => {
    if (user && !socketRef.current) {
      const s = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, { auth: { userId: user.id } })
      socketRef.current = s
    }
    return () => {
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [user])
  return socketRef.current
}

TODO: Expose socket events as React hooks