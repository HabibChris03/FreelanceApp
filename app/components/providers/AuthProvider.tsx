
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { signIn, signOut as nextAuthSignOut } from 'next-auth/react'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const publicPages = ['/', '/auth/signin', '/auth/signup']

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const session = await response.json()
        
        if (session?.user) {
          setUser(session.user)
        } else if (!publicPages.includes(pathname)) {
          router.push('/auth/signin')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      throw new Error('Invalid credentials')
    }

    // Refresh the page to update auth state
    router.refresh()
  }

  const handleSignOut = async () => {
    await nextAuthSignOut({ redirect: false })
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn: handleSignIn,
      signOut: handleSignOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
