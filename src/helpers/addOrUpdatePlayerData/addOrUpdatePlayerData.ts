import {sum} from "../sum/sum";

export const addOrUpdatePlayerData = (fantasyData, statObject, fanduelPoints, draftKingsPoints): void => {
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
