import {getRecentFantasyData} from "./getRecentFantasyData";
import {uploadObjectToS3} from "../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME, SUPPORTED_SPORTS} from "@dadajian/shared-fantasy-constants";
import * as Bluebird from "bluebird";
import {logger} from "../constants";

export const getRecentFantasyDataHandler = async (): Promise<any> => {
    return Bluebird.map(SUPPORTED_SPORTS, (sport: string) => {
        return getRecentFantasyData(sport)
            .then((recentFantasyData: any) => {
                logger.info(`Uploading ${sport} fantasy data of length ${recentFantasyData.length} to S3...`)
                return uploadObjectToS3(recentFantasyData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
            })
    }, {concurrency: 1});
}