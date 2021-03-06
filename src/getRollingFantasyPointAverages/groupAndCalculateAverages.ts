import * as _ from 'lodash'
import {FantasyData} from "@dadajian/shared-fantasy-constants";

export const groupAndCalculateAverages = async (fantasyData: FantasyData[][], site: string): Promise<FantasyData[]> => {
    return _.chain(fantasyData)
        .flatten()
        .groupBy("playerId")
        .map((value, key) => ({playerId: key, players: value}))
        .value()
        .map(playerObject => {
            return {
                playerId: Number(playerObject.playerId),
                name: playerObject.players[0].name,
                DraftKings: Number(_.meanBy(playerObject.players, "DraftKings").toFixed(1)),
                Fanduel: Number(_.meanBy(playerObject.players, "Fanduel").toFixed(1)),
            }
        })
        .sort((playerObj1: any, playerObj2: any) => playerObj2[site] - playerObj1[site]);
};