import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {
    calculateDraftKingsGoaliePoints,
    calculateDraftKingsSkaterPoints,
    calculateFanduelGoaliePoints, calculateFanduelSkaterPoints
} from "../calculateFantasyPoints/calculateNHLFantasyPoints";
import {StatObject} from "../../types";
import * as Bluebird from "bluebird";
import * as _ from "lodash";
import {groupAndSumFantasyData} from "./groupAndSumFantasyData";

export const getFantasyDataFromNHLGame = async (eventId: number, signature: string): Promise<any> => {
    const sport = 'nhl';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0].boxscores;
        })
        .then(boxScores => {
            return Bluebird.map(boxScores, (boxScore: any) => {
                const {playerGoaltenderStats, playerSkaterStats} = boxScore;
                return Promise.all([
                    Bluebird.map(playerGoaltenderStats, (playerGoaltenderStat: StatObject) => ({
                        playerId: playerGoaltenderStat.player.playerId,
                        name: `${playerGoaltenderStat.player.firstName} ${playerGoaltenderStat.player.lastName}`,
                        Fanduel: calculateFanduelGoaliePoints(playerGoaltenderStat),
                        DraftKings: calculateDraftKingsGoaliePoints(playerGoaltenderStat)
                    })),
                    Bluebird.map(playerSkaterStats, (playerSkaterStat: StatObject) => ({
                            playerId: playerSkaterStat.player.playerId,
                            name: `${playerSkaterStat.player.firstName} ${playerSkaterStat.player.lastName}`,
                            Fanduel: calculateFanduelSkaterPoints(playerSkaterStat),
                            DraftKings: calculateDraftKingsSkaterPoints(playerSkaterStat)
                        }))
                ])
            }).then(statsObjects => {
                return statsObjects.filter((statsObject: any[]) => statsObject.length > 0)
            }).then(fantasyData => {
                return _.flatten(fantasyData)
            })
        })
        .then((expandedFantasyData: any) => {
            return groupAndSumFantasyData(expandedFantasyData)
        })
        .catch(() => [])
};
