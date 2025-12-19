'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">Welcome to the Community Chat</h1>
        <p className="text-gray-600">Login with your Discord account to get started.</p>
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/discord`}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Login with Discord
        </Link>
      </div>
    </div>
  )
}

TODO: Show Discord branding and CTA animations