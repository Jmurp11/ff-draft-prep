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
        expiresIn
      }
      errors {
          message
      }
    }
  }
`;

export const register = gql
  `
  mutation register($email: String!, $password: String!, $username: String!) {
    register(input: { email: $email, password: $password, username: $username }) {
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

export const confirmUser = gql
  `
  mutation confirmUser($token: String!) {
    confirmUser(token: $token) {
      success {
        message
      }
      errors {
          message
      }
    }
  }
`;

export const forgotPassword = gql
  `
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success {
        message
      }
      errors {
          message
      }
    }
  }
`;

export const changePassword = gql
  `
  mutation changePassword($token: String!, $password: String!) {
    changePassword(input: { token: $token, password: $password }) {
      success {
        message
      }
      errors {
          message
      }
    }
  }
`;