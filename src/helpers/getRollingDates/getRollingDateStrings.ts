import {NUMBER_OF_GAMES_FOR_ROLLING_AVG} from "../../constants";

export const getRollingDateStrings = (date: Date): string[] => {
    let rollingDateStrings: string[] = [];

    for (let i = 1; i <= NUMBER_OF_GAMES_FOR_ROLLING_AVG; i++) {
        const priorDate = new Date(date);
        priorDate.setDate(priorDate.getDate() - i);
        rollingDateStrings.push(priorDate.toISOString().slice(0, 10));
    }
    return rollingDateStrings;
};