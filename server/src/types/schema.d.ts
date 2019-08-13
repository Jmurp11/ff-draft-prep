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
    playerById: IPlayer | null;
    players: Array<IPlayer | null> | null;
    projections: Array<IProjection | null> | null;
    projectionsByPlatform: Array<IProjection | null> | null;
    projectionsByPlayer: Array<IProjection | null> | null;
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

  interface IPlayer {
    __typename: 'Player';
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    team: string | null;
    position: string | null;
  }

  interface IProjection {
    __typename: 'Projection';
    id: string | null;
    player: string | null;
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
    createPlayer: boolean;
    addProjection: boolean | null;
  }

  interface ICreatePlayerOnMutationArguments {
    firstName: string;
    lastName: string;
    team: string;
    position: string;
  }

  interface IAddProjectionOnMutationArguments {
    player: string;
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
