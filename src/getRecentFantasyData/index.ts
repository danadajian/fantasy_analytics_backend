import {getRecentFantasyData} from "./getRecentFantasyData";
import {retrieveObjectFromS3, uploadObjectToS3} from "../aws/aws";
import {
    DFS_PIPELINE_BUCKET_NAME,
    FANTASY_ANALYTICS_BUCKET_NAME,
    SUPPORTED_SPORTS
} from "@dadajian/shared-fantasy-constants";
import * as Bluebird from "bluebird";
import {logger} from "../constants";
import {getFantasyDataWithAnalytics} from "./getFantasyDataWithAnalytics";

export const getRecentFantasyDataHandler = async (): Promise<any> => {
    return Bluebird.map(SUPPORTED_SPORTS, (sport: string) => {
        return Promise.all([
            getRecentFantasyData(sport),
            retrieveObjectFromS3(FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`).catch(() => []),
            retrieveObjectFromS3(DFS_PIPELINE_BUCKET_NAME, `${sport}PlayerPool.json`),
        ]).then(([recentFantasyData, existingFantasyData, playerPool]) => {
            return Promise.all([
                existingFantasyData,
                getFantasyDataWithAnalytics(recentFantasyData, playerPool)
            ])
        }).then(([existingFantasyData, recentFantasyDataWithAnalytics]) => {
            const combinedFantasyData = existingFantasyData.concat([recentFantasyDataWithAnalytics]);
            logger.info(`Uploading ${sport} fantasy data of length ${combinedFantasyData.length} to S3...`)
            return uploadObjectToS3(combinedFantasyData, FANTASY_ANALYTICS_BUCKET_NAME, `${sport}RecentFantasyData.json`)
        })
    }, {concurrency: 1});
}