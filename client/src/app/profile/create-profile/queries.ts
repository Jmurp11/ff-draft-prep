import gql from 'graphql-tag';

export const register = gql
  `
    mutation register($email: String!, $password: String!, $username: String!) {
      register(email: $email, password: $password, username: $username) {
        path
        message
      }
    }
  `;
