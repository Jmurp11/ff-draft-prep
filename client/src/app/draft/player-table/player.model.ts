export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  team: {
    city: string;
    nickname: string;
    abbreviation: string;
    imageUrl: string;
  };
  stats: {
    bye: number;
    rank: number;
    passRank: number;
    rushRank: number;
    pointsFor: number;
    yards: number;
    plays: number;
    yardsPerPlay: number;
    turnovers: number;
    passAttempts: number;
    passCompletions: number;
    passYards: number;
    passTd: number;
    interception: number;
    netYardsPerPass: number;
    rushAttempt: number;
    rushYards: number;
    rushTd: number;
    yardsPerRush: number;
    scorePercentage: number;
    turnoverPercentage: number;
    offensiveLineRank: number;
    runningBackSoS: number;
  };
  rank: {
    tier: string;
    position: string;
    adp: number;
    rank: number;
  };
  defaultRank: {
    tier: string;
    position: string;
    adp: number;
    rank: number;
  };
  projection: {
    completions: number;
    attempts: number;
    passYards: number;
    passTd: number;
    interception: number;
    carries: number;
    rushTd: number;
    rushYards: number;
    fumbles: number;
    receptions: number;
    receivingYards: number;
    receivingTd: number;
    fantasyPoints: number;
  };
  notes: {
    id: string;
    user: {
      id: string;
      username: string;
      profileImage: string;
    };
    player: {
      id: string;
      firstName: string;
      lastName: string;
      name: string;
      team: {
        team: {
          abbreviation: string;
        }
      }
      position: string;
    };
    title: string;
    body: string;
    source: string;
    isPrivate: boolean;
    likes: number;
    shares: number;
    creationTime: string;
  }
  position: string;
  depthChartPos: number;
  selected: boolean;
}
