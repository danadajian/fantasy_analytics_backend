import {sum} from "../sum/sum";
import {FantasyData} from "../../index";

export const addOrUpdatePlayerData = (fantasyData: FantasyData[], statObject, fanduelPoints: number,
                                      draftKingsPoints: number): void => {
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
