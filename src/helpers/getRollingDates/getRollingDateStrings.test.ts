import {getRollingDateStrings} from "./getRollingDateStrings";

describe('getRollingDates', () => {
    let result: any;
    const date = new Date(2020, 3, 1); // month is 1 less than expected

    beforeEach(() => {
        result = getRollingDateStrings(date)
    })

    it('should return expected result', () => {
        expect(result).toEqual([
            '2020-03-31',
            '2020-03-30',
            '2020-03-29',
            '2020-03-28',
            '2020-03-27'
        ])
    });
});