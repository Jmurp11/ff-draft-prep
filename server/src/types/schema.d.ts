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
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
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
