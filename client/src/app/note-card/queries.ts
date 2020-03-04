import gql from 'graphql-tag';

export const addNote = gql
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
