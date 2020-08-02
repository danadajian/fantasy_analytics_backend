import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";

export const getEventIds = async (sport: string, season: number, date: string, week: number): Promise<number[]> => {
    const seasonParam = season ? `&season=${season}` : '';
    const lastParam = sport === 'nfl' ? `&week=${week}` : `&date=${date}`;
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/`, `${seasonParam}${lastParam}`)
        .then(response => {
            return response.apiResults ?
                response.apiResults[0].league.season.eventType[0].events.map(event => event.eventId) : [];
        })
};