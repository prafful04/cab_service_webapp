import { FaUsers, FaTachometerAlt, FaMoneyBillWave } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function VehicleCard({ vehicle }) {
  if (!vehicle) return null
  const { name, type, capacity, pricePerKm, imageUrl, id } = vehicle

  return (
    <div className="card overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
        ) : null}
        <div className={`${imageUrl ? 'hidden' : 'flex'} w-full h-full items-center justify-center text-6xl text-primary-300`}>
          <FaTachometerAlt />
        </div>
        <div className="absolute top-3 right-3 bg-yellow-500 text-primary-500 text-xs font-bold px-3 py-1 rounded-full">
          {type}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-primary-500 mb-3">{name}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaUsers className="text-yellow-500" />
            <span>Capacity: <strong>{capacity}</strong> Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-yellow-500" />
            <span>Type: <strong>{type}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-yellow-500" />
            <span>Price: <strong className="text-primary-500">&#8377;{pricePerKm}/km</strong></span>
          </div>
        </div>
        <Link to={`/contact?vehicle=${encodeURIComponent(name)}`} className="btn-primary !py-2 !px-4 text-sm w-full text-center inline-block">
          Book Now
        </Link>
      </div>
    </div>
  )
}
