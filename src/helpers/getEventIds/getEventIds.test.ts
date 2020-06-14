import {getEventIds} from "./getEventIds";
import {callApi} from "../callApi/callApi";

const mockMLBScheduleResponse = require('../../fixtures/mlbScheduleResponse.json');
const mockNFLScheduleResponse = require('../../fixtures/nflScheduleResponse.json');

jest.mock('../callApi/callApi');

describe('getEventIdsByDate', () => {
    describe('non-nfl case', () => {
        const sport = 'mlb';
        const season = 'season';
        const date = 'date';
        const week = 'week';

        describe('success case', () => {
            let result: any;

            beforeEach(async () => {
                (callApi as jest.Mock).mockResolvedValue(mockMLBScheduleResponse);
                result = await getEventIds(sport, season, date, week)
            });

            it('should call callApi with correct params', () => {
                expect(callApi).toHaveBeenCalledWith(`stats/baseball/mlb/events/`, `&season=${season}&date=${date}`)
            });

            it('should return expected result', () => {
                expect(result).toEqual([
                    2103976,
                    2103415,
                    2104169,
                    2104235,
                    2104352,
                    2104675,
                    2105768,
                    2105533
                ])
            });
        });

        describe('error case', () => {
            let result: any;

            beforeEach(async () => {
                (callApi as jest.Mock).mockResolvedValue({an: 'error'});
                result = await getEventIds(sport, season, date, week)
            });

            it('should call callApi with correct params', () => {
                expect(callApi).toHaveBeenCalledWith(`stats/baseball/mlb/events/`, `&season=${season}&date=${date}`)
            });

            it('should return expected result', () => {
                expect(result).toEqual([])
            });
        });

        afterEach(() => {
            jest.clearAllMocks()
        })
    });

    describe('nfl case', () => {
        const sport = 'nfl';
        const season = 'season';
        const date = 'date';
        const week = 'week';

        describe('success case', () => {
            let result: any;

            beforeEach(async () => {
                (callApi as jest.Mock).mockResolvedValue(mockNFLScheduleResponse);
                result = await getEventIds(sport, season, date, week)
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
                result = await getEventIds(sport, season, date, week)
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
});