import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";

export const getCurrentSeason = async (sport: string) => {
    return callApi(`decode/${SPORT_MAP[sport]}/${sport}/seasonStructure/`, "")
        .then((response) => {
            return response.apiResults ? response.apiResults[0].league.seasons[0].season : 0;
        })
};