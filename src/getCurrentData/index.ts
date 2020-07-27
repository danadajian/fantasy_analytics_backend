import {getCurrentWeek} from "../helpers/getCurrentWeek/getCurrentWeek";
import {getCurrentSeason} from "../helpers/getCurrentSeason/getCurrentSeason";
import {getRollingDateStrings} from "../helpers/getRollingDates/getRollingDateStrings";
import {getRollingWeeks} from "../helpers/getRollingWeeks/getRollingWeeks";
import {CurrentData} from "../index";

export const getCurrentData = async (event: any): Promise<CurrentData> => {
    const {sport} = event;

    return getCurrentWeek(sport)
        .then(currentWeek => {
            return Promise.all([
                getRollingDateStrings(new Date()),
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