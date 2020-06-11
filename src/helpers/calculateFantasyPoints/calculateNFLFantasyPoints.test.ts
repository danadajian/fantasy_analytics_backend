import {
    calculateDefensePoints,
    calculateDraftKingsPassingPoints, calculateDraftKingsReceivingPoints, calculateDraftKingsRushingPoints,
    calculateFanduelPassingPoints, calculateFanduelReceivingPoints,
    calculateFanduelRushingPoints, calculateReturnPoints, calculateTwoPointConversionPoints
} from "./calculateNFLFantasyPoints";

describe('calculateNFLFantasyPoints', () => {
    const statObject = {
        yards: 69,
        touchdowns: 69,
        receptions: 69,
        interceptions: 69,
        fumblesLost: 69,
        twoPointConversions: 69,
        sacks: 69,
        fumbleRecoveries: 69,
        safeties: 69,
        pointsAllowed: 69
    };
    describe('rushing', () => {
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelRushingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(282.9)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsRushingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(351.9)
            });
        });
    });

    describe('passing', () => {
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelPassingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(71.76)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsPassingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(140.76)
            });
        });
    });

    describe('receiving', () => {
        describe('fanduel case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateFanduelReceivingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(317.4)
            });
        });

        describe('draftkings case', () => {
            let result: any;

            beforeEach(() => {
                result = calculateDraftKingsReceivingPoints(statObject)
            });

            it('should return expected result', () => {
                expect(result).toEqual(420.9)
            });
        });
    });

    describe('return', () => {
        let result: any;

        beforeEach(() => {
            result = calculateReturnPoints(statObject)
        });

        it('should return expected result', () => {
            expect(result).toEqual(414)
        });
    });

    describe('two point conversion', () => {
        let result: any;

        beforeEach(() => {
            result = calculateTwoPointConversionPoints(statObject)
        });

        it('should return expected result', () => {
            expect(result).toEqual(138)
        });
    });

    describe('defense', () => {
        let result: any;

        beforeEach(() => {
            result = calculateDefensePoints(statObject)
        });

        it('should return expected result', () => {
            expect(result).toEqual(893)
        });
    });
});