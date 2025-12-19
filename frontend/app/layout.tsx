import React from 'react'
import '../globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '../components/AuthProvider'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

TODO: Add theme provider and notification system