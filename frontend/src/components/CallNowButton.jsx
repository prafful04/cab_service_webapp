import { useState } from 'react'
import { FaPhoneAlt, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function CallNowButton() {
  const { settings } = useSiteSettings()
  const PHONE_NUMBER = settings?.phone || '+919876543210'
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 bottom-6 z-50 w-14 h-14 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center text-primary-500 text-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Call now"
      >
        <FaPhoneAlt />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <button onClick={() => setOpen(false)} className="float-right text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-3xl text-primary-500 mx-auto mb-4">
                <FaPhoneAlt />
              </div>
              <h3 className="text-xl font-bold text-primary-500 mb-2">Call Namasvi Cab</h3>
              <p className="text-gray-600 mb-6">Speak directly with our team</p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="btn-primary inline-block text-xl !px-8 !py-4"
                onClick={() => setOpen(false)}
              >
                {PHONE_NUMBER}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
