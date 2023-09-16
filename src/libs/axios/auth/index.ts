import internalApi from '@/libs/axios/internalApi'

export interface ISignUpBody {
  email: string
  password: string
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
}

const authService = AuthService.getInstance()
export default authService
