import { gql } from 'graphql-tag'

export const loginTypeDefs = gql`
  type Auth {
    token: String!
    user: User!
  }

  extend type Mutation {
    login(email: String!, password: String!): Auth
  }
`
