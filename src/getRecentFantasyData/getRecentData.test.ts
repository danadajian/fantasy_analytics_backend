import {getRecentFantasyData} from "./getRecentFantasyData";
import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";
import {getFantasyData} from "../getFantasyData";

jest.mock('../helpers/getCurrentWeek/getCurrentWeek');
jest.mock('../getFantasyData');

(getCurrentWeek as jest.Mock).mockResolvedValue(69);
(getFantasyData as jest.Mock).mockResolvedValue('fantasy data');

// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => {
    return {
        toLocaleString: jest.fn(() => '4/20/2020, 04:20:00 PM'),
        toISOString: jest.fn(() => '2020-04-19T04:20:69'),
        getDate: jest.fn(),
        setDate: jest.fn()
    }
});


describe('getRecentData', () => {
    describe('nfl case', () => {
        let result: any;

        beforeEach(async () => {
            result = await getRecentFantasyData('nfl')
        })

        it('should call getCurrentWeek', () => {
            expect(getCurrentWeek).toHaveBeenCalledWith('nfl')
        });

        it('should call getFantasyData with correct params', () => {
            expect(getFantasyData).toHaveBeenCalledWith({
                sport: 'nfl',
                week: 69
            })
        });

        it('should return expected result', () => {
            expect(result).toEqual('fantasy data')
        });
    })

    describe('non-nfl case', () => {
        let result: any;

        beforeEach(async () => {
            result = await getRecentFantasyData('not nfl')
        })

        it('should not call getCurrentWeek', () => {
            expect(getCurrentWeek).not.toHaveBeenCalled()
        });

        it('should call getFantasyData with correct params', () => {
            expect(getFantasyData).toHaveBeenCalledWith({
                sport: 'not nfl',
                date: '2020-04-19'
            })
        });

        it('should return expected result', () => {
            expect(result).toEqual('fantasy data')
        });
    })

    afterEach(() => jest.clearAllMocks())
})