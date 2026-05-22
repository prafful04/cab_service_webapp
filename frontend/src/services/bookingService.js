import API from './api'

export const getBookings = () => API.get('/bookings')
export const getBooking = (id) => API.get(`/bookings/${id}`)
export const createBooking = (data) => API.post('/bookings', data)
export const updateBooking = (id, data) => API.put(`/bookings/${id}`, data)
export const deleteBooking = (id) => API.delete(`/bookings/${id}`)
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}/status?status=${status}`)

export const getAll = getBookings
export const create = createBooking
export const update = updateBooking
export const remove = deleteBooking
export const updateStatus = updateBookingStatus
