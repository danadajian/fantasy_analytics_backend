import {getCurrentWeek} from "./index";
import {callApi} from "../callApi/callApi";

const mockEventsResponse = require('../../fixtures/eventsResponse.json');

jest.mock('../callApi/callApi');

describe('getCurrentWeek', () => {
    describe('success case', () => {
        let result: any;
        const sport = 'nfl';

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockEventsResponse);
            result = await getCurrentWeek(sport)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/football/nfl/events/", "")
        });

        it('should return expected result', () => {
            expect(result).toEqual(1)
        });
    });

    describe('error case', () => {
        let result: any;
        const sport = 'nfl';

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getCurrentWeek(sport)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/football/nfl/events/", "")
        });

        it('should return expected result', () => {
            expect(result).toEqual(0)
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});