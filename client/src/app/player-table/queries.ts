import gql from 'graphql-tag';

export const projections = gql
  `
  query {
    projections {
      player {
        firstName
        lastName
        team {
          city
          nickname
          abbreviation
          bye
          imageUrl
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
