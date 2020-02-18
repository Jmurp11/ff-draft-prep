import gql from 'graphql-tag';

export const users = gql
  `
  query {
    users {
      id
      email
      password
      username
      confirmed
      forgotPasswordLock
    }
  }
`;

export const userById = gql
  `
    query userById($id: String!) {
      userById(id: $id) {
        id
        email
        password
        username
        confirmed
        forgotPasswordLock
      }
    }
`;

export const userByUsername = gql
`
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      email
      password
      username
      confirmed
      forgotPasswordLock
    }
  }
`;

export const userByEmail = gql
`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      email
      password
      username
      confirmed
      forgotPasswordLock
    }
  }
`;
