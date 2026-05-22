import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const testimonials = [
  { name: 'Rajesh Patil', review: 'Excellent service! Booked a cab from Nashik to Mumbai. Driver was punctual and the car was very clean. Highly recommended!', rating: 5 },
  { name: 'Priya Sharma', review: 'Namasvi Cab made our Shirdi trip very comfortable. The pricing was transparent and the driver was very knowledgeable about the route.', rating: 5 },
  { name: 'Amit Deshmukh', review: 'Regularly use their service for Pune trips. Very reliable and affordable. The booking process is smooth and hassle-free.', rating: 4 },
  { name: 'Sunita Joshi', review: 'Best cab service in Nashik! Used them for airport transfer. Driver waited patiently despite my flight being delayed. Thank you!', rating: 5 },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), [])
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Trusted by hundreds of happy travelers across Maharashtra</p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="card p-8 md:p-10 text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className={i < testimonials[current].rating ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
            </div>
            <p className="text-gray-600 text-lg mb-6 italic leading-relaxed">"{testimonials[current].review}"</p>
            <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              {testimonials[current].name.charAt(0)}
            </div>
            <h4 className="font-bold text-primary-500 text-lg">{testimonials[current].name}</h4>
          </motion.div>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-500 hover:text-yellow-500 transition-colors hidden md:flex">
            <FaChevronLeft />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary-500 hover:text-yellow-500 transition-colors hidden md:flex">
            <FaChevronRight />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-yellow-500 w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
