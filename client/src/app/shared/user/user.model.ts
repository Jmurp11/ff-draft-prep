export interface User {
  id: string;
  username: string;
  profileImage: string;
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

