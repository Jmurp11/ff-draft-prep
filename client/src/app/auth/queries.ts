import gql from 'graphql-tag';

export const login = gql
`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        id
        email
        username
      }
      errors {
          message
      }
    }
  }
`;
