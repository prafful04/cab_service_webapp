import { motion } from 'framer-motion'
import { FaStar, FaShieldAlt, FaRupeeSign, FaHeadset } from 'react-icons/fa'

const reasons = [
  { icon: FaStar, title: 'Experienced Drivers', desc: 'Professional, courteous, and experienced drivers who know Maharashtra roads inside out.' },
  { icon: FaShieldAlt, title: 'Well-Maintained Fleet', desc: 'All vehicles undergo regular maintenance and safety checks for a smooth journey.' },
  { icon: FaRupeeSign, title: 'Transparent Pricing', desc: 'No hidden charges. What you see is what you pay. Competitive rates guaranteed.' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'Round-the-clock customer support for bookings, inquiries, and emergency assistance.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Why Choose Namasvi Cab?</h2>
          <p className="section-subtitle">We are committed to providing the best travel experience</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 text-center group hover:bg-primary-500 hover:text-white transition-all duration-300"
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-2xl text-primary-500 mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon />
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-400">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-200">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
