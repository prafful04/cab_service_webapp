import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCar, FaCalendarCheck, FaRupeeSign, FaClock, FaUsers, FaTachometerAlt } from 'react-icons/fa'
import AdminWidget from '../../components/AdminWidget'
import Loading from '../../components/Loading'
import API from '../../services/api'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        API.get('/dashboard/stats'),
        API.get('/bookings')
      ])
      setStats(statsRes.data.data)
      setBookings(bookingsRes.data.data?.slice(0, 5) || [])
    } catch (err) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  const widgets = [
    { icon: FaCalendarCheck, label: 'Total Bookings', value: stats?.totalBookings || 0, color: 'bg-blue-500' },
    { icon: FaCar, label: 'Active Vehicles', value: stats?.activeVehicles || 0, color: 'bg-green-500' },
    { icon: FaRupeeSign, label: 'Revenue', value: `₹${stats?.revenue?.toLocaleString() || 0}`, color: 'bg-yellow-500' },
    { icon: FaClock, label: 'Pending Bookings', value: stats?.pendingBookings || 0, color: 'bg-orange-500' },
    { icon: FaUsers, label: 'Available Drivers', value: stats?.availableDrivers || 0, color: 'bg-purple-500' },
    { icon: FaTachometerAlt, label: 'Total Vehicles', value: stats?.totalVehicles || 0, color: 'bg-indigo-500' },
  ]

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-primary-500 mb-6"
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {widgets.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <AdminWidget {...w} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-primary-500 mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-3 px-2 font-medium text-gray-500">Customer</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Pickup</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Drop</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                <th className="text-right py-3 px-2 font-medium text-gray-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="font-medium">{b.customerName}</div>
                    <div className="text-xs text-gray-400">{b.customerPhone}</div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">{b.pickupLocation}</td>
                  <td className="py-3 px-2 text-gray-600">{b.dropLocation}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right font-medium">₹{b.totalPrice?.toLocaleString() || 0}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No bookings yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
