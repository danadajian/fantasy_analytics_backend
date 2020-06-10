import {getCurrentData} from "./index";
import {getCurrentWeek} from "../helpers/getCurrentWeek";
import {getCurrentSeason} from "../helpers/getCurrentSeason";

jest.mock('../helpers/getCurrentWeek');
jest.mock('../helpers/getCurrentSeason');

(getCurrentWeek as jest.Mock).mockResolvedValue(69);
(getCurrentSeason as jest.Mock).mockResolvedValue(1969);

describe('getCurrentData', () => {
    let result: any;
    const sport = 'sport';

    beforeEach(async () => {
        result = await getCurrentData(sport)
    });

    it('should call getCurrentWeek with correct params', () => {
        expect(getCurrentWeek).toHaveBeenCalledWith(sport)
    });

    it('should call getCurrentSeason with correct params', () => {
        expect(getCurrentSeason).toHaveBeenCalledWith(sport)
    });

    it('should return expected result', function () {
        expect(result).toEqual({
            currentWeek: 69,
            currentSeason: 1969
        })
    });
});