import {getNflEventIds} from "./getNflEventIds";
import {callApi} from "../callApi/callApi";

const mockNflScheduleResponse = require('../../fixtures/nflScheduleResponse.json');

jest.mock('../callApi/callApi');

describe('getNflEventIds', () => {
    const week = 'week';
    const season = 'season';

    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockNflScheduleResponse);
            result = await getNflEventIds(week, season)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith(`stats/football/nfl/events/`, `&season=${season}&week=${week}`)
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                2142040,
                2142064,
                2142044,
                2142048,
                2142053,
                2142057,
                2142072,
                2142076,
                2142082,
                2142086,
                2142091,
                2142101,
                2142107,
                2142112,
                2142117,
                2142124
            ])
        });
    });

    describe('error case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getNflEventIds(week, season)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith(`stats/football/nfl/events/`, `&season=${season}&week=${week}`)
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});