import * as bcrypt from 'bcrypt'
import { UserService } from '@models/User/service'
import jwt from 'jsonwebtoken'
import { IAuth, IUser } from '@interfaces/index'
import { UnauthorizedError } from '@common/errors'
import * as consts from '@common/constants/errors'

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 8
    return bcrypt.hash(password, saltRounds)
  }

  static async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }

  private static async jwtToken(user: IUser): Promise<string> {
    const payload = { id: user._id, email: user.email }

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })

    return token
  }

  static async login(email: string, password: string): Promise<IAuth> {
    const user = await UserService.getOneByEmail(email)
    if (!user) {
      throw new UnauthorizedError(consts.AUTH_LOGIN_ERROR)
    }

    if (!user.password || !password) {
      throw new UnauthorizedError(consts.USER_PASS_EMPTY)
    }

    const passwordMatch = await this.comparePassword(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedError(consts.AUTH_LOGIN_ERROR)
    }

    const token = await this.jwtToken(user)

    return { token, user }
  }

  static async verifyToken(token: string): Promise<any> {
    try {
      jwt.verify(token, JWT_SECRET)
      const tokenContent = jwt.decode(token)
      const user = await UserService.getOneById(tokenContent?.id)
      return user
    } catch (error) {
      throw new UnauthorizedError(consts.INVALID_OR_EXPIRED_TOKEN)
    }
  }
}
