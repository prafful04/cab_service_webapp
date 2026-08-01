import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaUsers, FaTachometerAlt, FaMoneyBillWave } from 'react-icons/fa'
import Innova  from './Innova.jpg'
import Swift  from './Swift.jpg'
import Ertiga  from './Ertiga.jpg'


const fleet = [
  { name: 'Swift', type: 'hatchback', capacity: '3+1', price: '₹10/km', img: Swift },
  { name: 'Innova', type: 'SUV', capacity: '7+1', price: '₹14/km', img: Innova },
  { name: 'Ertiga', type: 'MPV', capacity: '7+1', price: '₹12/km', img: Ertiga },
]

export default function FleetShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our Fleet</h2>
          <p className="section-subtitle">Choose from our wide range of well-maintained vehicles</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleet.map((vehicle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden group"
            >
              <d<div> <img src={vehicle.img} alt= {vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/></div>
                {/* <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-primary-500/20 transition-all" />
                <div className="text-6xl text-primary-300 z-10">🚗</div> */}
                <div className="absolute top-3 right-3 bg-yellow-500 text-primary-500 text-xs font-bold px-3 py-1 rounded-full z-10">
                  {vehicle.type}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-primary-500 mb-3">{vehicle.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-yellow-500" />
                    <span>Capacity: <strong>{vehicle.capacity}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTachometerAlt className="text-yellow-500" />
                    <span>Type: <strong>{vehicle.type}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-yellow-500" />
                    <span>Starting: <strong className="text-primary-500">{vehicle.price}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/fleet" className="btn-secondary">
            View Full Fleet
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
