import Vue from 'vue'
import axios from 'axios'

import config from '../../.config'

const baseURL = process.env.DEV ? 'http://localhost:5000' : config.apiServerBaseURL

export const axiosInstance = axios.create({
  baseURL
})

Vue.prototype.axios = axios
Vue.prototype.axiosInstance = axiosInstance

export default ({ app }) => {
  app.axios = axios
  app.axiosInstance = axiosInstance
}
