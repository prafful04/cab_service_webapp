import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getVehicles } from '../services/vehicleService'
import VehicleCard from '../components/VehicleCard'
import Loading from '../components/Loading'
import toast from 'react-hot-toast'

const types = ['All', 'SEDAN', 'SUV', 'HATCHBACK', 'LUXURY', 'TEMPO_TRAVELLER']

export default function Fleet() {
  const [vehicles, setVehicles] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVehicles()
      .then((res) => setVehicles(res.data.data || []))
      .catch(() => toast.error('Failed to load vehicles'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'All' ? vehicles : vehicles.filter((v) => v.type === filter)

  if (loading) return <Loading />

  return (
    <>
      <Helmet><title>Our Fleet | Namasvi Cab Services</title></Helmet>
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="section-title">Our Fleet</h1>
            <p className="section-subtitle">Choose from our range of well-maintained vehicles for your journey</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  filter === t ? 'bg-yellow-500 text-primary-500' : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {t === 'TEMPO_TRAVELLER' ? 'Tempo Traveller' : t.charAt(0) + t.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No vehicles found for this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
