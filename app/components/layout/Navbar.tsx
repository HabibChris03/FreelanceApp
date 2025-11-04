'use client'

import { useAuth } from '../../components/providers/AuthProvider'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from './logo'
import { Briefcase, MessageSquare, Bell, User } from 'lucide-react'

export function Navbar() {
  const { user, signOut } = useAuth()

  const navItems = [
    { name: 'Find Services', href: '/services', icon: Briefcase },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
  ]

  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
            
            {/* Navigation Items */}
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <item.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </motion.button>
                
                <motion.div
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2"
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                >
                  <div className="w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <motion.button
                    onClick={() => signOut()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition-colors text-sm"
                  >
                    Sign Out
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/signup"
                    className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}