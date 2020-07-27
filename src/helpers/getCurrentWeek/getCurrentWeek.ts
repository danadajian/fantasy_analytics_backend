import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";

export const getCurrentWeek = async (sport: string): Promise<number> => {
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/`, "")
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0].week;
        })
        .catch(() => 0)
};