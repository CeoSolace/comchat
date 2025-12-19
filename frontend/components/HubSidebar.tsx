'use client'

import Link from 'next/link'
import { useHub } from '../lib/hooks'

export default function HubSidebar({ hubId }: { hubId: string }) {
  const { data, isLoading } = useHub(hubId)
  if (isLoading || !data) {
    return <div className="w-64 bg-gray-200 p-4">Loading...</div>
  }
  const { categories, channels } = data
  return (
    <div className="w-64 bg-gray-100 border-r p-2 space-y-4 overflow-y-auto">
      {categories.map((cat: any) => (
        <div key={cat._id}>
          <h3 className="text-xs font-semibold uppercase text-gray-600 px-2 py-1">{cat.name}</h3>
          <ul>
            {channels
              .filter((ch: any) => ch.categoryId === cat._id)
              .map((ch: any) => (
                <li key={ch._id}>
                  <Link href={`/hub/${hubId}/channel/${ch._id}`} className="block px-2 py-1 rounded hover:bg-gray-200">
                    # {ch.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// TODO: Add new category and channel creation UI