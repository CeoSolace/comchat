'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'

export default function LoginCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/callback`, { params: { code }, withCredentials: true })
        .then(() => {
          router.replace('/hubs')
        })
        .catch(() => {
          router.replace('/login')
        })
    }
  }, [searchParams, router])
  return <div className="p-4">Authenticating...</div>
}

// TODO: Handle error states and display messages