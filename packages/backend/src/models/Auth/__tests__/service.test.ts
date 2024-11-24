import * as bcrypt from 'bcrypt'
import { UserService } from '@models/User/service'
import { UnauthorizedError } from '@common/errors'
import * as consts from '@common/constants/errors'
import { AuthService } from '@models/Auth/service'

jest.mock('@models/User/service')
jest.mock('bcrypt')

describe('AuthService', () => {
  it('should throw an error when the user is not found', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    ;(UserService.getOneByEmail as jest.Mock).mockResolvedValue(null)

    await expect(AuthService.login(email, password)).rejects.toThrowError(
      new UnauthorizedError(consts.AUTH_LOGIN_ERROR)
    )
  })

  it('should throw an error when the password is incorrect', async () => {
    const email = 'test@example.com'
    const password = 'wrongPassword'

    const user = {
      _id: 'user-id',
      email: 'test@example.com',
      password: 'hashedPassword123',
    }
    ;(UserService.getOneByEmail as jest.Mock).mockResolvedValue(user)
    ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

    await expect(AuthService.login(email, password)).rejects.toThrowError(
      new UnauthorizedError(consts.AUTH_LOGIN_ERROR)
    )
  })

  it('should throw an error when the password is empty', async () => {
    const email = 'test@example.com'
    const password = ''

    const user = {
      _id: 'user-id',
      email: 'test@example.com',
      password: 'hashedPassword123',
    }
    ;(UserService.getOneByEmail as jest.Mock).mockResolvedValue(user)

    await expect(AuthService.login(email, password)).rejects.toThrowError(
      new UnauthorizedError(consts.USER_PASS_EMPTY)
    )
  })
})
