import {getRecentFantasyDataHandler} from "./index";
import {getRecentFantasyData} from "./getRecentFantasyData";
import {uploadObjectToS3} from "../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";

jest.mock('./getRecentFantasyData');
jest.mock('../aws/aws');

(getRecentFantasyData as jest.Mock).mockResolvedValue('recent fantasy data');
(uploadObjectToS3 as jest.Mock).mockResolvedValue('data uploaded');

describe('getRecentFantasyDataHandler', () => {
    let result: any;

    beforeEach(async () => {
        result = await getRecentFantasyDataHandler()
    })

    it('should not call getCurrentWeek', () => {
        expect(getRecentFantasyData).toHaveBeenCalledWith('mlb')
        expect(getRecentFantasyData).toHaveBeenCalledWith('nfl')
        expect(getRecentFantasyData).toHaveBeenCalledWith('nba')
        expect(getRecentFantasyData).toHaveBeenCalledWith('nhl')
    });

    it('should call getFantasyData with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('recent fantasy data', FANTASY_ANALYTICS_BUCKET_NAME, 'mlbRecentFantasyData.json')
        expect(uploadObjectToS3).toHaveBeenCalledWith('recent fantasy data', FANTASY_ANALYTICS_BUCKET_NAME, 'nflRecentFantasyData.json')
        expect(uploadObjectToS3).toHaveBeenCalledWith('recent fantasy data', FANTASY_ANALYTICS_BUCKET_NAME, 'nbaRecentFantasyData.json')
        expect(uploadObjectToS3).toHaveBeenCalledWith('recent fantasy data', FANTASY_ANALYTICS_BUCKET_NAME, 'nhlRecentFantasyData.json')
    });
})