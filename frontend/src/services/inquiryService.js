import API from './api'

export const getInquiries = () => API.get('/inquiries')
export const createInquiry = (data) => API.post('/inquiries', data)
export const deleteInquiry = (id) => API.delete(`/inquiries/${id}`)

export const getAll = getInquiries
export const remove = deleteInquiry
