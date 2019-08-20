import { Player } from "./Player";

export class Projection {
    id: string;
    player: Player;
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

    constructor(id: string, player: Player, platform: string, 
        completions: number, attempts: number, passYards: number, 
        passTd: number, interception: number, carries: number, 
        rushYards: number, rushTd: number, fumbles: number, targets: number, 
        receptions: number, receivingYards: number, receivingTd: number) {
            this.id = id;
            this.player = player;
            this.platform = platform;
            this.completions = completions;
            this.attempts = attempts;
            this.passYards = passYards;
            this.passTd = passTd;
            this.interception = interception;
            this.carries = carries;
            this.rushYards = rushYards;
            this.rushTd = rushTd;
            this.fumbles = fumbles;
            this.targets = targets;
            this.receptions = receptions;
            this.receivingYards = receivingYards;
            this.receivingTd = receivingTd;
    }
}