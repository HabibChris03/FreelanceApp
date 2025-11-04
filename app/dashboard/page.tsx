'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CustomerDashboard from '../dashboard/CustomerDashboard'
import FreelancerDashboard from '../dashboard/FreelancerDashboard'

// Mock data for development
const mockUserData = {
  customer: {
    id: '1',
    name: 'John Customer',
    email: 'customer@example.com',
    role: 'CUSTOMER',
    orders: [
      {
        id: '1',
        service: {
          title: 'Website Development',
          freelancer: {
            user: {
              name: 'Sarah Developer'
            }
          }
        },
        status: 'IN_PROGRESS',
        budget: 299,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        requirements: 'Need a company website'
      },
      {
        id: '2',
        service: {
          title: 'Logo Design',
          freelancer: {
            user: {
              name: 'Mike Designer'
            }
          }
        },
        status: 'COMPLETED',
        budget: 150,
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        requirements: 'Modern logo for tech startup'
      }
    ]
  },
  freelancer: {
    id: '2',
    name: 'Sarah Freelancer',
    email: 'freelancer@example.com',
    role: 'STUDENT',
    freelancer: {
      completedJobs: 15,
      rating: 4.9,
      services: [
        {
          id: '1',
          title: 'Website Development',
          description: 'I will create a responsive, modern website using React, Next.js, and Tailwind CSS.',
          price: 299,
          category: 'Web Development',
          tags: ['React', 'Next.js', 'Tailwind'],
          deliveryTime: 7,
          isActive: true,
          orders: []
        },
        {
          id: '2',
          title: 'Mobile App Design',
          description: 'Professional UI/UX design for your mobile application.',
          price: 199,
          category: 'Design',
          tags: ['UI/UX', 'Figma', 'Mobile'],
          deliveryTime: 5,
          isActive: true,
          orders: []
        }
      ],
      reviews: []
    },
    orders: [
      {
        id: '3',
        service: {
          title: 'Website Development'
        },
        customer: {
          name: 'Business Client'
        },
        status: 'IN_PROGRESS',
        budget: 299,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        requirements: 'E-commerce website'
      }
    ]
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'customer' | 'freelancer'>('customer')
  const router = useRouter()

  useEffect(() => {
    // For development, we'll use mock data
    // In production, you would fetch from your API
    
    const timer = setTimeout(() => {
      // You can change this to 'freelancer' to test the other dashboard
      const role: 'customer' | 'freelancer' = 'freelancer'
      setUserRole(role)
      setUser(mockUserData[role])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'customer' ? (
        <CustomerDashboard user={user} />
      ) : (
        <FreelancerDashboard user={user} />
      )}
    </div>
  )
}