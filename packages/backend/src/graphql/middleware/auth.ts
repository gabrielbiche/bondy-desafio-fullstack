import { UnauthorizedError } from '@common/errors'
import * as consts from '@common/constants/errors'

import { IGraphQLContext } from '@interfaces/index'

type ResolverFunction = (...args: any[]) => any

export const isAuthenticated =
  (resolver: ResolverFunction) =>
  async (parent: any, args: any, context: IGraphQLContext, info: any) => {
    if (!context.user) {
      throw new UnauthorizedError(consts.USER_UNAUTHENTICATED)
    }
    return resolver(parent, args, context, info)
  }
