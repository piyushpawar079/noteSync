import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Header from '@/components/header'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NoteSync',
  description: 'AI powered notion clone.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />

          <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1 p-5 bg-gray-50 scrollbar-hide overflow-y-auto'>
              {children}
            </div>
          </div>
          <Toaster position='bottom-right' />
        </body>
      </html>
    </ClerkProvider>
  )
}