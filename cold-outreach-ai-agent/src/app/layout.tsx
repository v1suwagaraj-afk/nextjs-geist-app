import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cold Outreach AI Agent',
  description: 'AI-powered cold outreach automation for calls, emails, messages, and prospecting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Cold Outreach AI Agent
                  </h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#dashboard" className="text-gray-500 hover:text-gray-900">
                    Dashboard
                  </a>
                  <a href="#campaigns" className="text-gray-500 hover:text-gray-900">
                    Campaigns
                  </a>
                  <a href="#leads" className="text-gray-500 hover:text-gray-900">
                    Leads
                  </a>
                  <a href="#analytics" className="text-gray-500 hover:text-gray-900">
                    Analytics
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
