import gql from 'graphql-tag';

export const register = gql
  `
    mutation register($email: String!, $password: String!, $username: String!) {
      login(email: $email, password: $password, username: $username) {
        path
        message
      }
    }
  `;
