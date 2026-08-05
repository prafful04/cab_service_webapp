import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useSiteSettings } from '../context/SiteSettingsContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/routes', label: 'Routes' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { settings } = useSiteSettings()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-primary-500 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-primary-500 font-extrabold text-lg">NC</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg tracking-tight">{settings?.companyName || 'Namasvi Cab Services'}</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors duration-200 hover:text-yellow-400 ${
                  isActive(link.to) ? 'text-yellow-400 border-b-2 border-yellow-400' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${settings?.phone || '+919067856440'}`} className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium">
              <FaPhoneAlt /> {settings?.phone || '+91 90678 56440'}
            </a>
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <Link to="/admin" className="text-yellow-400 font-medium hover:text-yellow-300">
                  {user?.username || 'Dashboard'}
                </Link>
                <button onClick={logout} className="btn-outline !py-2 !px-4 !text-sm">
                  Logout
                </button>
              </div>
            )}
          </div>

          <button className="md:hidden text-2xl p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-600 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 font-medium ${isActive(link.to) ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
                >
                  {link.label}
                </Link>
              ))}
              <a href={`tel:${settings?.phone || '+919067856440'}`} className="flex items-center gap-2 py-2 text-yellow-400 font-medium">
                <FaPhoneAlt /> {settings?.phone || '+91 90678 56440'}
              </a>
              {isAuthenticated && (
                <>
                  <Link to="/admin" onClick={() => setMobileOpen(true)} className="block py-2 text-yellow-400 font-medium">Dashboard</Link>
                  <button onClick={() => { logout(); setMobileOpen(false) }} className="btn-outline !py-2 !px-4 !text-sm w-full text-center">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
