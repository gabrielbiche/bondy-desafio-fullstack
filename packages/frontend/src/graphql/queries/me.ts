import { gql } from '@apollo/client';

export const GET_ME_QUERY = gql`
  query me {
    me {
      id
      name
      email
      company
    }
  }
`;
