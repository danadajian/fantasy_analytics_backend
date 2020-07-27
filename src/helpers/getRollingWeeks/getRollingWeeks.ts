import {NUMBER_OF_GAMES_FOR_ROLLING_AVG} from "../../constants";

export const getRollingWeeks = (currentWeek: number): number[] => {
    let rollingWeeks: number[] = [];

    const startingWeek = Math.max(1, currentWeek - NUMBER_OF_GAMES_FOR_ROLLING_AVG);
    for (let week = startingWeek; week < currentWeek; week++) {
        rollingWeeks.push(week);
    }
    return rollingWeeks;
};