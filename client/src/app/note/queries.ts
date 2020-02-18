import gql from 'graphql-tag';

export const addNote = gql
  `
    mutation createNote($user: String!, $player: Int!, $title: String!, $date: String!, $body: String!,
        $source: String!) {
      addNote(input: { user: $user, player: $player, title: $title, date: $date, body: $body,
        source: $source }) {
          success {
            message
          }
          errors {
              message
          }
      }
    }
  `;