import gql from 'graphql-tag';

export const user = gql
  `
    query userByUsername($username: String!) {
      userByUsername(username: $username) {
        id
        username
        email
        profileImage
      }
    }
`;

export const users = gql
  `
    query {
      users {
        id
        username
        email
        profileImage
      }
    }
`;

export const meQuery = gql
  `
  query {
    me {
      id
      username
      email
      profileImage
      targets {
        id
        player {
          id
          initialName
          team {
            id
            abbreviation
          }
          position
        }
        round
      }
    }
  }
`;