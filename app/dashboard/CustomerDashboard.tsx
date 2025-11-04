"use client";

import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MessageSquare,
  DollarSign,
  Calendar,
  TrendingUp,
  Eye,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";

interface CustomerDashboardProps {
  user: any;
}

export default function CustomerDashboard({ user }: CustomerDashboardProps) {
  const userData = user || {};
  const orders = userData.orders || [];
  const stats = [
    {
      label: "Active Projects",
      value:
        user.orders?.filter((order: any) =>
          ["PENDING", "ACCEPTED", "IN_PROGRESS"].includes(order.status)
        ).length || 0,
      icon: FileText,
      color: "blue",
    },
    {
      label: "Completed Projects",
      value:
        user.orders?.filter((order: any) => order.status === "COMPLETED")
          .length || 0,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Total Spent",
      value: `$${
        user.orders?.reduce(
          (total: number, order: any) => total + order.budget,
          0
        ) || 0
      }`,
      icon: DollarSign,
      color: "purple",
    },
    {
      label: "Messages",
      value: "12",
      icon: MessageSquare,
      color: "orange",
    },
  ];

  const recentOrders = user.orders?.slice(0, 5) || [];

  const getStatusColor = (status: string) => {
    const colors: any = {
      PENDING: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-indigo-100 text-indigo-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const icons: any = {
      PENDING: Clock,
      ACCEPTED: Eye,
      IN_PROGRESS: TrendingUp,
      COMPLETED: CheckCircle,
      CANCELLED: AlertCircle,
    };
    return icons[status] || Clock;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your projects today.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/services"
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Find Services
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Orders
                </h2>
                <Link
                  href="/dashboard/orders"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order: any, index: number) => {
                    const StatusIcon = getStatusIcon(order.status);
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {order.service.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              by {order.service.freelancer.user.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {order.status.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            ${order.budget}
                          </p>
                          <p className="text-xs text-gray-500">
                            Due {new Date(order.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start by exploring our services
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Services
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions & Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {[
                {
                  icon: Plus,
                  label: "Post New Project",
                  href: "/projects/new",
                  color: "indigo",
                },
                {
                  icon: Users,
                  label: "Find Freelancers",
                  href: "/freelancers",
                  color: "blue",
                },
                {
                  icon: MessageSquare,
                  label: "Messages",
                  href: "/messages",
                  color: "green",
                },
                {
                  icon: FileText,
                  label: "My Projects",
                  href: "/dashboard/projects",
                  color: "purple",
                },
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={action.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className={`p-2 rounded-lg bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}
                    >
                      <action.icon
                        className={`w-5 h-5 text-${action.color}-600`}
                      />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                      {action.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommended Freelancers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Freelancers
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Sarah Chen",
                  role: "Web Developer",
                  rating: 4.9,
                  completed: 47,
                  university: "Stanford",
                },
                {
                  name: "Mike Rodriguez",
                  role: "UI/UX Designer",
                  rating: 4.8,
                  completed: 32,
                  university: "Berkeley",
                },
              ].map((freelancer, index) => (
                <motion.div
                  key={freelancer.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:border-indigo-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {freelancer.name}
                    </h4>
                    <p className="text-sm text-gray-500">{freelancer.role}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      <span>{freelancer.rating}</span>
                      <span className="mx-2">•</span>
                      <span>{freelancer.completed} jobs</span>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
