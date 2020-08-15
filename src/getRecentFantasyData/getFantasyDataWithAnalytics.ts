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
                avgPositionPercentile: _.chain(fantasyDataWithPercentiles).meanBy('positionPercentile').round(1).value(),
                avgOverallPercentile: _.chain(fantasyDataWithPercentiles).meanBy('overallPercentile').round(1).value(),
                positions: _.uniq(playerPool.map(player => player.position))
            }
        });
}