import axios from 'axios'
import { getAccessToken } from '@/utils'

const internalApi = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

internalApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

internalApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default internalApi
