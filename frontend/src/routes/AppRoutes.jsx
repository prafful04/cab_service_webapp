import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import Home from '../pages/Home'
import Fleet from '../pages/Fleet'
import RoutesPage from '../pages/Routes'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Dashboard from '../pages/admin/Dashboard'
import AdminVehicles from '../pages/admin/Vehicles'
import AdminDrivers from '../pages/admin/Drivers'
import AdminBookings from '../pages/admin/Bookings'
import AdminRoutePricing from '../pages/admin/RoutePricing'
import AdminGallery from '../pages/admin/Gallery'
import AdminCustomers from '../pages/admin/Customers'
import AdminSettings from '../pages/admin/Settings'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/fleet" element={<MainLayout><Fleet /></MainLayout>} />
      <Route path="/routes" element={<MainLayout><RoutesPage /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/vehicles" element={<ProtectedRoute><AdminLayout><AdminVehicles /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/drivers" element={<ProtectedRoute><AdminLayout><AdminDrivers /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/routes" element={<ProtectedRoute><AdminLayout><AdminRoutePricing /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/gallery" element={<ProtectedRoute><AdminLayout><AdminGallery /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute><AdminLayout><AdminCustomers /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
