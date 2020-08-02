import {getRecentFantasyData} from "./getRecentFantasyData";
import {uploadObjectToS3} from "../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME, SUPPORTED_SPORTS} from "@dadajian/shared-fantasy-constants";

export const getRecentFantasyDataHandler = async (): Promise<any> => {
    for (const sport of SUPPORTED_SPORTS) {
        await getRecentFantasyData(sport)
            .then((recentFantasyData: any) => {
                return uploadObjectToS3(recentFantasyData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
            })
    }
}