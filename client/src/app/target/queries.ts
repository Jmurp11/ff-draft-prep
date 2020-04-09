import gql from 'graphql-tag';

export const createTarget = gql
  `
    mutation createTarget($user: String!, $player: String!, $round: Float!) {
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

