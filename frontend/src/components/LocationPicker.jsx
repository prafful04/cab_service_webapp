import { useState, useCallback, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function NominatimReverse({ position, onResult }) {
  useEffect(() => {
    if (!position) return
    let cancelled = false
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    )
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data?.display_name) {
          onResult(data.display_name)
        }
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [position, onResult])
  return null
}

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

function MapCenterUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

export default function LocationPicker({ isOpen, onClose, onSelect, initialValue }) {
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState('')
  const [searching, setSearching] = useState(false)

  const defaultCenter = [19.9975, 73.7898]
  const defaultZoom = 12

  const handleMapClick = useCallback((latlng) => {
    setPosition(latlng)
    setAddress('')
    setSearching(true)
  }, [])

  const handleReverseResult = useCallback((displayName) => {
    setAddress(displayName)
    setSearching(false)
  }, [])

  const handleConfirm = () => {
    if (address) {
      onSelect(address, position[0], position[1])
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Select Location</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>
          <div className="h-[400px] w-full relative">
            <MapContainer
              center={defaultCenter}
              zoom={defaultZoom}
              className="h-full w-full z-0"
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClickHandler onMapClick={handleMapClick} />
              {position && <Marker position={position} draggable={true} eventHandlers={{ dragend: (e) => {
                const marker = e.target
                const latlng = marker.getLatLng()
                setPosition([latlng.lat, latlng.lng])
                setAddress('')
                setSearching(true)
              }}} />}
              {position && <NominatimReverse position={position} onResult={handleReverseResult} />}
              {position && <MapCenterUpdater center={position} />}
            </MapContainer>
            {!position && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow text-sm text-gray-600 pointer-events-none">
                Click on the map to set a location
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-700 min-h-[40px] flex items-center">
                {searching ? (
                  <span className="text-gray-400">Fetching location name...</span>
                ) : address ? (
                  address
                ) : (
                  <span className="text-gray-400">No location selected</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={onClose} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!address}
                className="px-5 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
