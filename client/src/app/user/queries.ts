export const users =
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
  return `
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
};

export const userByUsername = (username: string) => {
  return `
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
};

export const userByEmail = (email: string) => {
  return `
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
};
