import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { useSiteSettings } from '../context/SiteSettingsContext'

export default function Footer() {
  const { settings } = useSiteSettings()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-primary-500 font-extrabold text-lg">NC</span>
                </div>
                <span className="font-bold text-lg">{settings?.companyName || 'Namasvi Cab Services'}</span>
              </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium cab services across Maharashtra. Reliable, comfortable, and affordable travel solutions for Nashik, Mumbai, Pune, Shirdi and beyond.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/fleet" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Our Fleet</Link></li>
              <li><Link to="/routes" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Popular Routes</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-400">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Airport Transfers</li>
              <li className="text-gray-300 text-sm">Outstation Trips</li>
              <li className="text-gray-300 text-sm">Local City Rides</li>
              <li className="text-gray-300 text-sm">Temple Tours</li>
              <li className="text-gray-300 text-sm">Corporate Travel</li>
              <li className="text-gray-300 text-sm">Wedding Fleet</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-400">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <FaMapMarkerAlt className="mt-1 text-yellow-400 flex-shrink-0" />
                {settings?.address || 'Nashik, Maharashtra, India'}
              </li>
              <li>
                <a href={`tel:${settings?.phone || '+919067856440'}`} className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <FaPhoneAlt className="text-yellow-400 flex-shrink-0" />
                  {settings?.phone || '+91 90678 56440'}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings?.email || 'navnikpagar01@gmail.com'}`} className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  <FaEnvelope className="text-yellow-400 flex-shrink-0" />
                  {settings?.email || 'navnikpagar01@gmail.com'}
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-primary-500 transition-all text-lg"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-primary-500 transition-all text-lg"><FaInstagram /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-primary-500 transition-all text-lg"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} {settings?.companyName || 'Namasvi Cab Services'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
