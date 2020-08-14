import {RecentFantasyData} from "../types";
import * as Bluebird from "bluebird";
import * as _ from 'lodash';
import {getFantasyDataWithPercentiles} from "./getFantasyDataWithPercentiles";

export const getFantasyDataWithAnalytics = async (recentFantasyData: RecentFantasyData[], playerPool: any[]) => {
    return Bluebird.map(recentFantasyData, async (recentData: RecentFantasyData) => {
        const {date, fantasyData} = recentData;
        return getFantasyDataWithPercentiles(fantasyData, playerPool)
            .then(fantasyDataWithPercentiles => {
                return {
                    date,
                    fantasyData: fantasyDataWithPercentiles,
                    avgPositionPercentile: _.meanBy(fantasyDataWithPercentiles, 'positionPercentile'),
                    avgOverallPercentile: _.meanBy(fantasyDataWithPercentiles, 'overallPercentile')
                }
            });
    })
}