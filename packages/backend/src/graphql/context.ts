import * as consts from '@common/constants/errors'
import { UnauthorizedError } from '@common/errors'
import { connectDatabase } from '@config/database'
import { AuthService } from '@models/Auth/service'

let isDatabaseConnected = false

export const buildContext = async ({ event, context }: any) => {
  context.callbackWaitsForEmptyEventLoop = false

  if (!isDatabaseConnected) {
    await connectDatabase()
    isDatabaseConnected = true
  }

  let user = null
  const authHeader =
    event.headers.authorization || event.headers.Authorization || ''

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      user = await AuthService.verifyToken(token)
    } catch (error) {
      throw new UnauthorizedError(consts.INVALID_OR_EXPIRED_TOKEN)
    }

    return {
      headers: event.headers,
      functionName: context.functionName,
      user,
      event,
      context,
    }
  }
}
