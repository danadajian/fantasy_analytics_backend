import {getRecentFantasyData} from "./getRecentFantasyData";
import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";
import {getFantasyData} from "../getFantasyData";
import {getPastDateString} from "../helpers/getPastDateString/getPastDateString";

jest.mock('../helpers/getCurrentWeek/getCurrentWeek');
jest.mock('../getFantasyData');
jest.mock('../helpers/getPastDateString/getPastDateString');

(getCurrentWeek as jest.Mock).mockResolvedValue(69);
(getFantasyData as jest.Mock).mockResolvedValue('fantasy data');
(getPastDateString as jest.Mock).mockReturnValue('2020-04-19');

describe('getRecentData', () => {
    describe('nfl case', () => {
        let result: any;

        beforeEach(async () => {
            result = await getRecentFantasyData('nfl')
        })

        it('should call getCurrentWeek', () => {
            expect(getCurrentWeek).toHaveBeenCalledWith('nfl')
        });

        it('should not call getPastDateString', () => {
            expect(getPastDateString).not.toHaveBeenCalled()
        });

        it('should call getFantasyData with correct params', () => {
            expect(getFantasyData).toHaveBeenCalledWith({
                sport: 'nfl',
                week: 68
            })
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    week: 68,
                    fantasyData: 'fantasy data'
                }
            ])
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

        it('should call getPastDateString with correct params', () => {
            expect(getPastDateString).toHaveBeenCalledWith(1)
        });

        it('should call getFantasyData with correct params', () => {
            expect(getFantasyData).toHaveBeenCalledWith({
                sport: 'not nfl',
                date: '2020-04-19'
            })
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    date: '2020-04-19',
                    fantasyData: 'fantasy data'
                }
            ])
        });
    })

    afterEach(() => jest.clearAllMocks())
})