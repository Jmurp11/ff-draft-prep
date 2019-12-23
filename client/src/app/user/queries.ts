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

export const userById = (id: string) => {
  const user = gql
  `
    query {
      userById(id: "${id}") {
        id
        email
        password
        username
        confirmed
        forgotPasswordLock
      }
    }
  `;

  return user;
};

export const userByUsername = (username: string) => {
  const user = gql
  `
    query {
      userByUsername(username: "${username}") {
        id
        email
        password
        username
        confirmed
        forgotPasswordLock
      }
    }
  `;

  return user;
};

export const userByEmail = (email: string) => {
  const user = gql
  `
    query {
      userByEmail(email: "${email}") {
        id
        email
        password
        username
        confirmed
        forgotPasswordLock
      }
    }
  `;

  return user;
};
