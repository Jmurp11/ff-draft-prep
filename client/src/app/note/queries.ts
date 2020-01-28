import gql from 'graphql-tag';

export const addNote = gql
  `
    mutation addNote($user: String!, $title: String!, $date: String!, $body: String!,
        $source: String!) {
      login(user: $user, title: $title, date: $date, body: $body,
        source: $source) {
        path
        message
      }
    }
  `;