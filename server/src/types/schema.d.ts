// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    teamById: ITeam | null;
    teamByAbbreviation: ITeam | null;
    teams: Array<ITeam | null> | null;
    playerById: Array<IPlayer | null> | null;
    players: Array<IPlayer | null> | null;
    projections: Array<IProjection | null> | null;
    projectionsByPlayer: Array<IProjection | null> | null;
  }

  interface ITeamByIdOnQueryArguments {
    id?: number | null;
  }

  interface ITeamByAbbreviationOnQueryArguments {
    abbreviation?: string | null;
  }

  interface IPlayerByIdOnQueryArguments {
    id?: number | null;
  }

  interface IProjectionsByPlayerOnQueryArguments {
    player?: number | null;
  }

  interface ITeam {
    __typename: 'Team';
    id: number | null;
    city: string | null;
    nickname: string | null;
    abbreviation: string | null;
    bye: number | null;
    imageUrl: string | null;
    rank: number | null;
    passRank: number | null;
    rushRank: number | null;
    pointsFor: number | null;
    yards: number | null;
    plays: number | null;
    yardsPerPlay: number | null;
    turnovers: number | null;
    passAttempts: number | null;
    passCompletions: number | null;
    passYards: number | null;
    passTd: number | null;
    interception: number | null;
    netYardsPerPass: number | null;
    rushAttempt: number | null;
    rushYards: number | null;
    rushTd: number | null;
    yardsPerRush: number | null;
    scorePercentage: number | null;
    turnoverPercentage: number | null;
    offensiveLineRank: number | null;
    runningBackSoS: number | null;
  }

  interface IPlayer {
    __typename: 'Player';
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    team: ITeam | null;
    position: string | null;
    rank: number | null;
    tier: string | null;
  }

  interface IProjection {
    __typename: 'Projection';
    id: number | null;
    player: IPlayer | null;
    platform: string | null;
    completions: number | null;
    attempts: number | null;
    passYards: number | null;
    passTd: number | null;
    interception: number | null;
    carries: number | null;
    rushYards: number | null;
    rushTd: number | null;
    fumbles: number | null;
    receptions: number | null;
    receivingYards: number | null;
    receivingTd: number | null;
    fantasyPoints: number | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    createTeam: boolean;
    createPlayer: boolean;
    addProjection: boolean | null;
  }

  interface ICreateTeamOnMutationArguments {
    city: string;
    nickname: string;
    abbreviation: string;
    bye: number;
    imageUrl: string;
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
  }

  interface ICreatePlayerOnMutationArguments {
    firstName: string;
    lastName: string;
    team: string;
    position: string;
    rank: number;
    tier: string;
  }

  interface IAddProjectionOnMutationArguments {
    firstName: string;
    lastName: string;
    team: string;
    completions: number;
    attempts: number;
    passYards: number;
    passTd: number;
    interception: number;
    carries: number;
    rushYards: number;
    rushTd: number;
    fumbles: number;
    receptions: number;
    receivingYards: number;
    receivingTd: number;
    fantasyPoints: number;
  }
}

// tslint:enable
