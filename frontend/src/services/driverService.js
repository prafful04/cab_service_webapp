import API from './api'

export const getDrivers = () => API.get('/drivers')
export const getDriver = (id) => API.get(`/drivers/${id}`)
export const createDriver = (data) => API.post('/drivers', data)
export const updateDriver = (id, data) => API.put(`/drivers/${id}`, data)
export const deleteDriver = (id) => API.delete(`/drivers/${id}`)

export const getAll = getDrivers
export const create = createDriver
export const update = updateDriver
export const remove = deleteDriver
