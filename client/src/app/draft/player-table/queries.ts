import gql from 'graphql-tag';

export const players = gql
  `
  query players($user: String!) {
    players(user: $user) {
      id
      firstName
      lastName
      name
      team {
        city
        nickname
        abbreviation
        imageUrl
      }
      stats {
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
      rank {
        tier
        position
        adp
        rank
      }
      defaultRank{
        tier
        position
        adp
        rank
      }
      projection {
        completions
        attempts
        passYards
        passTd
        interception
        carries
        rushTd
        rushYards
        fumbles
        receptions
        receivingYards
        receivingTd
        fantasyPoints
      }
      position
      depthChartPos
    }
  }
`;
