import gql from 'graphql-tag';

export const createNote = gql
  `
    mutation createNote($user: String!, $player: String!, $title: String!, $body: String!,
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

export const deleteNote = gql
  `
    mutation deleteNote($id: String!) {
      deleteNote(id: $id) {
        success {
          message
        }
        errors {
          message
        }
      }
    }
  `;

export const addLike = gql
  `
    mutation addLike($user: String!, $note: String!) {
      addLike(input: { user: $user, note: $note }) {
        success {
          message
        }
        errors {
          message
        }
      }
    }
`;

export const deleteLike = gql
  `
    mutation deleteLike($id: String!) {
      deleteLike(id: $id) {
        success {
          message
        }
        errors {
          message
        }
      }
    }
`;

export const createShare = gql
  `
    mutation createShare($user: String!, $note: String!) {
      createShare(input: { user: $user, note: $note }) {
        success {
          message
        }
        errors {
          message
        }
      }
    }
`;

export const deleteShare = gql
  `
    mutation deleteShare($id: String!) {
      deleteShare(id: $id) {
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
          profileImage
        }
        player {
          id
          firstName
          lastName
          name
          team {
            abbreviation
          }
          position
        }
        title
        body
        source
        likes {
          user {
            username
          }
        }
        shares {
          user {
            username
          }
        }
        isPrivate
        creationTime
      }
    }
  `;

export const players = gql
  `
    query {
      players {
        id
        firstName
        lastName
        name
        position
        team {
          city
          abbreviation
          nickname
        }
      }
    }
  `;
