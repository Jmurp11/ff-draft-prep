import { Team } from "./team";

export class Player {
    id: string;
    firstName: string;
    lastName: string;
    team: Team;
    position: string;
    rank: number;
    tier: number;
    bye: number;

    constructor(id: string, firstName: string, lastName: string, 
        team: Team, position: string, rank: number, tier: number, bye: number) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.team = team;
            this.position = position;
            this.rank = rank;
            this.tier = tier;
            this.bye = bye;
    }
}