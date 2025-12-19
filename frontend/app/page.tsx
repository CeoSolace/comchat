'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    async function check() {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
        router.replace('/hubs')
      } catch {
        router.replace('/login')
      }
    }
    check()
  }, [router])
  return null
}

TODO: Show loading spinner while redirecting