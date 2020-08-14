export type StatObject = {
    player: {
        playerId: number,
        firstName: string,
        lastName: string
    }
}

export type FantasyData = {
    DraftKings: number,
    Fanduel: number,
    name: string,
    playerId: number
}

export type RecentFantasyData = {
    date?: string,
    week?: number,
    fantasyData: FantasyData[]
}

export type FantasyLambdaEvent = {
    sport: string,
    season?: number,
    date?: string,
    week?: number
}

export type CurrentData = {
    rollingDateStrings: string[],
    rollingWeeks: number[],
    currentWeek: number,
    currentSeason: number
}