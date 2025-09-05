import { axiosInstance } from 'boot/axios'

export async function fetchInfo ({ commit }) {
  try {
    const { data } = await axiosInstance.get('/v1/pageInfos/about')
    commit('setInfo', {
      info: data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
