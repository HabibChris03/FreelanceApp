'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  ChevronDown,
  Grid,
  List,
  Zap,
  Shield,
  Award,
  Users,
  X
} from 'lucide-react'
import { ServiceCard } from '../services/ServiceCard'

// Mock data - replace with actual API calls
const mockServices = [
  {
    id: '1',
    title: 'Website Development',
    description: 'I will create a responsive, modern website using React, Next.js, and Tailwind CSS. Perfect for startups and small businesses looking to establish their online presence.',
    price: 299,
    category: 'Web Development',
    tags: ['React', 'Next.js', 'Tailwind', 'Responsive'],
    deliveryTime: 7,
    freelancer: {
      user: {
        name: 'Alex Johnson',
        avatar: 'AJ'
      },
      rating: 4.9,
      completedJobs: 47,
      university: 'MIT'
    }
  },
  {
    id: '2',
    title: 'Mobile App Design',
    description: 'Professional UI/UX design for your mobile application. I specialize in creating intuitive and beautiful interfaces that users love.',
    price: 199,
    category: 'Design',
    tags: ['UI/UX', 'Figma', 'Mobile', 'Prototype'],
    deliveryTime: 5,
    freelancer: {
      user: {
        name: 'Sarah Chen',
        avatar: 'SC'
      },
      rating: 4.8,
      completedJobs: 32,
      university: 'Stanford'
    }
  },
  {
    id: '3',
    title: 'Content Writing',
    description: 'Engaging and SEO-optimized content for your blog, website, or marketing materials. I specialize in tech, business, and lifestyle topics.',
    price: 89,
    category: 'Writing',
    tags: ['SEO', 'Blog', 'Marketing', 'Tech'],
    deliveryTime: 3,
    freelancer: {
      user: {
        name: 'Mike Rodriguez',
        avatar: 'MR'
      },
      rating: 4.7,
      completedJobs: 28,
      university: 'Berkeley'
    }
  },
  {
    id: '4',
    title: 'Data Analysis',
    description: 'Comprehensive data analysis and visualization using Python, R, and Tableau. Get insights from your data to drive business decisions.',
    price: 349,
    category: 'Data Science',
    tags: ['Python', 'R', 'Tableau', 'Statistics'],
    deliveryTime: 10,
    freelancer: {
      user: {
        name: 'Emily Watson',
        avatar: 'EW'
      },
      rating: 5.0,
      completedJobs: 63,
      university: 'Harvard'
    }
  },
  {
    id: '5',
    title: 'Social Media Management',
    description: 'Complete social media management including content creation, scheduling, and analytics for Instagram, Twitter, and LinkedIn.',
    price: 159,
    category: 'Marketing',
    tags: ['Instagram', 'Twitter', 'Analytics', 'Content'],
    deliveryTime: 14,
    freelancer: {
      user: {
        name: 'David Kim',
        avatar: 'DK'
      },
      rating: 4.6,
      completedJobs: 41,
      university: 'NYU'
    }
  },
  {
    id: '6',
    title: 'Tutoring - Computer Science',
    description: 'One-on-one tutoring in computer science topics including algorithms, data structures, and web development. Perfect for students.',
    price: 45,
    category: 'Tutoring',
    tags: ['Programming', 'Algorithms', 'Web Dev', 'CS'],
    deliveryTime: 1,
    freelancer: {
      user: {
        name: 'Jessica Lee',
        avatar: 'JL'
      },
      rating: 4.9,
      completedJobs: 89,
      university: 'CMU'
    }
  }
]

const categories = [
  'All Categories',
  'Web Development',
  'Design',
  'Writing',
  'Data Science',
  'Marketing',
  'Tutoring',
  'Research',
  'Video Editing'
]

const deliveryTimes = [
  'Any',
  '24 Hours',
  '3 Days',
  '1 Week',
  '2 Weeks',
  '1 Month'
]

const budgetRanges = [
  'Any',
  '$50 - $100',
  '$100 - $250',
  '$250 - $500',
  '$500 - $1000',
  '$1000+'
]

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDelivery, setSelectedDelivery] = useState('Any')
  const [selectedBudget, setSelectedBudget] = useState('Any')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  // Filter services based on selections
  useEffect(() => {
    setLoading(true)
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let filtered = [...mockServices]

      // Search filter
      if (searchQuery) {
        filtered = filtered.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }

      // Category filter
      if (selectedCategory !== 'All Categories') {
        filtered = filtered.filter(service => service.category === selectedCategory)
      }

      // Delivery time filter
      if (selectedDelivery !== 'Any') {
        const daysMap: { [key: string]: number } = {
          '24 Hours': 1,
          '3 Days': 3,
          '1 Week': 7,
          '2 Weeks': 14,
          '1 Month': 30
        }
        if (selectedDelivery in daysMap) {
          filtered = filtered.filter(service => service.deliveryTime <= daysMap[selectedDelivery])
        }
      }

      // Budget filter
      if (selectedBudget !== 'Any') {
        const [min, max] = selectedBudget === '$1000+' 
          ? [1000, Infinity]
          : selectedBudget.split(' - ').map(val => parseInt(val.replace('$', '')))
        
        filtered = filtered.filter(service => {
          if (selectedBudget === '$1000+') {
            return service.price >= min
          }
          return service.price >= min && service.price <= max
        })
      }

      // Sort
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.freelancer.rating - a.freelancer.rating)
          break
        case 'delivery':
          filtered.sort((a, b) => a.deliveryTime - b.deliveryTime)
          break
        default: // popular
          filtered.sort((a, b) => b.freelancer.completedJobs - a.freelancer.completedJobs)
      }

      setServices(filtered)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedDelivery, selectedBudget, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedDelivery('Any')
    setSelectedBudget('Any')
    setSortBy('popular')
  }

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== 'All Categories',
    selectedDelivery !== 'Any',
    selectedBudget !== 'Any'
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Perfect <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Student Talent</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover skilled students ready to bring your ideas to life. Affordable, quality work from the next generation of professionals.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services, skills, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* Filters Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Delivery Time</h3>
                <div className="space-y-2">
                  {deliveryTimes.map((time) => (
                    <label key={time} className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        checked={selectedDelivery === time}
                        onChange={() => setSelectedDelivery(time)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Budget Range</h3>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="radio"
                        name="budget"
                        checked={selectedBudget === range}
                        onChange={() => setSelectedBudget(range)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Why Choose StudentFreelance?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Verified Students</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-600">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {services.length} Services Available
                </h2>
                {activeFiltersCount > 0 && (
                  <p className="text-gray-600 text-sm mt-1">
                    {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="delivery">Fastest Delivery</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-sm text-gray-900' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-sm text-gray-900' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Services Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                  <motion.div
                    key={skeleton}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: skeleton * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </motion.div>
                ))}
              </div>
            ) : services.length > 0 ? (
              <motion.div
                layout
                className={`
                  ${viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-6'
                  }
                `}
              >
                <AnimatePresence>
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      layout
                    >
                      <ServiceCard 
                        service={service} 
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search criteria or browse different categories to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}