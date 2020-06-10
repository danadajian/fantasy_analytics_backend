import {getCurrentSeason} from "./index";
import {callApi} from "../callApi/callApi";

const mockSeasonResponse = require('../../fixtures/seasonResponse.json');

jest.mock('../callApi/callApi');

describe('getCurrentWeek', () => {
    describe('success case', () => {
        let result: any;
        const sport = 'nfl';

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockSeasonResponse);
            result = await getCurrentSeason(sport)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("decode/football/nfl/seasonStructure/", "")
        });

        it('should return expected result', () => {
            expect(result).toEqual(1969)
        });
    });

    describe('error case', () => {
        let result: any;
        const sport = 'nfl';

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getCurrentSeason(sport)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("decode/football/nfl/seasonStructure/", "")
        });

        it('should return expected result', () => {
            expect(result).toEqual(0)
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});