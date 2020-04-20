export interface User {
  id: string;
  username: string;
  profileImage: string;
  creationTime: Date;
  targets: {
    player: {
      initialName: string;
      position: string;
      team: {
        abbreviation: string;
      }
    }
    round: number;
  };
}

