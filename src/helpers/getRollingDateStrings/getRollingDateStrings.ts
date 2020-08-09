import {NUMBER_OF_GAMES_FOR_ROLLING_AVG} from "../../constants";
import {getPastDateString} from "../getPastDateString/getPastDateString";

export const getRollingDateStrings = (): string[] => {
    let rollingDateStrings: string[] = [];

    for (let i = 1; i <= NUMBER_OF_GAMES_FOR_ROLLING_AVG; i++) {
        rollingDateStrings.push(getPastDateString(i));
    }
    return rollingDateStrings;
};