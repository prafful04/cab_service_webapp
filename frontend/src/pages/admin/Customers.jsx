import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import * as inquiryService from '../../services/inquiryService'

export default function Customers() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchInquiries() }, [])

  const fetchInquiries = async () => {
    try {
      const res = await inquiryService.getAll()
      setInquiries(res.data.data)
    } catch { toast.error('Failed to load inquiries') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return
    try { await inquiryService.remove(id); toast.success('Inquiry deleted'); fetchInquiries() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loading />

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-500 mb-6">Customer Inquiries</h1>

      <div className="space-y-4">
        {inquiries.map((inq, i) => (
          <motion.div
            key={inq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-lg text-primary-500">{inq.name}</h3>
                  <span className="text-sm text-gray-400">{inq.phone}</span>
                  <span className="text-xs text-gray-300">{inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ''}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Pickup: </span>
                    <span className="font-medium">{inq.pickupLocation || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Drop: </span>
                    <span className="font-medium">{inq.dropLocation || 'N/A'}</span>
                  </div>
                </div>
                {inq.message && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm">{inq.message}</p>
                  </div>
                )}
              </div>
              <button onClick={() => handleDelete(inq.id)}
                className="text-red-400 hover:text-red-600 transition ml-4">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No inquiries yet</p>
            <p className="text-sm mt-2">Customer inquiries will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
