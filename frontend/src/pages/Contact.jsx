import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createInquiry } from '../services/inquiryService'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function Contact() {
  const { settings } = useSiteSettings()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState({
    name: '', phone: '', pickup: searchParams.get('from') || '',
    drop: searchParams.get('to') || '', message: '',
    vehicle: searchParams.get('vehicle') || '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const vehicle = searchParams.get('vehicle')
    setForm((prev) => ({
      ...prev,
      pickup: from || prev.pickup,
      drop: to || prev.drop,
      vehicle: vehicle || prev.vehicle,
    }))
  }, [searchParams])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.pickup || !form.drop) {
      toast.error('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      await createInquiry(form)
      const waNumber = settings?.whatsappNumber || '919876543210'
      const waMsg = encodeURIComponent(
        `Hello Namasvi Cab Services! I want to inquire about cab booking.\nName: ${form.name}\nPhone: ${form.phone}\nPickup: ${form.pickup}\nDrop: ${form.drop}\nVehicle: ${form.vehicle || 'Not specified'}\nMessage: ${form.message}`
      )
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank')
      toast.success('Inquiry submitted! Redirecting to WhatsApp...')
      setForm({ name: '', phone: '', pickup: '', drop: '', message: '', vehicle: '' })
    } catch {
      toast.error('Failed to submit inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Helmet><title>Contact Us | Namasvi Cab Services</title></Helmet>
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">Get in touch with us for bookings and inquiries</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-primary-500 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location *</label>
                      <input type="text" name="pickup" value={form.pickup} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Drop Location *</label>
                      <input type="text" name="drop" value={form.drop} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Preference</label>
                    <input type="text" name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="e.g. Sedan, SUV, Innova" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none resize-none" />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full text-lg">
                    {submitting ? 'Submitting...' : 'Send Inquiry via WhatsApp'}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-lg text-primary-500 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Address</p>
                      <p className="text-gray-500 text-sm">{settings?.address || 'Nashik, Maharashtra, India'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhoneAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Phone</p>
                      <a href={`tel:${settings?.phone || '+919876543210'}`} className="text-gray-500 text-sm hover:text-yellow-500">{settings?.phone || '+91 98765 43210'}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <a href={`mailto:${settings?.email || 'info@namasvicab.com'}`} className="text-gray-500 text-sm hover:text-yellow-500">{settings?.email || 'info@namasvicab.com'}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaClock className="text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">Working Hours</p>
                      <p className="text-gray-500 text-sm">24/7 - Available anytime</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-lg text-primary-500 mb-4">Our Location</h3>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <FaMapMarkerAlt className="text-4xl mx-auto mb-2 text-yellow-500" />
                    <p className="text-sm">Nashik, Maharashtra</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
