'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, MapPin, Zap } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    price: number
    category: string
    tags: string[]
    deliveryTime: number
    freelancer: {
      user: {
        name: string
        avatar?: string
      }
      rating: number
      completedJobs: number
      university?: string
    }
  }
  viewMode: 'grid' | 'list'
}

export function ServiceCard({ service, viewMode }: ServiceCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Service Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {service.description}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-indigo-600">${service.price}</div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {service.deliveryTime} day{service.deliveryTime !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Freelancer Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {service.freelancer.user.avatar || service.freelancer.user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {service.freelancer.user.name}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{service.freelancer.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{service.freelancer.completedJobs} jobs</span>
                    {service.freelancer.university && (
                      <>
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{service.freelancer.university}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/services/${service.id}`}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2"
              >
                <span>View Details</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
            {service.category}
          </span>
          {service.deliveryTime <= 3 && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Zap className="w-4 h-4 mr-1" />
              Fast Delivery
            </div>
          )}
        </div>

        {/* Service Title & Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 flex-1 mr-4">
            {service.title}
          </h3>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-indigo-600">${service.price}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {service.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{service.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Delivery Time */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          Delivery in {service.deliveryTime} day{service.deliveryTime !== 1 ? 's' : ''}
        </div>

        {/* Freelancer Info & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {service.freelancer.user.avatar || service.freelancer.user.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {service.freelancer.user.name}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span>{service.freelancer.rating}</span>
                <span className="mx-1">•</span>
                <span>{service.freelancer.completedJobs} jobs</span>
              </div>
            </div>
          </div>

          <Link
            href={`/services/${service.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center space-x-2 group-hover:scale-105 transform transition-transform"
          >
            <span>View</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}