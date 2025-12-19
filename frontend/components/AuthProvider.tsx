'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: string
  username: string
  avatar?: string
  discriminator?: string
  isOwner: boolean
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true, refresh: async () => {}, logout: async () => {} })

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const refresh = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
      setUser(res.data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    refresh()
  }, [])
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { withCredentials: true })
    setUser(null)
  }
  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

TODO: Handle token refresh and session expiry