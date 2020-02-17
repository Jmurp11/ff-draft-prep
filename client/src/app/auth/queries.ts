export const login = (email: string, password: string) => {
  return `
    mutation {
      login(input: { email: ${email}, password: ${password} }) {
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
