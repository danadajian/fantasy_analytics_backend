import {getRollingDateStrings} from "./getRollingDateStrings";
import {getPastDateString} from "../getPastDateString/getPastDateString";

jest.mock('../getPastDateString/getPastDateString');

(getPastDateString as jest.Mock).mockReturnValue('past date');

describe('getRollingDates', () => {
    let result: any;

    beforeEach(() => {
        result = getRollingDateStrings()
    });

    it.each([1, 2, 3, 4, 5])(
        'should call getPastDateString with correct params', (day: number) => {
            expect(getPastDateString).toHaveBeenCalledWith(day)
        }
    );

    it('should return expected result', () => {
        expect(result).toEqual([
            'past date',
            'past date',
            'past date',
            'past date',
            'past date'
        ])
    });
});