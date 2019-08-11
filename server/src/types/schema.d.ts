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
    hello: string;
    getPlayerById: IPlayer | null;
    getPlayers: Array<IPlayer | null> | null;
    getProjections: Array<IProjection | null> | null;
    getProjectionsByPlatform: Array<IProjection | null> | null;
    getProjectionsByPlayer: Array<IProjection | null> | null;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IGetPlayerByIdOnQueryArguments {
    id?: string | null;
  }

  interface IGetProjectionsByPlatformOnQueryArguments {
    platform?: string | null;
  }

  interface IGetProjectionsByPlayerOnQueryArguments {
    playerId?: string | null;
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
    playerId: string | null;
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
    playerId: string;
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
