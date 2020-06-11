import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";

export const getEventIds = async (sport, season, date, week) => {
    const lastParam = date ? `&date=${date}` : week ? `&week=${week}` : '';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/`, `&season=${season}${lastParam}`)
        .then(response => {
            return response.apiResults ?
                response.apiResults[0].league.season.eventType[0].events.map(event => event.eventId) : [];
        })
};