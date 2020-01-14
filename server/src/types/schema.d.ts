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
    me: IUser | null;
    message: IMessage | null;
    messages: Array<IMessage | null> | null;
    messagesByUser: Array<IMessage | null> | null;
    note: INote | null;
    notes: Array<INote | null> | null;
    notesByUser: Array<INote | null> | null;
    player: Array<IPlayer | null> | null;
    players: Array<IPlayer | null> | null;
    projections: Array<IProjection | null> | null;
    projection: Array<IProjection | null> | null;
    team: ITeam | null;
    teamByAbbreviation: ITeam | null;
    teams: Array<ITeam | null> | null;
    thread: IThread | null;
    threads: Array<IThread | null> | null;
    threadsByUser: Array<IThread | null> | null;
    users: Array<IUser | null> | null;
    user: IUser | null;
    userByUsername: IUser | null;
    userByEmail: IUser | null;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IMessageOnQueryArguments {
    id?: string | null;
  }

  interface IMessagesOnQueryArguments {
    thread?: string | null;
  }

  interface IMessagesByUserOnQueryArguments {
    author?: string | null;
  }

  interface INoteOnQueryArguments {
    id?: string | null;
  }

  interface INotesByUserOnQueryArguments {
    user?: string | null;
  }

  interface IPlayerOnQueryArguments {
    id?: number | null;
  }

  interface IProjectionOnQueryArguments {
    player?: number | null;
  }

  interface ITeamOnQueryArguments {
    id?: number | null;
  }

  interface ITeamByAbbreviationOnQueryArguments {
    abbreviation?: string | null;
  }

  interface IThreadOnQueryArguments {
    id?: string | null;
  }

  interface IThreadsByUserOnQueryArguments {
    creator?: string | null;
  }

  interface IUserOnQueryArguments {
    id?: string | null;
  }

  interface IUserByUsernameOnQueryArguments {
    username?: string | null;
  }

  interface IUserByEmailOnQueryArguments {
    email?: string | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
    password: string | null;
    username: string | null;
    confirmed: boolean | null;
    forgotPasswordLock: boolean | null;
  }

  interface IMessage {
    __typename: 'Message';
    id: string | null;
    author: IUser | null;
    thread: IThread | null;
    dateCreated: string | null;
    body: string | null;
  }

  interface IThread {
    __typename: 'Thread';
    id: string | null;
    creator: IUser | null;
    dateCreated: string | null;
    title: string | null;
    messages: Array<IMessage | null> | null;
  }

  interface INote {
    __typename: 'Note';
    id: string | null;
    user: IUser | null;
    player: IPlayer | null;
    date: string | null;
    title: string | null;
    body: string | null;
    source: string | null;
  }

  interface IPlayer {
    __typename: 'Player';
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    team: ITeam | null;
    position: string | null;
    rank: number | null;
    adp: number | null;
    tier: string | null;
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
    createMessage: Array<IError> | null;
    deleteMessage: Array<IError> | null;
    addNote: Array<IError> | null;
    editNote: Array<IError> | null;
    deleteNote: Array<IError> | null;
    createPlayer: Array<IError> | null;
    addProjection: Array<IError> | null;
    createTeam: Array<IError> | null;
    createThread: Array<IError> | null;
    deleteThread: Array<IError> | null;
    register: Array<IError> | null;
    login: Array<IError> | null;
    logout: boolean | null;
    sendForgotPasswordEmail: Array<IError> | null;
    forgotPasswordChange: Array<IError> | null;
    editUserEmail: Array<IError> | null;
  }

  interface ICreateMessageOnMutationArguments {
    author: string;
    thread: string;
    dateCreated: string;
    body: string;
  }

  interface IDeleteMessageOnMutationArguments {
    id: string;
  }

  interface IAddNoteOnMutationArguments {
    user: string;
    player: number;
    date: string;
    title: string;
    body: string;
    source: string;
  }

  interface IEditNoteOnMutationArguments {
    id: string;
    user: string;
    player: number;
    date: string;
    title: string;
    body: string;
    source: string;
  }

  interface IDeleteNoteOnMutationArguments {
    id: string;
  }

  interface ICreatePlayerOnMutationArguments {
    firstName: string;
    lastName: string;
    team: string;
    position: string;
    rank: number;
    adp: number;
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

  interface ICreateThreadOnMutationArguments {
    creator: string;
    dateCreated: string;
    title: string;
  }

  interface IDeleteThreadOnMutationArguments {
    id: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
    username: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface ISendForgotPasswordEmailOnMutationArguments {
    email: string;
  }

  interface IForgotPasswordChangeOnMutationArguments {
    newPassword: string;
    key: string;
  }

  interface IEditUserEmailOnMutationArguments {
    userId: string;
    email: string;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }
}

// tslint:enable
