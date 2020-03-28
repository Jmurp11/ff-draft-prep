export interface Note {
  id: string;
  user: {
    username: string;
    profileImage: string;
  };
  player: {
    id: number;
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
