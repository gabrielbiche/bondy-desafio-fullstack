import { gql } from 'graphql-tag'

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    company: String!
  }

  extend type Query {
    me: User
    user(id: ID!): User
  }
`
