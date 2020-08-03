import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {addOrUpdatePlayerData} from "../addOrUpdatePlayerData/addOrUpdatePlayerData";
import {
    calculateDraftKingsGoaliePoints,
    calculateDraftKingsSkaterPoints,
    calculateFanduelGoaliePoints, calculateFanduelSkaterPoints
} from "../calculateFantasyPoints/calculateNHLFantasyPoints";
import {FantasyData} from "../../index";

export const getFantasyDataFromNHLGame = async (eventId: number, signature: string): Promise<FantasyData[]> => {
    const sport = 'nhl';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0];
        })
        .then(eventData => {
            let fantasyData = [];
            const boxScores = eventData.boxscores;
            boxScores.forEach(boxScore => {
                const {playerGoaltenderStats, playerSkaterStats} = boxScore;
                playerGoaltenderStats.forEach(playerGoaltenderStat => {
                    addOrUpdatePlayerData(fantasyData, playerGoaltenderStat,
                        calculateFanduelGoaliePoints(playerGoaltenderStat), calculateDraftKingsGoaliePoints(playerGoaltenderStat))
                });
                playerSkaterStats.forEach(playerSkaterStat => {
                    addOrUpdatePlayerData(fantasyData, playerSkaterStat,
                        calculateFanduelSkaterPoints(playerSkaterStat), calculateDraftKingsSkaterPoints(playerSkaterStat))
                });
            });
            return fantasyData;
        })
        .catch(() => [])
};
