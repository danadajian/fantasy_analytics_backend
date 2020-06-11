import {
    calculateDraftKingsBattingPoints, calculateDraftKingsPitchingPoints, calculateFanduelBattingPoints,
    calculateFanduelPitchingPoints
} from "./calculateMLBFantasyPoints";

describe('calculateMLBFantasyPoints', () => {
    describe('batting', () => {
        const statObject = {
            doubles: {
                game: 69
            },
            hitByPitch: {
                game: 69
            },
            hits: {
                game: 276
            },
            homeRuns: {
                game: 69
            },
            isWinningPitcher: true,
            runs: {
                game: 69
            },
            runsBattedIn: {
                game: 69
            },
            stolenBases: {
                game: 69
            },
            triples: {
                game: 69
            },
            walks: {
                game: 69
            }
        };
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelBattingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(3360.3)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsBattingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(2691)
            });
        });
    });

    describe('pitching', () => {
        const statObject = {
            earnedRuns: {
                game: 69
            },
            hitBatsmen: {
                game: 69
            },
            hits: {
                game: 69
            },
            inningsPitched: {
                game: '69.2'
            },
            isCompleteGame: true,
            isShutout: false,
            isWinningPitcher: true,
            strikeouts: {
                game: 69
            },
            player: {
                playerId: 548637
            },
            walks: {
                game: 69
            },
        };
        const pitchingStarterObject = {
            "earnedRunAverage": "4.05",
            "losses": 2,
            "player": {
                "firstName": "Domingo",
                "lastName": "German",
                "playerId": 548637,
                "uniform": "55"
            },
            "type": {
                "name": "starter",
                "typeId": 1
            },
            "wins": 15
        };
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelPitchingPoints(statObject, pitchingStarterObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(215)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsPitchingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(39.05)
            });
        });
    });
});