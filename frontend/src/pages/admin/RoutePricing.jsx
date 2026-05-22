import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import * as routeService from '../../services/routeService'

const emptyForm = { sourceCity: '', destinationCity: '', distanceKm: '', startingPrice: '' }

export default function RoutePricing() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchRoutes() }, [])

  const fetchRoutes = async () => {
    try {
      const res = await routeService.getAll()
      setRoutes(res.data.data)
    } catch { toast.error('Failed to load routes') }
    finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true) }

  const openEdit = (r) => {
    setEditing(r.id)
    setForm({
      sourceCity: r.sourceCity, destinationCity: r.destinationCity,
      distanceKm: r.distanceKm, startingPrice: r.startingPrice
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.sourceCity || !form.destinationCity) { toast.error('Source and destination required'); return }
    const data = { ...form, distanceKm: parseFloat(form.distanceKm), startingPrice: parseFloat(form.startingPrice) }
    try {
      if (editing) { await routeService.update(editing, data); toast.success('Route updated') }
      else { await routeService.create(data); toast.success('Route created') }
      setShowModal(false); fetchRoutes()
    } catch { toast.error('Operation failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this route?')) return
    try { await routeService.remove(id); toast.success('Route deleted'); fetchRoutes() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loading />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Route Pricing</h1>
        <button onClick={openCreate} className="btn-primary text-sm">+ Add Route</button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Source</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Destination</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Distance (km)</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Starting Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{r.sourceCity}</td>
                  <td className="py-3 px-4">{r.destinationCity}</td>
                  <td className="py-3 px-4 text-right">{r.distanceKm} km</td>
                  <td className="py-3 px-4 text-right font-medium">₹{r.startingPrice?.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(r)} className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
              {routes.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">No routes found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold text-primary-500 mb-4">{editing ? 'Edit Route' : 'Add Route'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source City</label>
                  <input type="text" value={form.sourceCity} onChange={(e) => setForm({...form, sourceCity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination City</label>
                  <input type="text" value={form.destinationCity} onChange={(e) => setForm({...form, destinationCity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                  <input type="number" step="0.1" value={form.distanceKm} onChange={(e) => setForm({...form, distanceKm: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Starting Price (₹)</label>
                  <input type="number" step="0.01" value={form.startingPrice} onChange={(e) => setForm({...form, startingPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
