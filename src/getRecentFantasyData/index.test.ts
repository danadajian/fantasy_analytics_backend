import {getRecentFantasyDataHandler} from "./index";
import {getRecentFantasyData} from "./getRecentFantasyData";
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {DFS_PIPELINE_BUCKET_NAME, FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";
import {getFantasyDataWithAnalytics} from "./getFantasyDataWithAnalytics";

jest.mock('./getRecentFantasyData');
jest.mock('./getFantasyDataWithAnalytics');
jest.mock('../aws/aws');

(getRecentFantasyData as jest.Mock).mockResolvedValue('recent fantasy data');
(retrieveObjectFromS3 as jest.Mock).mockImplementation(async (bucketName: string) => {
    return bucketName === FANTASY_ANALYTICS_BUCKET_NAME ? ['existing fantasy data'] : 'player pool'
});
(uploadObjectToS3 as jest.Mock).mockResolvedValue('data uploaded');
(getFantasyDataWithAnalytics as jest.Mock).mockResolvedValue('recent fantasy data with analytics');

describe('getRecentFantasyDataHandler', () => {
    let result: any;

    beforeEach(async () => {
        result = await getRecentFantasyDataHandler()
    });

    it.each(['mlb', 'nfl', 'nba', 'nhl'])('should call methods with correct params', (sport: string) => {
        expect(getRecentFantasyData).toHaveBeenCalledWith(sport);
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
        expect(retrieveObjectFromS3).toHaveBeenCalledWith(DFS_PIPELINE_BUCKET_NAME, `${sport}PlayerPool.json`)
    });

    it('should call getFantasyDataWithAnalytics with correct params', () => {
        expect(getFantasyDataWithAnalytics).toHaveBeenCalledWith('recent fantasy data', 'player pool');
    });

    it.each(['mlb', 'nfl', 'nba', 'nhl'])('should call uploadObjectToS3 with correct params', (sport: string) => {
        expect(uploadObjectToS3).toHaveBeenCalledWith(['existing fantasy data', 'recent fantasy data with analytics'],
            FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
    });
})