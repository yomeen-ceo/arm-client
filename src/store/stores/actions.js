import { axiosInstance } from 'boot/axios'

export async function getStoreById (context, { storeId }) {
  try {
    const { data } = await axiosInstance.get(`/v1/stores/${storeId}/basic`)
    context.commit('setStore', {
      store: data.store
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export function setAudioMuted (context, { isMuted }) {
  context.commit('setAudioMuted', {
    isMuted
  })
}

export function setOrders (context, { orders }) {
  context.commit('setOrders', {
    orders
  })
}
