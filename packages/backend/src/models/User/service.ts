import { User } from '@models/User/model'
import { NotFoundError } from '@common/errors'
import * as consts from '@common/constants/errors'
import { IUser } from '@interfaces/index'

export class UserService {
  static async getOneById(id: string): Promise<IUser | null> {
    return this.getUserByField({ _id: id })
  }

  static async getOneByEmail(email: string): Promise<IUser | null> {
    return this.getUserByField({ email })
  }

  private static async getUserByField(
    query: Record<string, unknown>
  ): Promise<IUser> {
    try {
      const user = await User.findOne(query)
      if (!user) {
        throw new NotFoundError(consts.USER_NOT_FOUND)
      }
      return user
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      throw new Error(error.message)
    }
  }
}
