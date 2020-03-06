import gql from 'graphql-tag';

export const createNote = gql
  `
    mutation createNote($user: String!, $player: Float!, $title: String!, $body: String!,
        $source: String!, $isPrivate: Boolean!) {
      createNote(input: { user: $user, player: $player, title: $title, body: $body,
        source: $source, isPrivate: $isPrivate }) {
          success {
            message
          }
          errors {
              message
          }
      }
    }
  `;

export const notes = gql
  `
    query {
      notes {
        id
        user {
          username
        }
        player {
          firstName
          lastName
          team {
            team {
              abbreviation
            }
          }
          position
        }
        title
        body
        source
        isPrivate
        likes
        shares
        creationTime
      }
    }
  `;
