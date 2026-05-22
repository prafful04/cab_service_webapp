import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useSiteSettings } from '../context/SiteSettingsContext'
import LocationPicker from './LocationPicker'

const vehicles = ['Sedan', 'SUV', 'Innova', 'Tempo Traveller', 'Bus']

function LocationInput({ label, name, value, onChange, onMapPick }) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const timer = useRef(null)
  const wrapper = useRef(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapper.current && !wrapper.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    onChange({ target: { name, value: val } })
    if (timer.current) clearTimeout(timer.current)
    if (!val.trim() || val.trim().length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    timer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=5&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await res.json()
        setSuggestions(data || [])
        setOpen(data?.length > 0)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  const selectSuggestion = (item) => {
    const display = item.display_name
    setQuery(display)
    onChange({ target: { name, value: display } })
    setOpen(false)
    setSuggestions([])
  }

  return (
    <div className="relative" ref={wrapper}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative flex items-center">
        <input
          type="text"
          name={name}
          value={query}
          onChange={handleInput}
          placeholder="Type a location or use map"
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
          autoComplete="off"
          required
        />
        <button
          type="button"
          onClick={() => onMapPick(name)}
          title="Select on map"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </button>
      </div>
      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => selectSuggestion(item)}
              className="px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 cursor-pointer border-b border-gray-100 last:border-0"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"/>
        </div>
      )}
    </div>
  )
}

export default function BookingForm() {
  const { settings } = useSiteSettings()
  const [form, setForm] = useState({ pickup: '', drop: '', date: '', vehicle: '' })
  const [loading, setLoading] = useState(false)
  const [pickerTarget, setPickerTarget] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const openPicker = (field) => setPickerTarget(field)
  const closePicker = () => setPickerTarget(null)

  const handleLocationSelect = useCallback((address, lat, lng) => {
    setForm((prev) => ({ ...prev, [pickerTarget]: address }))
  }, [pickerTarget])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.pickup || !form.drop || !form.date || !form.vehicle) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    const message = encodeURIComponent(
      `Hello Namasvi Cab Services! I want to book a cab.\nPickup: ${form.pickup}\nDrop: ${form.drop}\nDate: ${form.date}\nVehicle: ${form.vehicle}`
    )
    window.open(`https://wa.me/${settings?.whatsappNumber || '919876543210'}?text=${message}`, '_blank')
    toast.success('Redirecting to WhatsApp...')
    setLoading(false)
    setForm({ pickup: '', drop: '', date: '', vehicle: '' })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card p-8 md:p-10"
        >
          <h2 className="section-title text-center">Book Your Cab</h2>
          <p className="section-subtitle text-center">Fill in your travel details and we'll get back to you instantly</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <LocationInput label="Pickup Location" name="pickup" value={form.pickup} onChange={handleChange} onMapPick={openPicker} />
            <LocationInput label="Drop Location" name="drop" value={form.drop} onChange={handleChange} onMapPick={openPicker} />

            <LocationPicker
              isOpen={!!pickerTarget}
              onClose={closePicker}
              onSelect={handleLocationSelect}
              initialValue={form[pickerTarget] || ''}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
              <select
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all bg-white"
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : 'Book Now via WhatsApp'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
