import * as rp from 'request-promise';
import request = require('request');

export class TestClient {
    url: string;
    options: {
        jar: request.CookieJar,
        withCredentials: boolean,
        json: boolean
    }

    constructor(url: string) {
        this.url = url;
        this.options = {
            jar: rp.jar(),
            withCredentials: true,
            json: true
        }
    }

    async login(email: string, password: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    mutation {
                        login(email: "${email}", password: "${password}") {
                            path
                            message
                        }
                    }
                `
            }
        });
    }

    async logout() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    mutation {
                        logout
                    }
                `
            }
        });
    }

    async me() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    {
                        me {
                            id
                            email
                        }
                    }
                `
            }
        });
    }

    async register(email: string, password: string, username: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    mutation {
                        register(email: "${email}", password: "${password}" username: "${username}") {
                            path
                            message
                        }
                    }
                `
            }
        });
    }

    async forgotPasswordChange(newPassword: string, key: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    mutation {
                        forgotPasswordChange(newPassword: "${newPassword}", key: "${key}") {
                            path
                            message
                        }
                    }
                `
            }
        });
    }

    async createTeam(city: string, nickname: string,
        abbreviation: string, bye: number, rank: number,
        passRank: number, rushRank: number, imageUrl: string, pointsFor: number,
        yards: number, plays: number, yardsPerPlay: number,
        turnovers: number, passAttempts: number,
        passCompletions: number, passYards: number,
        passTd: number, interception: number,
        netYardsPerPass: number, rushAttempt: number,
        rushYards: number, rushTd: number, yardsPerRush: number,
        scorePercentage: number, turnoverPercentage: number,
        offensiveLineRank: number, runningBackSoS: number) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    mutation {
                        createTeam(city: "${city}", nickname: "${nickname}",
                            abbreviation: "${abbreviation}", bye: ${bye}, rank: ${rank},
                            passRank: ${passRank}, rushRank: ${rushRank}, imageUrl: "${imageUrl}", pointsFor: ${pointsFor},
                            yards: ${yards}, plays: ${plays}, yardsPerPlay: ${yardsPerPlay},
                            turnovers: ${turnovers}, passAttempts: ${passAttempts},
                            passCompletions: ${passCompletions}, passYards: ${passYards},
                            passTd: ${passTd}, interception: ${interception},
                            netYardsPerPass: ${netYardsPerPass}, rushAttempt: ${rushAttempt},
                            rushYards: ${rushYards}, rushTd: ${rushTd}, yardsPerRush: ${yardsPerRush},
                            scorePercentage: ${scorePercentage}, turnoverPercentage: ${turnoverPercentage},
                            offensiveLineRank: ${offensiveLineRank}, runningBackSoS: ${runningBackSoS}) {
                            path
                            message
                        }
                    }
                `
            }
        });
    }

    async createPlayer(firstName: string, lastName: string,
        team: string, position: string, rank: number,
        adp: number, tier: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    mutation {
                        createPlayer(firstName: "${firstName}", lastName: "${lastName}",
                            team: "${team}", position: "${position}", rank: ${rank},
                            adp: ${adp}, tier: "${tier}") {
                            path
                            message
                        }
                    }
                `
            }
        });
    }

    async addProjection(firstName: string, lastName: string,
        team: string, completions: number, attempts: number,
        passYards: number, passTd: number,
        interception: number, carries: number, rushYards: number, rushTd: number,
        fumbles: number, receptions: number, receivingYards: number,
        receivingTd: number, fantasyPoints: number) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        mutation {
                            addProjection(firstName: "${firstName}", lastName: "${lastName}", team: "${team}", completions: ${completions}, attempts: ${attempts},
                                passYards: ${passYards}, passTd: ${passTd},
                                interception: ${interception}, carries: ${carries}, rushYards: ${rushYards}, rushTd: ${rushTd},
                                fumbles: ${fumbles}, receptions: ${receptions}, receivingYards: ${receivingYards},
                                receivingTd: ${receivingTd}, fantasyPoints: ${fantasyPoints}) {
                                path
                                message
                            }
                        }
                    `
            }
        });
    }

    async player(id: number) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            player(id: ${id}) {
                                id
                                firstName
                                lastName
                                team {
                                    city
                                    nickname
                                }
                                position
                                rank
                                adp
                                tier
                            }
                        }
                    `
            }
        });
    }

    async players() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            players {
                                id
                                firstName
                                lastName
                                team {
                                    city
                                    nickname
                                }
                                position
                                rank
                                adp
                                tier
                            }
                        }
                    `
            }
        });
    }

    async projections() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            projections {
                                id
                                player {
                                    firstName
                                    lastName
                                    team {
                                        city
                                        nickname
                                    }
                                }
                                platform
                                completions
                                attempts
                                passYards
                                passTd
                                interception
                                carries
                                rushYards
                                rushTd
                                fumbles
                                receptions
                                receivingYards
                                receivingTd
                                fantasyPoints
                            }
                        }
                    `
            }
        });
    }

    async projection(player: number) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            projection(player: "${player}") {
                                id
                                player
                                platform
                                completions
                                attempts
                                passYards
                                passTd
                                interception
                                carries
                                rushYards
                                rushTd
                                fumbles
                                receptions
                                receivingYards
                                receivingTd
                                fantasyPoints
                            }
                        }
                    `
            }
        });
    }

    async teams() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            teams {
                                city
                                nickname
                                abbreviation
                                bye
                                imageUrl
                                rank
                                passRank
                                rushRank
                                pointsFor
                                yards
                                plays
                                yardsPerPlay
                                turnovers
                                passAttempts
                                passCompletions
                                passYards
                                passTd
                                interception
                                netYardsPerPass
                                rushAttempt
                                rushYards
                                rushTd
                                yardsPerRush
                                scorePercentage
                                turnoverPercentage
                                offensiveLineRank
                                runningBackSoS
                            }
                        }
                    `
            }
        });
    }

    async teamByAbbreviation(abbreviation: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            teamByAbbreviation(abbreviation: "${abbreviation}") {
                                city
                                nickname
                                abbreviation
                                bye
                                imageUrl
                                rank
                                passRank
                                rushRank
                                pointsFor
                                yards
                                plays
                                yardsPerPlay
                                turnovers
                                passAttempts
                                passCompletions
                                passYards
                                passTd
                                interception
                                netYardsPerPass
                                rushAttempt
                                rushYards
                                rushTd
                                yardsPerRush
                                scorePercentage
                                turnoverPercentage
                                offensiveLineRank
                                runningBackSoS
                            }
                        }
                    `
            }
        });
    }

    async team(id: number) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        query {
                            team(id: ${id}) {
                                city
                                nickname
                                abbreviation
                                bye
                                imageUrl
                                rank
                                passRank
                                rushRank
                                pointsFor
                                yards
                                plays
                                yardsPerPlay
                                turnovers
                                passAttempts
                                passCompletions
                                passYards
                                passTd
                                interception
                                netYardsPerPass
                                rushAttempt
                                rushYards
                                rushTd
                                yardsPerRush
                                scorePercentage
                                turnoverPercentage
                                offensiveLineRank
                                runningBackSoS
                            }
                        }
                    `
            }
        });
    }

    async users() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        users{
                            id
                            email
                            password
                            username
                        }
                    }
                `
            }
        });
    }

    async user(id: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        user(id: "${id}") {
                            id
                            email
                            password
                            username
                        }
                    }
                `
            }
        });
    }

    async userByEmail(email: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        userByEmail(email: "${email}") {
                            id
                            email
                            password
                            username
                        }
                    }
                `
            }
        });
    }

    async userByUsername(username: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        userByUsername(username: "${username}") {
                            id
                            username
                            password
                            username
                        }
                    }
                `
            }
        });
    }

    async addNote(user: string, player: number, date: string, title: string,
        body: string, source: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        mutation {
                            addNote(user: "${user}", player: ${player}, date: "${date}", title: "${title}",
                            body: "${body}", source: "${source}") {
                                path
                                message
                            }
                        }
                    `
            }
        });
    }

    async editNote(id: string, user: string, player: number, date: string, title: string,
        body: string, source: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        mutation {
                            editNote(id: "${id}", user: "${user}", player: ${player}, date: "${date}", title: "${title}",
                            body: "${body}", source: "${source}") {
                                path
                                message
                            }
                        }
                    `
            }
        });
    }

    async deleteNote(id: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        mutation {
                            deleteNote(id: "${id}") {
                                path
                                message
                            }
                        }
                    `
            }
        });
    }

    async note(id: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        note(id: "${id}") {
                            id
                            user {
                                id
                            }
                            player {
                                id
                            }
                            date
                            title
                            body
                            source
                        }
                    }
                `
            }
        });
    }

    async notes() {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        notes {
                            id
                            user {
                                id
                            }
                            player {
                                id
                            }
                            date
                            title
                            body
                            source
                        }
                    }
                `
            }
        });
    }

    async notesByUser(user: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        notesByUser(user: "${user}") {
                            id
                            user {
                                id
                            }
                            player {
                                id
                            }
                            date
                            title
                            body
                            source
                        }
                    }
                `
            }
        });
    }

    async createDraft(user: string,
        date: string,
        type: string,
        numberOfTeams: number,
        title: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        mutation {
                            createDraft(
                                user: "${user}",
                                date: "${date}",
                                type: "${type}",
                                numberOfTeams: ${numberOfTeams},
                                title: "${title}"
                            ) {
                                path
                                message
                            }
                        }
                    `
            }
        });
    }

    async drafts(user: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        drafts(user: "${user}") {
                            id
                            user {
                                id
                                username
                            }
                            date
                            type
                            numberOfTeams
                            title
                        }
                    }
                `
            }
        });
    }

    async draft(id: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        draft(id: "${id}") {
                            id
                            user {
                                id
                                username
                            }
                            date
                            type
                            numberOfTeams
                            title
                        }
                    }
                `
            }
        });
    }

    async createDraftPick(
        draft: string,
        player: number,
        picked: number
    ) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                        mutation {
                            createDraftPick(
                                draft: "${draft}",
                                player: ${player},
                                picked: ${picked}
                            ) {
                                path
                                message
                            }
                        }
                    `
            }
        });
    }

    async draftPicks(draft: string) {
        return rp.post(this.url, {
            ...this.options,
            body: {
                query: `
                    query {
                        draftPicks(draft: "${draft}") {
                            id
                            draft {
                                id
                                user {
                                    username
                                }
                                type
                            }
                            player {
                                id
                                firstName
                                lastName
                                team {
                                    abbreviation
                                }
                            }
                            picked
                        }
                    }
                `
            }
        });
    }
}