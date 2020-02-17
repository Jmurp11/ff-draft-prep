export const register = (email: string, password: string, username: string) => {
  return `
    mutation {
      register(input: { email: ${email}, password: ${password}, username: ${username} }) {
        success {
          message
        }
        errors {
            message
        }
      }
    }
  `;
};
