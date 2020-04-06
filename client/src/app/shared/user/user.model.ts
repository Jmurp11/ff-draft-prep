export interface User {
  id: string;
  username: string;
  profileImage: string;
  notes: {
    id: string;
    title: string;
    user: {
      id: string;
      username: string;
    };
    body: string;
    source: string;
    creationTime: string;
    likes: {
      user: {
        username: string;
      };
    };
    shares: {
      user: {
        username: string;
      };
    };
  };
  likes: {
    note: {
      id: string;
      title: string;
      user: {
        id: string;
        username: string;
        profileImage: string;
      };
      body: string;
      source: string;
      creationTime: string;
      likes: {
        user: {
          username: string;
        };
      };
      shares: {
        user: {
          username: string;
        };
      };
    };
    shares: {
      note: {
        id: string;
        title: string;
        user: {
          id: string;
          username: string;
          profileImage: string;
        };
        body: string;
        source: string;
        creationTime: string;
        likes: {
          user: {
            username: string;
          };
        };
        shares: {
          user: {
            username: string;
          };
        };
      };
    };
  };
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

