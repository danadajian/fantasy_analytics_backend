import {callApi} from "../callApi/callApi";
import {SPORT_MAP} from "../../constants";
import {calculateDraftKingsPoints, calculateFanduelPoints} from "../calculateFantasyPoints/calculateNBAFantasyPoints";
import {StatObject} from "../../types";
import * as Bluebird from "bluebird";
import * as _ from "lodash";
import {groupAndSumFantasyData} from "./groupAndSumFantasyData";

export const getFantasyDataFromNBAGame = async (eventId: number, signature: string): Promise<any> => {
    const sport = 'nba';
    return callApi(`stats/${SPORT_MAP[sport]}/${sport}/events/${eventId}`, "&box=true", signature)
        .then((response) => {
            return response.apiResults[0].league.season.eventType[0].events[0].boxscores;
        })
        .then(boxScores => {
            return Bluebird.map(boxScores, (boxScore: any) => {
                const {playerStats} = boxScore;
                return Bluebird.map(playerStats, (playerStat: StatObject) => ({
                        playerId: playerStat.player.playerId,
                        name: `${playerStat.player.firstName} ${playerStat.player.lastName}`,
                        Fanduel: calculateFanduelPoints(playerStat),
                        DraftKings: calculateDraftKingsPoints(playerStat)
                    }))
            }).then(fantasyData => {
                return _.flatten(fantasyData)
            })
        })
        .then((expandedFantasyData: any) => {
            return groupAndSumFantasyData(expandedFantasyData)
        })
        .catch(() => [])
};
