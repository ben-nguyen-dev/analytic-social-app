import internalApi from '@/libs/axios/internalApi'

export interface ISignUpBody {
  email: string
  password: string
}

export interface ISignInBody {
  email: string
  password: string
}

export interface ISignInResponse {
  accessToken: string
  refreshToken: string
}

class AuthService {
  private static instance: AuthService

  private constructor() {}

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async singUp(body: ISignUpBody) {
    const { data } = await internalApi.post('/auth/sign-up', body)

    return data
  }

  async singIn(body: ISignInBody) {
    const { data } = await internalApi.post<ISignInResponse>(
      '/auth/sign-in',
      body
    )

    return data
  }
}

const authService = AuthService.getInstance()
export default authService
