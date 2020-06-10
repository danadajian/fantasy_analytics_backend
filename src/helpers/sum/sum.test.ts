import {sum} from './sum'

describe('sum', () => {
    let result: any;

    beforeEach(() => {
        result = sum(5.7, 0.9, 2)
    });

    it('should return expected result', () => {
        expect(result).toEqual(8.6)
    });
});