import { FaArrowRight, FaRoad, FaMoneyBillWave } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function RoutePricingCard({ route }) {
  if (!route) return null
  const { sourceCity, destinationCity, distanceKm, startingPrice } = route

  return (
    <div className="card overflow-hidden group">
      <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-500">{sourceCity}</span>
            <FaArrowRight className="text-yellow-500" />
            <span className="text-lg font-bold text-primary-500">{destinationCity}</span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaRoad className="text-yellow-500" />
            <span>Distance: <strong>{distanceKm} km</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-yellow-500" />
            <span>Starting from: <strong className="text-primary-500 text-lg">&#8377;{startingPrice?.toLocaleString()}</strong></span>
          </div>
        </div>
        <Link to={`/contact?from=${encodeURIComponent(sourceCity)}&to=${encodeURIComponent(destinationCity)}`} className="btn-primary !py-2 !px-4 text-sm w-full text-center inline-block">
          Book Now
        </Link>
      </div>
    </div>
  )
}
