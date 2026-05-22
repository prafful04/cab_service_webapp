import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import * as bookingService from '../../services/bookingService'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => { fetchBookings() }, [])

  const fetchBookings = async () => {
    try {
      const res = await bookingService.getAll()
      setBookings(res.data.data)
    } catch { toast.error('Failed to load bookings') }
    finally { setLoading(false) }
  }

  const updateStatus = async (id, status) => {
    try {
      await bookingService.updateStatus(id, status)
      toast.success(`Booking ${status.toLowerCase()}`)
      fetchBookings()
    } catch { toast.error('Status update failed') }
  }

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

  const filtered = filter === 'ALL' ? bookings : bookings.filter(b => b.status === filter)
  const statuses = ['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']

  if (loading) return <Loading />

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-500 mb-6">Bookings</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === s ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Pickup</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Drop</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Vehicle</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Amount</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{b.customerName}</div>
                    <div className="text-xs text-gray-400">{b.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{b.pickupLocation}</td>
                  <td className="py-3 px-4 text-gray-600">{b.dropLocation}</td>
                  <td className="py-3 px-4 text-gray-600">{b.travelDate || b.bookingDate}</td>
                  <td className="py-3 px-4 text-gray-600">{b.vehicleName || '-'}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium">₹{b.totalPrice?.toLocaleString() || 0}</td>
                  <td className="py-3 px-4 text-right">
                    {b.status === 'PENDING' && (
                      <div className="space-x-1">
                        <button onClick={() => updateStatus(b.id, 'CONFIRMED')}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200">Confirm</button>
                        <button onClick={() => updateStatus(b.id, 'CANCELLED')}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">Cancel</button>
                      </div>
                    )}
                    {b.status === 'CONFIRMED' && (
                      <button onClick={() => updateStatus(b.id, 'IN_PROGRESS')}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200">Start Trip</button>
                    )}
                    {b.status === 'IN_PROGRESS' && (
                      <button onClick={() => updateStatus(b.id, 'COMPLETED')}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">Complete</button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
