import { IGraphQLContext } from '@interfaces/contextInterfaces'
import { ID } from '@graphql/types/sharedTypes'
import { UserResponse } from '@graphql/types/userTypes'
import { userQueries } from '@models/User/resolvers/query'
import { isAuthenticated } from '@graphql/middleware/auth'

export const userResolvers = {
  Query: {
    me: isAuthenticated(
      async (
        _: unknown,
        __: unknown,
        ctx: IGraphQLContext
      ): Promise<UserResponse> => {
        return await userQueries.getOneUser(ctx.user.id)
      }
    ),
    user: isAuthenticated(
      async (_: unknown, { id }: { id: ID }): Promise<UserResponse> => {
        return await userQueries.getOneUser(id)
      }
    ),
  },
}
