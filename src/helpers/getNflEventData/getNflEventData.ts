import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {
    calculateDefensePoints,
    calculateDraftKingsPassingPoints, calculateDraftKingsReceivingPoints,
    calculateDraftKingsRushingPoints,
    calculateFanduelPassingPoints, calculateFanduelReceivingPoints,
    calculateFanduelRushingPoints, calculateReturnPoints, calculateTwoPointConversionPoints
} from "../calculate/calculateFantasyPoints";
import {sum} from "../sum/sum";

export const getNflEventData = async (eventId) => {
    const sport = 'nfl';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true")
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
                    addOrUpdatePlayerPoints(fantasyData, rushingStat,
                        calculateFanduelRushingPoints(rushingStat), calculateDraftKingsRushingPoints(rushingStat))
                });
                passingStats.forEach(passingStat => {
                    addOrUpdatePlayerPoints(fantasyData, passingStat,
                        calculateFanduelPassingPoints(passingStat), calculateDraftKingsPassingPoints(passingStat))
                });
                receivingStats.forEach(receivingStat => {
                    addOrUpdatePlayerPoints(fantasyData, receivingStat,
                        calculateFanduelReceivingPoints(receivingStat), calculateDraftKingsReceivingPoints(receivingStat))
                });
                kickReturnStats.forEach(kickReturnStat => {
                    const returnPoints = calculateReturnPoints(kickReturnStat);
                    addOrUpdatePlayerPoints(fantasyData, kickReturnStat, returnPoints, returnPoints)
                });
                puntReturnStats.forEach(puntReturnStat => {
                    const returnPoints = calculateReturnPoints(puntReturnStat);
                    addOrUpdatePlayerPoints(fantasyData, puntReturnStat, returnPoints, returnPoints)
                });
                twoPointConversionStats.forEach(twoPointConversionStat => {
                    const twoPointConversionPoints = calculateTwoPointConversionPoints(twoPointConversionStat);
                    addOrUpdatePlayerPoints(fantasyData, twoPointConversionStat, twoPointConversionPoints, twoPointConversionPoints)
                });
                const defenseStat = {
                    interceptions: teamStats.interceptions.number,
                    fumbleRecoveries: teamStats.opponentFumbles.recovered,
                    sacks: teamStats.defense.sacks,
                    safeties: teamStats.safeties,
                    touchdowns: teamStats.returnTotals.touchdowns + teamStats.interceptions.touchdowns + teamStats.opponentFumbles.touchdowns,
                    pointsAllowed: eventData.teams.find(teamObject => teamObject.teamId !== boxScore.teamId).score
                };
                const teamObject = eventData.teams.find(teamObject => teamObject.teamId === boxScore.teamId);
                const defensePoints = calculateDefensePoints(defenseStat);
                fantasyData.push({
                    playerId: boxScore.teamId,
                    name: `${teamObject.nickname} D/ST`,
                    Fanduel: defensePoints,
                    DraftKings: defensePoints
                })
            });
            return fantasyData;
        })
        .catch(() => [])
};

const addOrUpdatePlayerPoints = (fantasyData, statObject, fanduelPoints, draftKingsPoints) => {
    const playerId = statObject.player.playerId;
    const playerInFantasyData = fantasyData.find(playerObject => playerObject.playerId === playerId);
    if (playerInFantasyData) {
        playerInFantasyData.Fanduel = sum(playerInFantasyData.Fanduel, fanduelPoints);
        playerInFantasyData.DraftKings = sum(playerInFantasyData.DraftKings, draftKingsPoints)
    } else {
        fantasyData.push({
            playerId,
            name: `${statObject.player.firstName} ${statObject.player.lastName}`,
            Fanduel: fanduelPoints,
            DraftKings: draftKingsPoints
        })
    }
};
