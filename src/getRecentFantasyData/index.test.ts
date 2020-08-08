import {getRecentFantasyDataHandler} from "./index";
import {getRecentFantasyData} from "./getRecentFantasyData";
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";

jest.mock('./getRecentFantasyData');
jest.mock('../aws/aws');

(getRecentFantasyData as jest.Mock).mockResolvedValue(['recent fantasy data']);
(retrieveObjectFromS3 as jest.Mock).mockResolvedValue(['past fantasy data']);
(uploadObjectToS3 as jest.Mock).mockResolvedValue('data uploaded');

describe('getRecentFantasyDataHandler', () => {
    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            result = await getRecentFantasyDataHandler()
        })

        it.each(['mlb', 'nfl', 'nba', 'nhl'])('should call retrieveObjectFromS3 with correct params', (sport: string) => {
            expect(getRecentFantasyData).toHaveBeenCalledWith(sport);
        });

        it.each(['mlb', 'nfl', 'nba', 'nhl'])('should call uploadObjectToS3 with correct params', (sport: string) => {
            expect(uploadObjectToS3).toHaveBeenCalledWith(['past fantasy data', 'recent fantasy data'],
                FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
        });
    });

    describe('errpr case', () => {
        let result: any;

        beforeEach(async () => {
            (retrieveObjectFromS3 as jest.Mock).mockRejectedValue(new Error());
            result = await getRecentFantasyDataHandler()
        })

        it.each(['mlb', 'nfl', 'nba', 'nhl'])('should call retrieveObjectFromS3 with correct params', (sport: string) => {
            expect(getRecentFantasyData).toHaveBeenCalledWith(sport);
        });

        it.each(['mlb', 'nfl', 'nba', 'nhl'])('should call uploadObjectToS3 with correct params', (sport: string) => {
            expect(uploadObjectToS3).toHaveBeenCalledWith(['recent fantasy data'], FANTASY_ANALYTICS_BUCKET_NAME,
                `${sport}RecentFantasyData.json`)
        });
    });

    afterEach(() => jest.clearAllMocks())
})