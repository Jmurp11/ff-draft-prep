import gql from 'graphql-tag';

export const login = gql
  `
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      success {
        user {
          id
          email
          username
        }
        accessToken
      }
      errors {
          message
      }
    }
  }
`;

export const register = gql
  `
  mutation register($email: String!, $password: String!, $username: String!, $profileImage: String!) {
    register(input: { email: $email, password: $password, username: $username, profileImage: $profileImage }) {
      success {
        message
      }
      errors {
          message
      }
    }
  }
`;

export const logout = gql
  `
  mutation logout($userId: String!) {
    logout(input: { userId: $userId })
  }
`;
