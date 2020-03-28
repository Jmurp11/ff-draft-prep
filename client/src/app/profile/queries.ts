import gql from 'graphql-tag';

export const userByUsername = gql
  `
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      email
      username
    }
  }
`;
