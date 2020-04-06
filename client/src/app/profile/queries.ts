import gql from 'graphql-tag';

export const userByUsername = gql
  `
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      email
      username
      profileImage
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
          }
        }
        shares {
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
        }
        isPrivate
        creationTime
      }
    }
  }
`;
