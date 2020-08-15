import {RecentFantasyData} from "../types";
import * as _ from 'lodash';
import {getFantasyDataWithPercentiles} from "./getFantasyDataWithPercentiles";

export const getFantasyDataWithAnalytics = async (recentFantasyData: RecentFantasyData, playerPool: any[]) => {
    const {date, fantasyData} = recentFantasyData;
    return getFantasyDataWithPercentiles(fantasyData, playerPool)
        .then(fantasyDataWithPercentiles => {
            return {
                date,
                fantasyData: fantasyDataWithPercentiles,
                avgPositionPercentile: _.meanBy(fantasyDataWithPercentiles, 'positionPercentile'),
                avgOverallPercentile: _.meanBy(fantasyDataWithPercentiles, 'overallPercentile')
            }
        });
}