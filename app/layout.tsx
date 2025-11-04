import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../app/components/providers/AuthProvider'
import { Navbar } from '../app/components/layout/Navbar'
import Footer from '../app/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}