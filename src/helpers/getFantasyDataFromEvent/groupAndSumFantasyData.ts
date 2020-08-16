import * as _ from "lodash";
import {FantasyData} from "@dadajian/shared-fantasy-constants";

export const groupAndSumFantasyData = (fantasyData: FantasyData[]) => {
    return _.chain(fantasyData)
        .flatten()
        .groupBy('playerId')
        .map((players, playerId) => ({
            playerId: Number(playerId),
            name: players[0].name,
            Fanduel: _.chain(players).sumBy('Fanduel').round(2).value(),
            DraftKings: _.chain(players).sumBy('DraftKings').round(2).value()
        }))
        .value()
}