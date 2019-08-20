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
    playerById: IPlayer | null;
    players: Array<IPlayer | null> | null;
    projections: Array<IProjection | null> | null;
    projectionsByPlatform: Array<IProjection | null> | null;
    projectionsByPlayer: Array<IProjection | null> | null;
  }

  interface ITeamByIdOnQueryArguments {
    id?: string | null;
  }

  interface ITeamByAbbreviationOnQueryArguments {
    abbreviation?: string | null;
  }

  interface IPlayerByIdOnQueryArguments {
    id?: string | null;
  }

  interface IProjectionsByPlatformOnQueryArguments {
    platform?: string | null;
  }

  interface IProjectionsByPlayerOnQueryArguments {
    player?: string | null;
  }

  interface ITeam {
    __typename: 'Team';
    id: number | null;
    city: string | null;
    nickname: string | null;
    abbreviation: string | null;
  }

  interface IPlayer {
    __typename: 'Player';
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    team: ITeam | null;
    position: string | null;
    rank: number | null;
    tier: number | null;
    bye: number | null;
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
    targets: number | null;
    receptions: number | null;
    receivingYards: number | null;
    receivingTd: number | null;
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
  }

  interface ICreatePlayerOnMutationArguments {
    firstName: string;
    lastName: string;
    team: number;
    position: string;
    rank: number;
    tier: number;
    bye: number;
  }

  interface IAddProjectionOnMutationArguments {
    player: number;
    platform: string;
    completions: number;
    attempts: number;
    passYards: number;
    passTd: number;
    interception: number;
    carries: number;
    rushYards: number;
    rushTd: number;
    fumbles: number;
    targets: number;
    receptions: number;
    receivingYards: number;
    receivingTd: number;
  }
}

// tslint:enable
