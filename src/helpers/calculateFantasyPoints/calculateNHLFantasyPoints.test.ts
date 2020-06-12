import {
    calculateDraftKingsGoaliePoints, calculateDraftKingsSkaterPoints,
    calculateFanduelGoaliePoints,
    calculateFanduelSkaterPoints
} from "./calculateNHLFantasyPoints";

describe('calculateNBAFantasyPoints', () => {
    describe('goalie case', () => {
        const statObject = {
            goalsAgainst: {
                totalAgainst: 69
            },
            isOTLossGoaltender: false,
            isShutout: true,
            isWinningGoaltender: true,
            saves: 69
        };
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelGoaliePoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(-200.8)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsGoaliePoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(-180.2)
            });
        });
    });

    describe('skater case', () => {
        const statObject = {
            assists: {
                powerPlay: 60,
                shortHanded: 9,
                total: 69
            },
            blocks: 69,
            goals: {
                powerPlay: 60,
                shortHanded: 9,
                total: 69
            },
            shootout: {
                goals: 69
            },
            shotsOnGoal: 69
        };
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelSkaterPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(1696.8)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsSkaterPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(1276.2)
            });
        });
    });
});