export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  initialName: string;
  name: string;
  team: {
    id: string;
    city: string;
    nickname: string;
    fullName: string;
    abbreviation: string;
    imageUrl: string;
    stats: {
      id: number;
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
  };
  rank: {
    id: string;
    rank: number;
  };
  defaultRank: {
    id: string;
    rank: number;
  };
  projection: {
    id: string;
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
  };
  position: string;
  depthChartPos: number;
  selected: boolean;
}
