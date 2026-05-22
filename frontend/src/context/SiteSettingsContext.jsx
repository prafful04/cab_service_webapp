import { createContext, useContext, useState, useEffect } from 'react'
import { getSettings } from '../services/settingsService'

const SiteSettingsContext = createContext(null)

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings()
      .then((res) => setSettings(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const refreshSettings = () => {
    setLoading(true)
    getSettings()
      .then((res) => setSettings(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext)
  if (!context) throw new Error('useSiteSettings must be used within SiteSettingsProvider')
  return context
}
