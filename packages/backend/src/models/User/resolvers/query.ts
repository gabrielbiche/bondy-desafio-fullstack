import { IUser } from '@interfaces/index'
import { UserService } from '@models/User/service'

export const userQueries = {
  async getOneUser(id: string): Promise<IUser | null> {
    return await UserService.getOneById(id)
  },
}
