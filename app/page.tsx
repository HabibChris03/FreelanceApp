'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { 
  Star, 
  Zap, 
  Shield, 
  GraduationCap, 
  TrendingUp, 
  Clock,
  ArrowRight,
  PlayCircle,
  Users,
  MessageSquare,
  Award
} from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
}

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export default function Home() {
  const constraintsRef = useRef(null)

  const features = [
    {
      icon: GraduationCap,
      title: "Student Verified",
      description: "All freelancers are verified students from accredited institutions",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get your projects delivered quickly by motivated students",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your payments are protected until you're satisfied",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Quality Work",
      description: "Top-tier work from the next generation of professionals",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const stats = [
    { number: "5,000+", label: "Active Students", icon: Users },
    { number: "15,000+", label: "Projects Completed", icon: Award },
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "<24h", label: "Avg. Response Time", icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-8"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">
                Trusted by 10,000+ students and businesses
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Connect with{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Student Talent
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Find skilled students ready to help with your projects. Affordable, quality work from the next generation of professionals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/services"
                  className="group bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center"
                >
                  Explore Services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/signup?role=student"
                  className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Become a Freelancer
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm"
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                >
                  <stat.icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose StudentFreelance?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing how students connect with opportunities and businesses find talent
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-6 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-indigo-100 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students and businesses already growing together on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/signup?role=customer"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
                >
                  Hire Talent
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/signup?role=student"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors inline-block"
                >
                  Start Freelancing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <motion.div
        className="fixed bottom-8 right-8 flex flex-col gap-4 z-40"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
        >
          <Zap className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  )
}