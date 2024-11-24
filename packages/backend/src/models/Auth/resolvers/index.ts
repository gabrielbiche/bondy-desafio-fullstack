import { authMutations } from '@models/Auth/resolvers/mutation'
import { LoginInput, LoginResponse } from '@graphql/types/authTypes'

export const authResolvers = {
  Mutation: {
    login: async (
      _: unknown,
      { email, password }: LoginInput
    ): Promise<LoginResponse> => await authMutations.login(email, password),
  },
}
