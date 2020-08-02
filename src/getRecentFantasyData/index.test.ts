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
    const event = {
        sport: 'a sport'
    }

    beforeEach(async () => {
        result = await getRecentFantasyDataHandler(event)
    })

    it('should not call getCurrentWeek', () => {
        expect(getRecentFantasyData).toHaveBeenCalledWith('a sport')
    });

    it('should call getFantasyData with correct params', () => {
        expect(uploadObjectToS3).toHaveBeenCalledWith('recent fantasy data', FANTASY_ANALYTICS_BUCKET_NAME, 'a sportRecentFantasyData.json')
    });

    it('should return expected result', () => {
        expect(result).toEqual('data uploaded')
    });
})