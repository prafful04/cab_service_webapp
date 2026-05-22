import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaTrash } from 'react-icons/fa'
import toast from 'react-hot-toast'

const defaultImages = [
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
  'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
]

export default function Gallery() {
  const [images, setImages] = useState(defaultImages)
  const [url, setUrl] = useState('')

  const addImage = () => {
    if (!url.trim()) { toast.error('Please enter an image URL'); return }
    setImages([url, ...images])
    setUrl('')
    toast.success('Image added')
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    toast.success('Image removed')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-500 mb-6">Gallery</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && addImage()}
          />
          <button onClick={addImage} className="btn-primary flex items-center gap-2">
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-48 object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }} />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => removeImage(i)}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No images in gallery</p>
          <p className="text-sm mt-2">Add image URLs above to showcase your fleet</p>
        </div>
      )}
    </div>
  )
}
