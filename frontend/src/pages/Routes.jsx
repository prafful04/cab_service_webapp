import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import { getRoutes } from '../services/routeService'
import RoutePricingCard from '../components/RoutePricingCard'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

export default function RoutesPage() {
  const [routes, setRoutes] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRoutes()
      .then((res) => setRoutes(res.data.data || []))
      .catch(() => toast.error('Failed to load routes'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = routes.filter(
    (r) =>
      r.sourceCity?.toLowerCase().includes(search.toLowerCase()) ||
      r.destinationCity?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <Loading />

  return (
    <>
      <Helmet><title>Routes & Pricing | Namasvi Cab Services</title></Helmet>
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="section-title">Routes & Pricing</h1>
            <p className="section-subtitle">Check our route-wise pricing and book your ride</p>
          </motion.div>

          <div className="max-w-md mx-auto mb-10 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none shadow-sm"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No routes found. Try a different search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((route) => (
                <RoutePricingCard key={route.id} route={route} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
