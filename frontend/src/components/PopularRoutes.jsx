import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaRoad } from 'react-icons/fa'

const routes = [
  { from: 'Nashik', to: 'Mumbai', distance: '165 km', price: '₹2,500', color: 'from-blue-500 to-blue-600' },
  { from: 'Nashik', to: 'Pune', distance: '210 km', price: '₹3,200', color: 'from-green-500 to-green-600' },
  { from: 'Mumbai', to: 'Pune', distance: '150 km', price: '₹2,800', color: 'from-purple-500 to-purple-600' },
  { from: 'Nashik', to: 'Shirdi', distance: '90 km', price: '₹1,500', color: 'from-orange-500 to-orange-600' },
]

export default function PopularRoutes() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Popular Routes</h2>
          <p className="section-subtitle">Most booked routes across Maharashtra</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${route.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-500">{route.from}</span>
                    <FaArrowRight className="text-yellow-500" />
                    <span className="text-lg font-bold text-primary-500">{route.to}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <FaRoad className="text-yellow-500" />
                  <span>{route.distance}</span>
                </div>
                <div className="text-2xl font-bold text-primary-500 mb-4">
                  {route.price}<span className="text-sm font-normal text-gray-400"> onwards</span>
                </div>
                <Link to={`/contact?from=${route.from}&to=${route.to}`} className="btn-primary !py-2 !px-4 text-sm w-full text-center inline-block">
                  Book This Route
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
