import { axiosInstance } from 'boot/axios'

export async function fetchTables (context, { storeId }) {
  try {
    const { data } = await axiosInstance.get(`/v1/stores/${storeId}/tables`)
    context.commit('setTables', {
      storeId,
      tables: data.tables
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function fetchMainKinds (context, { storeId }) {
  try {
    const { data } = await axiosInstance.get(`/v1/stores/${storeId}/kinds`)
    context.commit('setMainKinds', {
      storeId,
      mainKinds: data.mainKinds
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export function updateTableSelection (context, payload) {
  context.commit('updateTableSelection', payload)
}

export function updateKindSelection (context, payload) {
  context.commit('updateKindSelection', payload)
}
