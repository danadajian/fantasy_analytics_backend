import {getRecentFantasyData} from "./getRecentFantasyData";
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {FANTASY_ANALYTICS_BUCKET_NAME, SUPPORTED_SPORTS} from "@dadajian/shared-fantasy-constants";
import * as Bluebird from "bluebird";
import {logger} from "../constants";

export const getRecentFantasyDataHandler = async (): Promise<any> => {
    return Bluebird.map(SUPPORTED_SPORTS, (sport: string) => {
        return Promise.all([
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`).catch(() => []),
            getRecentFantasyData(sport),
        ]).then(([pastFantasyData, recentFantasyData]) => {
            const combinedFantasyData = pastFantasyData.concat(recentFantasyData);
            logger.info(`Uploading ${sport} fantasy data of length ${combinedFantasyData.length} to S3...`)
            return uploadObjectToS3(combinedFantasyData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
        })
    }, {concurrency: 1});
}