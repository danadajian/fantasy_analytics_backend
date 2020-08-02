import {getRecentFantasyData} from "./getRecentFantasyData";
import {uploadObjectToS3} from "../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME} from "@dadajian/shared-fantasy-constants";

export const getRecentFantasyDataHandler = async (event: any): Promise<any> => {
    const {sport} = event;
    return getRecentFantasyData(sport)
        .then((recentFantasyData: any) => {
            return uploadObjectToS3(recentFantasyData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
        })
}