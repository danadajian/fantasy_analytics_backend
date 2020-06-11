import {getEventIdsByDate} from "./getEventIdsByDate";
import {callApi} from "../helpers/callApi/callApi";

const mockMlbScheduleResponse = require('../fixtures/mlbScheduleResponse.json');

jest.mock('../helpers/callApi/callApi');

describe('getNflEventIds', () => {
    const sport = 'mlb';
    const season = 'season';
    const date = '2019-08-08';

    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockMlbScheduleResponse);
            result = await getEventIdsByDate(sport, season, date)
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
            result = await getEventIdsByDate(sport, season, date)
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