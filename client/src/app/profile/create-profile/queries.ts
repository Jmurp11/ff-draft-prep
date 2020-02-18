import gql from 'graphql-tag';

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
