import {getCurrentData} from "./index";
import {getRollingDateStrings} from "../helpers/getRollingDateStrings/getRollingDateStrings";
import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";
import {getCurrentSeason} from "../helpers/getCurrentSeason/getCurrentSeason";
import {getRollingWeeks} from "../helpers/getRollingWeeks/getRollingWeeks";

jest.mock('../helpers/getRollingDateStrings/getRollingDateStrings');
jest.mock('../helpers/getRollingWeeks/getRollingWeeks');
jest.mock('../helpers/getCurrentWeek/getCurrentWeek');
jest.mock('../helpers/getCurrentSeason/getCurrentSeason');

(getRollingDateStrings as jest.Mock).mockResolvedValue(['date1', 'date2']);
(getRollingWeeks as jest.Mock).mockResolvedValue([69, 420]);
(getCurrentWeek as jest.Mock).mockResolvedValue(69);
(getCurrentSeason as jest.Mock).mockResolvedValue(1969);

describe('getCurrentData', () => {
    let result: any;
    const sport = 'sport';
    const event = {sport};

    beforeEach(async () => {
        result = await getCurrentData(event)
    });

    it('should call getCurrentWeek with correct params', () => {
        expect(getCurrentWeek).toHaveBeenCalledWith(sport)
    });

    it('should call getRollingDateStrings with correct params', () => {
        expect(getRollingDateStrings).toHaveBeenCalled()
    });

    it('should call getRollingWeeks with correct params', () => {
        expect(getRollingWeeks).toHaveBeenCalledWith(69)
    });

    it('should call getCurrentSeason with correct params', () => {
        expect(getCurrentSeason).toHaveBeenCalledWith(sport)
    });

    it('should return expected result', () => {
        expect(result).toEqual({
            rollingDateStrings: ['date1', 'date2'],
            rollingWeeks: [69, 420],
            currentWeek: 69,
            currentSeason: 1969
        })
    });
});