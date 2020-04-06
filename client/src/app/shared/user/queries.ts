import gql from 'graphql-tag';

export const user = gql
  `
    query userByUsername($username: String!) {
      userByUsername(username: $username) {
        id
        username
        profileImage
        notes {
          id
          title
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
          body
          source
          creationTime
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
        }
        likes {
          note {
            id
            title
            user {
              id
              username
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
            body
            source
            creationTime
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
          }
        }
        shares {
          note {
            id
            title
            user {
              id
              username
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
            body
            source
            creationTime
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
          }
        }
        targets {
          player {
            initialName
            position
            team {
              abbreviation
            }
          }
          round
        }
      }
    }
`;

export const meQuery = gql
  `
    query {
      me {
        id
        username
        profileImage
        notes {
          id
          title
          body
          source
          creationTime
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
        }
        likes {
          note {
            id
            title
            user {
              id
              username
              profileImage
            }
            body
            source
            creationTime
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
          }
        }
        shares {
          note {
            id
            title
            user {
              id
              username
              profileImage
            }
            body
            source
            creationTime
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
          }
        }
        targets {
          player {
            initialName
            team {
              abbreviation
            }
          }
          round
        }
      }
    }
`;
