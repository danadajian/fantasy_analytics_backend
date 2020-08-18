import * as _ from 'lodash';
import {getFantasyDataWithPercentiles} from "./getFantasyDataWithPercentiles";
import {RecentFantasyData} from "@dadajian/shared-fantasy-constants";

export const getFantasyDataWithAnalytics = async (recentFantasyData: RecentFantasyData, playerPool: any[]) => {
    const {date, week, fantasyData} = recentFantasyData;
    return getFantasyDataWithPercentiles(fantasyData, playerPool)
        .then(fantasyDataWithPercentiles => {
            return {
                date,
                week,
                fantasyData: fantasyDataWithPercentiles,
                avgPositionPercentile: _.chain(fantasyDataWithPercentiles).meanBy('positionPercentile').round(1).value(),
                avgOverallPercentile: _.chain(fantasyDataWithPercentiles).meanBy('overallPercentile').round(1).value(),
                positions: _.uniq(playerPool.map(player => player.position))
            }
        });
}