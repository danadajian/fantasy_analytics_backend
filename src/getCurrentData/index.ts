import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";
import {getCurrentSeason} from "../helpers/getCurrentSeason/getCurrentSeason";
import {getRollingDateStrings} from "../helpers/getRollingDateStrings/getRollingDateStrings";
import {getRollingWeeks} from "../helpers/getRollingWeeks/getRollingWeeks";
import {CurrentData} from "../types";

export const getCurrentData = async (event: any): Promise<CurrentData> => {
    const {sport} = event;

    return getCurrentWeek(sport)
        .then(currentWeek => {
            return Promise.all([
                getRollingDateStrings(),
                getRollingWeeks(currentWeek),
                currentWeek,
                getCurrentSeason(sport)
            ])
        })
        .then(([rollingDateStrings, rollingWeeks, currentWeek, currentSeason]) => {
            return {
                rollingDateStrings,
                rollingWeeks,
                currentWeek,
                currentSeason
            }
        })
};