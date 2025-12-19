'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useHubs, useCreateHub } from '../../lib/hooks'

export default function HubsPage() {
  const { data, isLoading } = useHubs()
  const [hubName, setHubName] = useState('')
  const createHub = useCreateHub()
  const handleCreate = async () => {
    if (!hubName.trim()) return
    await createHub.mutateAsync(hubName)
    setHubName('')
  }
  if (isLoading) {
    return <div className="p-4">Loading hubs...</div>
  }
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Your Hubs</h1>
      <ul className="space-y-2">
        {data && data.map((hub: any) => (
          <li key={hub._id}>
            <Link href={`/hub/${hub._id}`} className="text-blue-600 hover:underline">
              {hub.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={hubName}
          onChange={(e) => setHubName(e.target.value)}
          placeholder="New hub name"
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleCreate}
          className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
          disabled={createHub.isLoading}
        >
          Create Hub
        </button>
      </div>
    </div>
  )
}

// TODO: Add hub sorting and filtering