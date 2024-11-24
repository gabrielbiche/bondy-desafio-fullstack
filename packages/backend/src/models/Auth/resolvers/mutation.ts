import { IAuth } from '@interfaces/index'
import { AuthService } from '@models/Auth/service'

export const authMutations = {
  async login(email: string, password: string): Promise<IAuth> {
    return await AuthService.login(email, password)
  },
}
