import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {
    calculateDefensePoints,
    calculateDraftKingsPassingPoints, calculateDraftKingsReceivingPoints,
    calculateDraftKingsRushingPoints,
    calculateFanduelPassingPoints, calculateFanduelReceivingPoints,
    calculateFanduelRushingPoints, calculateReturnPoints, calculateTwoPointConversionPoints
} from "../calculateFantasyPoints/calculateNFLFantasyPoints";
import {StatObject} from "../../types";
import * as Bluebird from "bluebird";
import * as _ from 'lodash';
import {groupAndSumFantasyData} from "./groupAndSumFantasyData";

export const getFantasyDataFromNFLGame = async (eventId: number, signature: string): Promise<any> => {
    const sport = 'nfl';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0];
        })
        .then(eventData => {
            const boxScores = eventData.boxscores;
            return Bluebird.map(boxScores, (boxScore: any) => {
                const {rushingStats, passingStats, receivingStats, kickReturnStats, puntReturnStats, twoPointConversionStats} = boxScore.playerStats;
                const {teamStats} = boxScore;
                const defenseStat = {
                    interceptions: teamStats.interceptions.number,
                    fumbleRecoveries: teamStats.opponentFumbles.recovered,
                    sacks: teamStats.defense.sacks,
                    safeties: teamStats.safeties,
                    touchdowns: teamStats.returnTotals.touchdowns + teamStats.interceptions.touchdowns + teamStats.opponentFumbles.touchdowns,
                    pointsAllowed: eventData.teams.find(teamObject => teamObject.teamId !== boxScore.teamId).score
                };
                return Promise.all([
                    Bluebird.map(rushingStats, (rushingStat: StatObject) => ({
                        playerId: rushingStat.player.playerId,
                        name: `${rushingStat.player.firstName} ${rushingStat.player.lastName}`,
                        Fanduel: calculateFanduelRushingPoints(rushingStat),
                        DraftKings: calculateDraftKingsRushingPoints(rushingStat)
                    })),
                    Bluebird.map(passingStats, (passingStat: StatObject) => ({
                        playerId: passingStat.player.playerId,
                        name: `${passingStat.player.firstName} ${passingStat.player.lastName}`,
                        Fanduel: calculateFanduelPassingPoints(passingStat),
                        DraftKings: calculateDraftKingsPassingPoints(passingStat)
                    })),
                    Bluebird.map(receivingStats, (receivingStat: StatObject) => ({
                        playerId: receivingStat.player.playerId,
                        name: `${receivingStat.player.firstName} ${receivingStat.player.lastName}`,
                        Fanduel: calculateFanduelReceivingPoints(receivingStat),
                        DraftKings: calculateDraftKingsReceivingPoints(receivingStat)
                    })),
                    Bluebird.map(kickReturnStats, (kickReturnStat: StatObject) => ({
                        playerId: kickReturnStat.player.playerId,
                        name: `${kickReturnStat.player.firstName} ${kickReturnStat.player.lastName}`,
                        Fanduel: calculateReturnPoints(kickReturnStat),
                        DraftKings: calculateReturnPoints(kickReturnStat)
                    })),
                    Bluebird.map(puntReturnStats, (puntReturnStat: StatObject) => ({
                        playerId: puntReturnStat.player.playerId,
                        name: `${puntReturnStat.player.firstName} ${puntReturnStat.player.lastName}`,
                        Fanduel: calculateReturnPoints(puntReturnStat),
                        DraftKings: calculateReturnPoints(puntReturnStat)
                    })),
                    Bluebird.map(twoPointConversionStats, (twoPointConversionStat: StatObject) => ({
                        playerId: twoPointConversionStat.player.playerId,
                        name: `${twoPointConversionStat.player.firstName} ${twoPointConversionStat.player.lastName}`,
                        Fanduel: calculateTwoPointConversionPoints(twoPointConversionStat),
                        DraftKings: calculateTwoPointConversionPoints(twoPointConversionStat)
                    })),
                    [{
                        playerId: boxScore.teamId,
                        name: `${eventData.teams.find(teamObject => teamObject.teamId === boxScore.teamId).nickname} D/ST`,
                        Fanduel: calculateDefensePoints(defenseStat),
                        DraftKings: calculateDefensePoints(defenseStat)
                    }]
                ]).then(statsObjects => {
                    return statsObjects.filter((statsObject: any[]) => statsObject.length > 0)
                })
            }).then(fantasyData => {
                return _.flatten(fantasyData)
            })
        })
        .then((expandedFantasyData: any) => {
            return groupAndSumFantasyData(expandedFantasyData)
        })
        .catch(() => [])
};
