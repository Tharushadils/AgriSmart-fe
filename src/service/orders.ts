import api from "./api"

export const getStoreOrders = async (page: number = 1, limit: number = 10) => {
  const res = await api.get(`/orders?page=${page}&limit=${limit}`)
  return res.data
}

export const getOrderById = async (id: string) => {
  const res = await api.get(`/orders/${id}`)
  return res.data
}

export const createOrder = async (orderData: any) => {
  const res = await api.post(`/orders`, orderData)
  return res.data
}

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.patch(`/orders/${id}/status`, { status })
  return res.data
}