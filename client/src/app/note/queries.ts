export const addNote = (user: string, player: number, title: string, date: string, body: string, source: string) => {
  return `
    mutation {
      addNote(input: { user: ${user}, player: ${player}, title: ${title}, date: ${date}, body: ${body},
        source: ${source} }) {
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
