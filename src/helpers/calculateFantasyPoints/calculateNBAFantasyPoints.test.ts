import {calculateDraftKingsPoints, calculateFanduelPoints} from "./calculateNBAFantasyPoints";

describe('calculateNBAFantasyPoints', () => {
    const statObject = {
        assists: 69,
        blockedShots: 69,
        fieldGoals: {
            made: 69
        },
        freeThrows: {
            made: 69
        },
        points: 69,
        rebounds: {
            total: 69
        },
        steals: 69,
        threePointFieldGoals: {
            made: 69
        },
        turnovers: 69
    };
    describe('fanduel case', () => {
        let result: any;

        beforeEach(() => {
            result = calculateFanduelPoints(statObject)
        });

        it('should return expected result', () => {
            expect(result).toEqual(945.3)
        });
    });

    describe('draftkings case', () => {
        let result: any;

        beforeEach(() => {
            result = calculateDraftKingsPoints(statObject)
        });

        it('should return expected result', () => {
            expect(result).toEqual(537.75)
        });
    });
});