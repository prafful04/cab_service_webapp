import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import * as driverService from '../../services/driverService'
import * as vehicleService from '../../services/vehicleService'

const emptyForm = { name: '', phone: '', licenseNumber: '', experienceYears: 1, status: 'AVAILABLE', vehicleId: '' }

export default function Drivers() {
  const [drivers, setDrivers] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [dRes, vRes] = await Promise.all([driverService.getAll(), vehicleService.getAll()])
      setDrivers(dRes.data.data)
      setVehicles(vRes.data.data)
    } catch { toast.error('Failed to load data') }
    finally { setLoading(false) }
  }

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true) }

  const openEdit = (d) => {
    setEditing(d.id)
    setForm({
      name: d.name, phone: d.phone, licenseNumber: d.licenseNumber,
      experienceYears: d.experienceYears, status: d.status, vehicleId: d.vehicleId || ''
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.licenseNumber) { toast.error('Name, phone and license are required'); return }
    const data = { ...form, experienceYears: parseInt(form.experienceYears), vehicleId: form.vehicleId || null }
    try {
      if (editing) { await driverService.update(editing, data); toast.success('Driver updated') }
      else { await driverService.create(data); toast.success('Driver created') }
      setShowModal(false); fetchData()
    } catch { toast.error('Operation failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this driver?')) return
    try { await driverService.remove(id); toast.success('Driver deleted'); fetchData() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <Loading />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-500">Drivers</h1>
        <button onClick={openCreate} className="btn-primary text-sm">+ Add Driver</button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">License</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Experience</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Vehicle</th>
                <th className="text-center py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{d.name}</td>
                  <td className="py-3 px-4">{d.phone}</td>
                  <td className="py-3 px-4 text-xs font-mono">{d.licenseNumber}</td>
                  <td className="py-3 px-4 text-center">{d.experienceYears}yrs</td>
                  <td className="py-3 px-4">{d.vehicleName || '-'}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      d.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' :
                      d.status === 'ON_TRIP' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>{d.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(d)} className="text-blue-500 hover:text-blue-700">Edit</button>
                    <button onClick={() => handleDelete(d.id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
              {drivers.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No drivers found</td></tr>
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
            <h2 className="text-xl font-bold text-primary-500 mb-4">{editing ? 'Edit Driver' : 'Add Driver'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input type="text" value={form.licenseNumber} onChange={(e) => setForm({...form, licenseNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                  <input type="number" value={form.experienceYears} onChange={(e) => setForm({...form, experienceYears: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none">
                    <option value="AVAILABLE">Available</option>
                    <option value="ON_TRIP">On Trip</option>
                    <option value="OFF_DUTY">Off Duty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Vehicle</label>
                  <select value={form.vehicleId} onChange={(e) => setForm({...form, vehicleId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none">
                    <option value="">No Vehicle</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>{v.name} ({v.type})</option>
                    ))}
                  </select>
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
