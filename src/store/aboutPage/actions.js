import { axiosInstance } from 'boot/axios'

export async function fetchInfo ({ commit }) {
  try {
    const { data } = await axiosInstance.get('http://192.168.18.112:5000/v1/pageInfos/about')
    commit('setInfo', {
      info: data
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
