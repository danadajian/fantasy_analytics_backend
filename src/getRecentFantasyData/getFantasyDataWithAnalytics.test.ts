import {getFantasyDataWithAnalytics} from "./getFantasyDataWithAnalytics";
import {getFantasyDataWithPercentiles} from "./getFantasyDataWithPercentiles";

jest.mock('./getFantasyDataWithPercentiles');

const fantasyDataWithPercentiles = [
    {
        playerId: 1,
        name: 'name1',
        Fanduel: 123,
        DraftKings: 456,
        positionPercentile: 1,
        overallPercentile: 2
    },
    {
        playerId: 2,
        name: 'name2',
        Fanduel: 123,
        DraftKings: 456,
        positionPercentile: 2,
        overallPercentile: 3
    },
    {
        playerId: 2,
        name: 'name3',
        Fanduel: 123,
        DraftKings: 456,
        positionPercentile: 4,
        overallPercentile: 5
    }
];
(getFantasyDataWithPercentiles as jest.Mock).mockResolvedValue(fantasyDataWithPercentiles);

describe('getFantasyDataWithAnalytics', () => {
    let result: any;
    const recentFantasyData = {
        date: 'a date',
        fantasyData: 'fantasy data'
    };
    const playerPool = [
        {
            position: 'pos1'
        },
        {
            position: 'pos1'
        },
        {
            position: 'pos2'
        }
    ];

    beforeEach(async () => {
        // @ts-ignore
        result = await getFantasyDataWithAnalytics(recentFantasyData, playerPool)
    });

    it('should call getFantasyDataWithPercentiles with correct params', () => {
        expect(getFantasyDataWithPercentiles).toHaveBeenCalledWith('fantasy data', playerPool);
    });

    it('should return expected result', () => {
        expect(result).toEqual({
            date: 'a date',
            fantasyData: fantasyDataWithPercentiles,
            avgPositionPercentile: 2.3,
            avgOverallPercentile: 3.3,
            positions: ['pos1', 'pos2']
        })
    });
})