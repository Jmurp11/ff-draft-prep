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
    mutation deleteNote($id: String!, $user: String!) {
      deleteNote(input: {
        id: $id,
        user: $user
      }) {
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

export const publicNotes = gql
  `
    query {
      notes(user: null) {
        id
        user {
          id
          username
          profileImage
        }
        player {
          id
          name
          team {
            id
            abbreviation
          }
          position
        }
        title
        body
        source
        likes {
          id
          user {
            id
            username
          }
        }
        shares {
          id
          user {
            id
            username
          }
        }
        creationTime
      }
    }
  `;

export const notes = gql
  `
    query notes($user: String) {
      notes(user: $user) {
        id
        user {
          id
          username
          profileImage
        }
        player {
          id
          name
          team {
            id
            abbreviation
          }
          position
        }
        title
        body
        source
        likes {
          id
          user {
            id
            username
          }
        }
        shares {
          id
          user {
            id
            username
          }
        }
        creationTime
      }
    }
  `;

export const note = gql
  `
    query note($id: String!) {
      note(id: $id) {
        id
        user {
          id
          username
          profileImage
        }
        player {
          id
          name
          team {
            id
            abbreviation
          }
          position
        }
        title
        body
        source
        likes {
          id
          user {
            id
            username
          }
        }
        shares {
          id
          user {
            id
            username
          }
        }
        creationTime
      }
    }
  `;


export const likes = gql
  `
    query likes($user: String!) {
      likes(user: $user) {
        id
        note {
          user {
            id
            username
            profileImage
          }
          player {
            id
            name
            team {
              id
              abbreviation
            }
            position
          }
          title
          body
          source
          likes {
            id
            user {
              id
              username
            }
          }
          shares {
            id
            user {
              id
              username
            }
          }
          creationTime
        }
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
          id
          city
          abbreviation
          nickname
        }
      }
    }
  `;
