import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {
    calculateDraftKingsBattingPoints, calculateDraftKingsPitchingPoints,
    calculateFanduelBattingPoints, calculateFanduelPitchingPoints
} from "../calculateFantasyPoints/calculateMLBFantasyPoints";
import {StatObject} from "../../types";
import * as Bluebird from "bluebird";
import * as _ from "lodash";
import {groupAndSumFantasyData} from "./groupAndSumFantasyData";

export const getFantasyDataFromMLBGame = async (eventId: number, signature: string): Promise<any> => {
    const sport = 'mlb';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then(response => {
            return response.apiResults[0].league.season.eventType[0].events[0];
        })
        .then(eventData => {
            const boxScores = eventData.boxscores;
            return Bluebird.map(boxScores, (boxScore: any) => {
                const {playerBattingStats, playerPitchingStats} = boxScore;
                return Promise.all([
                    Bluebird.map(playerBattingStats, (playerBattingStat: StatObject) => ({
                        playerId: playerBattingStat.player.playerId,
                        name: `${playerBattingStat.player.firstName} ${playerBattingStat.player.lastName}`,
                        Fanduel: calculateFanduelBattingPoints(playerBattingStat),
                        DraftKings: calculateDraftKingsBattingPoints(playerBattingStat)
                    })),
                    Bluebird.map(playerPitchingStats, (playerPitchingStat: StatObject) => {
                        const pitchingStarterObject = eventData.teams
                            .find(teamObject => teamObject.teamId === boxScore.teamId)
                            .pitchers
                            .find(pitcherObject => pitcherObject.type.name === 'starter');
                        return {
                            playerId: playerPitchingStat.player.playerId,
                            name: `${playerPitchingStat.player.firstName} ${playerPitchingStat.player.lastName}`,
                            Fanduel: calculateFanduelPitchingPoints(playerPitchingStat, pitchingStarterObject),
                            DraftKings: calculateDraftKingsPitchingPoints(playerPitchingStat)
                        }
                    })
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
