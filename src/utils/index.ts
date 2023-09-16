import Cookies from 'js-cookie'
import { KEY_COOKIES } from '@/config/constants'

export const getAccessToken = () => {
  return Cookies.get(KEY_COOKIES.ACCESS_TOKEN)
}
export const getRefreshToken = () => {
  return Cookies.get(KEY_COOKIES.REFRESH_TOKEN)
}

export const setAccessToken = (token: string) => {
  if (!token) return
  return Cookies.set(KEY_COOKIES.ACCESS_TOKEN, token)
}

export const getMessageError = (error: any) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  return error.message
}
