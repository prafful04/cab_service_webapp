import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import * as vehicleService from '../../services/vehicleService'

const emptyForm = { name: '', type: 'SEDAN', capacity: 4, pricePerKm: '', imageUrl: '', status: 'AVAILABLE' }

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchVehicles() }, [])

  const fetchVehicles = async () => {
    try {
      const res = await vehicleService.getAll()
      setVehicles(res.data.data)
    } catch { toast.error('Failed to load vehicles') }
    finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true) }

  const openEdit = (v) => {
    setEditing(v.id)
    setForm({
      name: v.name, type: v.type, capacity: v.capacity,
      pricePerKm: v.pricePerKm, imageUrl: v.imageUrl || '', status: v.status
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.pricePerKm) { toast.error('Name and price are required'); return }
    try {
      if (editing) {
        await vehicleService.update(editing, { ...form, pricePerKm: parseFloat(form.pricePerKm), capacity: parseInt(form.capacity) })
        toast.success('Vehicle updated')
      } else {
        await vehicleService.create({ ...form, pricePerKm: parseFloat(form.pricePerKm), capacity: parseInt(form.capacity) })
        toast.success('Vehicle created')
      }
      setShowModal(false)
      fetchVehicles()
    } catch { toast.error('Operation failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this vehicle?')) return
    try {
      await vehicleService.remove(id)
      toast.success('Vehicle deleted')
      fetchVehicles()
    } catch { toast.error('Delete failed') }
  }

  if (loading) return <Loading />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Vehicles</h1>
        <button onClick={openCreate} className="btn-primary text-sm">+ Add Vehicle</button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Capacity</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Price/km</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{v.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded text-xs">{v.type}</span>
                  </td>
                  <td className="py-3 px-4 text-center">{v.capacity} seats</td>
                  <td className="py-3 px-4 text-right">₹{v.pricePerKm}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(v)} className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No vehicles found</td></tr>
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
            className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-primary-500 mb-4">{editing ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none">
                    <option value="SEDAN">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="HATCHBACK">Hatchback</option>
                    <option value="LUXURY">Luxury</option>
                    <option value="TEMPO_TRAVELLER">Tempo Traveller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input type="number" value={form.capacity} onChange={(e) => setForm({...form, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per km (₹)</label>
                  <input type="number" step="0.01" value={form.pricePerKm} onChange={(e) => setForm({...form, pricePerKm: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none">
                    <option value="AVAILABLE">Available</option>
                    <option value="BOOKED">Booked</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" value={form.imageUrl} onChange={(e) => setForm({...form, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none" />
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
