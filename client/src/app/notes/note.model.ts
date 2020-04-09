export interface Note {
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
      id: string;
      abbreviation: string;
    };
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
