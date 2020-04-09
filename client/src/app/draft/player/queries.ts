import gql from 'graphql-tag';

export const players = gql
  `
  query players($user: String!) {
    players(user: $user) {
      id
      firstName
      lastName
      initialName
      name
      position
      depthChartPos
      team {
        id
        abbreviation
        stats {
          id
          bye
          rank
          passRank
          rushRank
          pointsFor
          yards
          plays
          yardsPerPlay
          turnovers
          passAttempts
          passCompletions
          passYards
          passTd
          interception
          netYardsPerPass
          rushAttempt
          rushYards
          rushTd
          yardsPerRush
          scorePercentage
          turnoverPercentage
          offensiveLineRank
          runningBackSoS
        }
      }
      notes {
        id
        user {
          id
          username
          profileImage
        }
        player {
          id
          name
          position
          depthChartPos
          team {
            id
            abbreviation
          }
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
      projection {
        id
        completions
        attempts
        passYards
        passTd
        interception
        carries
        rushYards
        rushTd
        fumbles
        receptions
        receivingYards
        receivingTd
        fantasyPoints
      }
      defaultRank {
        id
        rank
      }
      rank {
        id
        rank
      }
    }
  }
`;

export const player = gql
  `
  query player($id: String!) {
    player(id: $id) {
      id
      firstName
      lastName
      initialName
      name
      position
      depthChartPos
      team {
        id
        abbreviation
        stats {
          id
          bye
          rank
          passRank
          rushRank
          pointsFor
          yards
          plays
          yardsPerPlay
          turnovers
          passAttempts
          passCompletions
          passYards
          passTd
          interception
          netYardsPerPass
          rushAttempt
          rushYards
          rushTd
          yardsPerRush
          scorePercentage
          turnoverPercentage
          offensiveLineRank
          runningBackSoS
        }
      }
      notes {
        id
        user {
          id
          username
          profileImage
        }
        player {
          id
          name
          position
          depthChartPos
          team {
            id
            abbreviation
          }
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
      projection {
        id
        completions
        attempts
        passYards
        passTd
        interception
        carries
        rushYards
        rushTd
        fumbles
        receptions
        receivingYards
        receivingTd
        fantasyPoints
      }
      defaultRank {
        id
        rank
      }
      rank {
        id
        rank
      }
    }
  }
`;
