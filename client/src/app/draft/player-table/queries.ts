import gql from 'graphql-tag';

export const projections = gql
  `
  query {
    projections {
      player {
        id
        initialName
        firstName
        lastName
        name
        team {
          team {
            city
            nickname
            abbreviation
            imageUrl
          }
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
        tier
        adp
        position
        rank
      }
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
  }
`;