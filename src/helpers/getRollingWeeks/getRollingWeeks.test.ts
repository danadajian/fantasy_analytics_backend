import {getRollingWeeks} from "./getRollingWeeks";

describe('getRollingWeekss', () => {
    describe('offseason case', () => {
        let result: any;
        const currentWeek = 0;

        beforeEach(() => {
            result = getRollingWeeks(currentWeek)
        })

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    describe('start of season case', () => {
        let result: any;
        const currentWeek = 1;

        beforeEach(() => {
            result = getRollingWeeks(currentWeek)
        })

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    describe('mid-season case: 1 < currentWeek < NUMBER_OF_GAMES_FOR_ROLLING_AVG', () => {
        let result: any;
        const currentWeek = 3;

        beforeEach(() => {
            result = getRollingWeeks(currentWeek)
        })

        it('should return expected result', () => {
            expect(result).toEqual([1, 2])
        });
    });

    describe('mid-season case: currentWeek >= NUMBER_OF_GAMES_FOR_ROLLING_AVG', () => {
        let result: any;
        const currentWeek = 8;

        beforeEach(() => {
            result = getRollingWeeks(currentWeek)
        })

        it('should return expected result', () => {
            expect(result).toEqual([3, 4, 5, 6, 7])
        });
    });
});