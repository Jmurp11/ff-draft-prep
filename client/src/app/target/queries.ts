import gql from 'graphql-tag';

export const targets = gql
  `
    query targets($user: String!) {
      targets(user: $user) {
        id
        user {
          id
        }
        player {
          id
          initialName
          team {
            team {
              abbreviation
            }
          }
          position
        }
        round
      }
    }
  `;

export const createTarget = gql
  `
    mutation createTarget($user: String!, $player: Int!, $round: Int!) {
      createTarget(
        input: { user: $user, player: $player, round: $round }
      ) {
        success {
          message
        }
        errors {
          message
        }
      }
    }
  `;

export const deleteTarget = gql
  `
    mutation deleteTarget($id: String!) {
      deleteTarget(id: $id) {
        success {
          message
        }
        errors {
          message
        }
      }
    }
  `;

