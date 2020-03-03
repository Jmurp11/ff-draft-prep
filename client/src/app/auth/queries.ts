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
