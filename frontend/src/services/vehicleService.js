import API from './api'

export const getVehicles = () => API.get('/vehicles')
export const getVehicle = (id) => API.get(`/vehicles/${id}`)
export const createVehicle = (data) => API.post('/vehicles', data)
export const updateVehicle = (id, data) => API.put(`/vehicles/${id}`, data)
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`)

export const getAll = getVehicles
export const create = createVehicle
export const update = updateVehicle
export const remove = deleteVehicle
