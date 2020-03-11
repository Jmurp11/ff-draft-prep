export interface Target {
  targets: {
    id: string;
    user: {
      id: string;
    };
    player: {
      id: number;
      name: string;
      team: {
        team: {
          abbreviation: string;
        };
      };
      position: string;
    };
    round: number;
  };
}