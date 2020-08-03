import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {addOrUpdatePlayerData} from "../addOrUpdatePlayerData/addOrUpdatePlayerData";
import {
    calculateDraftKingsBattingPoints, calculateDraftKingsPitchingPoints,
    calculateFanduelBattingPoints, calculateFanduelPitchingPoints
} from "../calculateFantasyPoints/calculateMLBFantasyPoints";
import {FantasyData} from "../../index";

export const getFantasyDataFromMLBGame = async (eventId: number, signature: string): Promise<FantasyData[]> => {
    const sport = 'mlb';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then(response => {
            return response.apiResults[0].league.season.eventType[0].events[0];
        })
        .then(eventData => {
            let fantasyData = [];
            const boxScores = eventData.boxscores;
            boxScores.forEach(boxScore => {
                const {playerBattingStats, playerPitchingStats} = boxScore;

                playerBattingStats.forEach(playerBattingStat => {
                    addOrUpdatePlayerData(fantasyData, playerBattingStat,
                        calculateFanduelBattingPoints(playerBattingStat), calculateDraftKingsBattingPoints(playerBattingStat))
                });
                playerPitchingStats.forEach(playerPitchingStat => {
                    const pitchingStarterObject = eventData.teams
                        .find(teamObject => teamObject.teamId === boxScore.teamId)
                        .pitchers
                        .find(pitcherObject => pitcherObject.type.name === 'starter');
                    addOrUpdatePlayerData(fantasyData, playerPitchingStat,
                        calculateFanduelPitchingPoints(playerPitchingStat, pitchingStarterObject),
                        calculateDraftKingsPitchingPoints(playerPitchingStat))
                });
            });
            return fantasyData;
        })
        .catch(() => [])
};
