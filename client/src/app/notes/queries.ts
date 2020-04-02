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
            team {
              abbreviation
            }
          }
          position
        }
        title
        body
        source
        likes {
          username
        }
        shares {
          username
        }
        isPrivate
        creationTime
      }
    }
  `;

export const userNotes = gql
  `
    query userNotes($user: String!){
      userNotes(user: $user) {
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
        creationTime
      }
    }
  `;

export const likedNotes = gql
  `
    query likes($userId: String!){
      likes(userId: $userId) {
        note {
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
          team {
            city
            abbreviation
            nickname
          }
        }
      }
    }
  `;
