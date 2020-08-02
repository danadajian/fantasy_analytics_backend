export interface FantasyData {
    DraftKings: number,
    Fanduel: number,
    name: string,
    playerId: number
}

export interface FantasyLambdaEvent {
    sport: string,
    season?: number,
    date?: string,
    week?: number
}

export interface CurrentData {
    rollingDateStrings: string[],
    rollingWeeks: number[],
    currentWeek: number,
    currentSeason: number
}