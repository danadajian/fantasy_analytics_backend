import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";

export const getCurrentSeason = async (sport: string): Promise<number> => {
    return callApi(`decode/${SPORT_MAP[sport]}/${sport}/seasonStructure/`, "")
        .then((response) => {
            return response.apiResults[0].league.seasons[0].season;
        })
        .catch(() => 0)
};