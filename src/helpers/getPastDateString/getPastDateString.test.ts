import {getPastDateString} from "./getPastDateString";
import * as moment from "moment-timezone";

jest.mock('moment-timezone');

const subtract = jest.fn(() => ({
    format: jest.fn(() => '2020-04-20')
}));
(moment as any).mockImplementation(() => ({
    tz: jest.fn(() => ({
        subtract
    }))
}));

describe('getPastDateString', () => {
    let result: any;

    beforeEach(() => {
        result = getPastDateString(69)
    });

    it('should call subtract with correct params', () => {
        expect(subtract).toHaveBeenCalledWith(69, 'days')
    });

    it('should return expected result', () => {
        expect(result).toEqual('2020-04-20')
    });
})