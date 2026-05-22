import { motion } from 'framer-motion'

const galleryItems = [
  { label: 'Toyota Innova', color: 'from-blue-400 to-blue-600' },
  { label: 'Sedan Fleet', color: 'from-green-400 to-green-600' },
  { label: 'Tempo Traveller', color: 'from-purple-400 to-purple-600' },
  { label: 'Premium SUV', color: 'from-orange-400 to-orange-600' },
  { label: 'Maruti Ertiga', color: 'from-red-400 to-red-600' },
  { label: 'Our Team', color: 'from-teal-400 to-teal-600' },
]

export default function Gallery() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle">Take a look at our fleet and team</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative h-56 rounded-xl overflow-hidden bg-gradient-to-br ${item.color} group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-50">🚗</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-bold text-lg">{item.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
