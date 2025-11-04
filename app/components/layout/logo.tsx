'use client'

import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <motion.div
          className="w-10 h-10 bg-gradient-to-right from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <motion.span 
        className="text-2xl text-purple-950 font-bold bg-gradient-to-right from-indigo-600 to-purple-600 bg-clip-text "
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        StudentFreelance
      </motion.span>
    </motion.div>
  )
}