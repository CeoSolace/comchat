'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useHub } from '../../../lib/hooks'

export default function HubPage() {
  const router = useRouter()
  const params = useParams() as { id: string }
  const hubId = params.id
  const { data, isLoading } = useHub(hubId)
  useEffect(() => {
    if (!isLoading && data) {
      const firstChannel = data.channels[0]
      if (firstChannel) {
        router.replace(`/hub/${hubId}/channel/${firstChannel._id}`)
      }
    }
  }, [data, isLoading, hubId, router])
  return <div>Loading hub...</div>
}

// TODO: Show hub overview and list of members