import {getCurrentWeek} from "../helpers/getCurrentWeek";
import {getCurrentSeason} from "../helpers/getCurrentSeason";

export const getCurrentData = async (event: any) => {
    const {sport} = event;
    return Promise.all([
        getCurrentWeek(sport),
        getCurrentSeason(sport)
    ]).then(([currentWeek, currentSeason]) => {
        return {
            currentWeek,
            currentSeason
        }
    })
};