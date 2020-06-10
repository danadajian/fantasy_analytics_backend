import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";

export const getNflEventIds = async (week, season) => {
    const sport = 'nfl';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/`, `&season=${season}&week=${week}`)
        .then(response => {
            return response.apiResults ?
                response.apiResults[0].league.season.eventType[0].events.map(event => event.eventId) : [];
        })
};