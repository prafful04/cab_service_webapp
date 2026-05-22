import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] bg-primary-500 overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 border border-yellow-400 rounded-full" />
        <div className="absolute top-40 right-20 w-96 h-96 border border-yellow-400 rounded-full" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 border border-yellow-400 rounded-full" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-400 rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-yellow-400 rounded-full" />
        <div className="absolute top-20 left-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center lg:text-left lg:max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-yellow-400 font-semibold tracking-wider uppercase mb-4"
          >
            Premium Cab Services Across Maharashtra
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            <span className="text-yellow-400">Namasvi</span> Cab<br />
            <span className="text-3xl sm:text-4xl md:text-5xl">Your Journey, Our Priority</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-4"
          >
            Nashik <span className="text-yellow-400 mx-2">|</span> Mumbai <span className="text-yellow-400 mx-2">|</span> Pune <span className="text-yellow-400 mx-2">|</span> Shirdi
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Reliable, comfortable, and affordable cab services. Airport transfers, outstation trips, and local rides.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link to="/fleet" className="btn-primary text-lg">
              Book a Cab Now
            </Link>
            <Link to="/contact" className="btn-outline text-lg !text-white !border-white hover:!text-black">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
