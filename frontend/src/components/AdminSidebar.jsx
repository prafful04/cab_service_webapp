import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaCar, FaUsers, FaCalendarCheck, FaRoad, FaImages, FaUserTie, FaCog, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
  { to: '/admin/vehicles', label: 'Vehicles', icon: FaCar },
  { to: '/admin/drivers', label: 'Drivers', icon: FaUsers },
  { to: '/admin/bookings', label: 'Bookings', icon: FaCalendarCheck },
  { to: '/admin/routes', label: 'Routes / Pricing', icon: FaRoad },
  { to: '/admin/gallery', label: 'Gallery', icon: FaImages },
  { to: '/admin/customers', label: 'Customers', icon: FaUserTie },
  { to: '/admin/settings', label: 'Settings', icon: FaCog },
]

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { logout, user } = useAuth()

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-500 font-extrabold text-sm">NC</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">Admin Panel</p>
            <p className="text-yellow-400 text-xs truncate">{user?.username || 'Admin'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive(link.to)
                ? 'bg-yellow-500 text-primary-500'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <link.icon className="text-lg" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white w-full transition-all"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-[70] w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className="hidden lg:flex w-64 bg-primary-500 flex-shrink-0 min-h-screen">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-primary-500 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
