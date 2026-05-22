import { FaWhatsapp } from 'react-icons/fa'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function FloatingWhatsApp() {
  const { settings } = useSiteSettings()
  const PHONE = settings?.whatsappNumber || '919876543210'
  const MESSAGE = encodeURIComponent('Hello Namasvi Cab Services! I want to inquire about cab booking.')
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  )
}
