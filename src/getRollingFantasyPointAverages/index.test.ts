import {getRollingFantasyPointAverages} from "./index";
import {getFantasyData} from "../getFantasyData";
import {getCurrentData} from "../getCurrentData";
import {groupAndCalculateAverages} from "./groupAndCalculateAverages";

jest.mock('../getCurrentData');
jest.mock('../getFantasyData');
jest.mock('./groupAndCalculateAverages');

const mockFantasyData = [{some: 'data'}, {fantasy: 'data'}, {more: 'fantasy data'}];

(getCurrentData as jest.Mock).mockResolvedValue({
    rollingDateStrings: ['date1', 'date2'],
    rollingWeeks: [69, 420, 69420],
    currentSeason: 1969
});

(getFantasyData as jest.Mock).mockResolvedValue(mockFantasyData);
(groupAndCalculateAverages as jest.Mock).mockResolvedValue('grouped players with averages');

describe('getRollingFantasyPointAverages', () => {
    const site = 'site';
    describe('nfl case', () => {
        let result: any;
        const sport = 'nfl';
        const event = {site, sport};

        beforeEach(async () => {
            result = await getRollingFantasyPointAverages(event);
        });

        it('should call getCurrentWeek lambda with correct params', () => {
            expect(getCurrentData).toHaveBeenCalledWith({sport})
        });

        it('should call getFantasyData lambda correct number of times', () => {
            expect(getFantasyData).toHaveBeenCalledTimes(3)
        });

        it.each([69, 420, 69420])(
            'should call getFantasyData lambda with correct params', (week) => {
                expect(getFantasyData).toHaveBeenCalledWith({sport, week, season: 1969})
            }
        );

        it('should call groupAndCalculateAverages with correct params', () => {
            expect(groupAndCalculateAverages).toHaveBeenCalledWith([mockFantasyData, mockFantasyData, mockFantasyData], site)
        });

        it('should return expected result', () => {
            expect(result).toEqual('grouped players with averages')
        });

        afterEach(() => {
            jest.clearAllMocks()
        });
    });

    describe('non-nfl case', () => {
        let result: any;
        const sport = 'not nfl';
        const event = {site, sport};

        beforeEach(async () => {
            result = await getRollingFantasyPointAverages(event);
        });

        it('should call getCurrentWeek lambda with correct params', () => {
            expect(getCurrentData).toHaveBeenCalledWith({sport})
        });

        it('should call getFantasyData lambda correct number of times', () => {
            expect(getFantasyData).toHaveBeenCalledTimes(2)
        });

        it.each(['date1', 'date2'])(
            'should call getFantasyData lambda with correct params', (date) => {
                expect(getFantasyData).toHaveBeenCalledWith({sport, date, season: 1969})
            }
        );

        it('should call groupAndCalculateAverages with correct params', () => {
            expect(groupAndCalculateAverages).toHaveBeenCalledWith([mockFantasyData, mockFantasyData], site)
        });

        it('should return expected result', () => {
            expect(result).toEqual('grouped players with averages')
        });

        afterEach(() => {
            jest.clearAllMocks()
        });
    });
});