'use client'

import { useParams } from 'next/navigation'
export default function DMThreadPage() {
  const params = useParams() as { threadId: string }
  const { threadId } = params
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Direct Message</h1>
      <p>Thread ID: {threadId}</p>
      <p>Encrypted messaging is handled client‑side. Messages are stored as ciphertext on the server.</p>
    </div>
  )
}

TODO: Implement DM UI with encryption helpers