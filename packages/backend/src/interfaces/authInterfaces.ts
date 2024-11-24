import { IUser } from '@interfaces/index'

export interface IAuth {
  token: string
  user: IUser
}
