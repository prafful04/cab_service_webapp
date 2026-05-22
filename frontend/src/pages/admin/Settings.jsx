import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { getSettings, updateSettings } from '../../services/settingsService'
import { useSiteSettings } from '../../context/SiteSettingsContext'

export default function Settings() {
  const { settings: loadedSettings, refreshSettings } = useSiteSettings()
  const [settings, setSettings] = useState({
    companyName: '',
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    basePricePerKm: '',
    taxPercent: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (loadedSettings) {
      setSettings({
        companyName: loadedSettings.companyName || '',
        phone: loadedSettings.phone || '',
        email: loadedSettings.email || '',
        address: loadedSettings.address || '',
        whatsappNumber: loadedSettings.whatsappNumber || '',
        basePricePerKm: loadedSettings.basePricePerKm || '',
        taxPercent: loadedSettings.taxPercent || '',
      })
    }
  }, [loadedSettings])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSettings(settings)
      await refreshSettings()
      toast.success('Settings saved successfully')
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-500 mb-6">Settings</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value={settings.companyName} onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input type="text" value={settings.whatsappNumber} onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Price per km (₹)</label>
              <input type="number" step="0.01" value={settings.basePricePerKm} onChange={(e) => setSettings({...settings, basePricePerKm: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax (%)</label>
              <input type="number" step="0.1" value={settings.taxPercent} onChange={(e) => setSettings({...settings, taxPercent: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-yellow-500 outline-none" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Settings'}</button>
        </form>
      </motion.div>
    </div>
  )
}
