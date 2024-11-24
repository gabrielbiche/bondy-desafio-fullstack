import { UserResponse } from '@graphql/types/userTypes'

/**
 * Input for login mutation
 */
export type LoginInput = {
  email: string
  password: string
}

/**
 * Return of mutation login
 */
export type LoginResponse = {
  token: string
  user?: UserResponse
}
