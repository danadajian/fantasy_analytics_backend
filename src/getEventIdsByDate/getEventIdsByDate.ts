import {callApi} from "../helpers/callApi/callApi";
import {SPORT_MAP} from "../constants";

export const getEventIdsByDate = async (sport, season, date) => {
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/`, `&season=${season}&date=${date}`)
        .then(response => {
            return response.apiResults ?
                response.apiResults[0].league.season.eventType[0].events.map(event => event.eventId) : [];
        })
};