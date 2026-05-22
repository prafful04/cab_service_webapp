export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 z-50 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary-500 border-t-yellow-500 rounded-full animate-spin mb-4" />
      <p className="text-primary-500 font-semibold text-lg">Loading...</p>
    </div>
  )
}
