import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {addOrUpdatePlayerData} from "../addOrUpdatePlayerData/addOrUpdatePlayerData";
import {calculateDraftKingsPoints, calculateFanduelPoints} from "../calculateFantasyPoints/calculateNBAFantasyPoints";
import {FantasyData} from "../../index";

export const getFantasyDataFromNBAGame = async (eventId: number, signature: string): Promise<FantasyData[]> => {
    const sport = 'nba';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0];
        })
        .then(eventData => {
            let fantasyData = [];
            const boxScores = eventData.boxscores;
            boxScores.forEach(boxScore => {
                const {playerStats} = boxScore;
                playerStats.forEach(playerStat => {
                    addOrUpdatePlayerData(fantasyData, playerStat,
                        calculateFanduelPoints(playerStat), calculateDraftKingsPoints(playerStat))
                });
            });
            return fantasyData;
        })
        .catch(() => [])
};
