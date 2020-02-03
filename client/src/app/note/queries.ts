import gql from 'graphql-tag';

export const addNote = gql
  `
    mutation addNote($user: String!, $player: Int!, $title: String!, $date: String!, $body: String!,
        $source: String!) {
      addNote(user: $user, player: $player, title: $title, date: $date, body: $body,
        source: $source) {
        path
        message
      }
    }
  `;
