import gql from 'graphql-tag';

export const login = gql
  `
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        path
        message
      }
    }
  `;
