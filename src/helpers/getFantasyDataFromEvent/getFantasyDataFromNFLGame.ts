import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {addOrUpdatePlayerData} from "../addOrUpdatePlayerData/addOrUpdatePlayerData";
import {
    calculateDefensePoints,
    calculateDraftKingsPassingPoints, calculateDraftKingsReceivingPoints,
    calculateDraftKingsRushingPoints,
    calculateFanduelPassingPoints, calculateFanduelReceivingPoints,
    calculateFanduelRushingPoints, calculateReturnPoints, calculateTwoPointConversionPoints
} from "../calculateFantasyPoints/calculateNFLFantasyPoints";
import {FantasyData} from "../../index";

export const getFantasyDataFromNFLGame = async (eventId: number, signature: string): Promise<FantasyData[]> => {
    const sport = 'nfl';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0];
        })
        .then(eventData => {
            let fantasyData = [];
            const boxScores = eventData.boxscores;
            boxScores.forEach(boxScore => {
                const {rushingStats, passingStats, receivingStats, kickReturnStats, puntReturnStats, twoPointConversionStats} = boxScore.playerStats;
                const {teamStats} = boxScore;

                rushingStats.forEach(rushingStat => {
                    addOrUpdatePlayerData(fantasyData, rushingStat,
                        calculateFanduelRushingPoints(rushingStat), calculateDraftKingsRushingPoints(rushingStat))
                });
                passingStats.forEach(passingStat => {
                    addOrUpdatePlayerData(fantasyData, passingStat,
                        calculateFanduelPassingPoints(passingStat), calculateDraftKingsPassingPoints(passingStat))
                });
                receivingStats.forEach(receivingStat => {
                    addOrUpdatePlayerData(fantasyData, receivingStat,
                        calculateFanduelReceivingPoints(receivingStat), calculateDraftKingsReceivingPoints(receivingStat))
                });
                kickReturnStats.forEach(kickReturnStat => {
                    const returnPoints = calculateReturnPoints(kickReturnStat);
                    addOrUpdatePlayerData(fantasyData, kickReturnStat, returnPoints, returnPoints)
                });
                puntReturnStats.forEach(puntReturnStat => {
                    const returnPoints = calculateReturnPoints(puntReturnStat);
                    addOrUpdatePlayerData(fantasyData, puntReturnStat, returnPoints, returnPoints)
                });
                twoPointConversionStats.forEach(twoPointConversionStat => {
                    const twoPointConversionPoints = calculateTwoPointConversionPoints(twoPointConversionStat);
                    addOrUpdatePlayerData(fantasyData, twoPointConversionStat, twoPointConversionPoints, twoPointConversionPoints)
                });
                const defenseStat = {
                    interceptions: teamStats.interceptions.number,
                    fumbleRecoveries: teamStats.opponentFumbles.recovered,
                    sacks: teamStats.defense.sacks,
                    safeties: teamStats.safeties,
                    touchdowns: teamStats.returnTotals.touchdowns + teamStats.interceptions.touchdowns + teamStats.opponentFumbles.touchdowns,
                    pointsAllowed: eventData.teams.find(teamObject => teamObject.teamId !== boxScore.teamId).score
                };
                const defensePoints = calculateDefensePoints(defenseStat);
                fantasyData.push({
                    playerId: boxScore.teamId,
                    name: `${eventData.teams.find(teamObject => teamObject.teamId === boxScore.teamId).nickname} D/ST`,
                    Fanduel: defensePoints,
                    DraftKings: defensePoints
                })
            });
            return fantasyData;
        })
        .catch(() => [])
};
