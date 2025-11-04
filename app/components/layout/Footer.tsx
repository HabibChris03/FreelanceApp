'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  Heart,
  Award,
  Shield,
  Users,
  Globe
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  const quickLinks = {
    'For Students': [
      { name: 'Find Projects', href: '/projects' },
      { name: 'Create Portfolio', href: '/portfolio' },
      { name: 'Skill Development', href: '/skills' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Student Resources', href: '/resources' },
    ],
    'For Clients': [
      { name: 'Post a Project', href: '/post-project' },
      { name: 'Browse Talent', href: '/talent' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Client Success', href: '/client-success' },
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Trust & Safety', href: '/trust' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
    ]
  }

  const stats = [
    { number: '50,000+', label: 'Students', icon: Users },
    { number: '100,000+', label: 'Projects', icon: Award },
    { number: '98%', label: 'Success Rate', icon: Shield },
    { number: '150+', label: 'Countries', icon: Globe },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Stats Section */}
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Links & Newsletter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    StudentFreelance
                  </span>
                </Link>
                
                <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                  Connecting talented students with businesses worldwide. Empowering the next generation of professionals through meaningful freelance opportunities.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            {Object.entries(quickLinks).map(([category, links], categoryIndex) => (
              <div key={category}>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg font-semibold text-white mb-4"
                >
                  {category}
                </motion.h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (linkIndex * 0.05) + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-indigo-500 transition-colors"></span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Newsletter Section */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white mb-6">Get In Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <span>Catholic University Institute of Buea, Buea, Cameroon</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Phone className="w-5 h-5 text-indigo-500" />
                    <span>+237 (673) 492-314</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    <span>support@studentfreelance.com</span>
                  </div>
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-4">
                  Get the latest news and opportunities delivered to your inbox.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm flex items-center"
              >
                <span>© {currentYear} StudentFreelance. Made by Student From CUIB </span>
              </motion.div>

              {/* Additional Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6 text-sm"
              >
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookies
                </Link>
                
                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 group ml-4"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </footer>
  )
}

export default Footer;