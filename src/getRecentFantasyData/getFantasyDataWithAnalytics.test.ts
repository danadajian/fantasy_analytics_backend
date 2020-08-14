import {getFantasyDataWithAnalytics} from "./getFantasyDataWithAnalytics";
import {getFantasyDataWithPercentiles} from "./getFantasyDataWithPercentiles";
import * as _ from 'lodash';

jest.mock('./getFantasyDataWithPercentiles');
jest.mock('lodash');

(getFantasyDataWithPercentiles as jest.Mock).mockResolvedValue('fantasyDataWithPercentiles');
(_.meanBy as jest.Mock).mockReturnValue('percentile avg');

describe('getFantasyDataWithAnalytics', () => {
    let result: any;
    const recentFantasyData = [
        {
            date: 'a date',
            fantasyData: 'fantasy data'
        },
        {
            date: 'another date',
            fantasyData: 'more fantasy data'
        }
    ];
    const playerPool = 'player pool';

    beforeEach(async () => {
        // @ts-ignore
        result = await getFantasyDataWithAnalytics(recentFantasyData, playerPool)
    });

    it('should call getFantasyDataWithPercentiles with correct params', () => {
        expect(getFantasyDataWithPercentiles).toHaveBeenCalledWith('fantasy data', playerPool);
        expect(getFantasyDataWithPercentiles).toHaveBeenCalledWith('more fantasy data', playerPool);
    });

    it('should call meanBy with correct params', () => {
        expect(_.meanBy).toHaveBeenCalledWith('fantasyDataWithPercentiles', 'positionPercentile');
        expect(_.meanBy).toHaveBeenCalledWith('fantasyDataWithPercentiles', 'overallPercentile');
    });

    it('should return expected result', () => {
        expect(result).toEqual([
            {
                date: 'a date',
                fantasyData: 'fantasyDataWithPercentiles',
                avgPositionPercentile: 'percentile avg',
                avgOverallPercentile: 'percentile avg'
            },
            {
                date: 'another date',
                fantasyData: 'fantasyDataWithPercentiles',
                avgPositionPercentile: 'percentile avg',
                avgOverallPercentile: 'percentile avg'
            }
        ])
    });
})