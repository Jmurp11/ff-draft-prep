export class Team {
    id: string;
    city: string;
    nickname: string;
    abbreviation: string;

    constructor(id: string, city: string, nickname: string, abbreviation: string) {
            this.id = id;
            this.city = city;
            this.nickname = nickname;
            this.abbreviation = abbreviation;
    }
}