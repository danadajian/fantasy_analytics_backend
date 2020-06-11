import {addOrUpdatePlayerData} from "./addOrUpdatePlayerData";

describe('addOrUpdatePlayerData', () => {
    const statObject = {
        player: {
            playerId: 123,
            firstName: 'first',
            lastName: 'last'
        }
    };
    const fanduelPoints = 69;
    const draftKingsPoints = 69;

    describe('new player case', () => {
        let result: any;
        let fantasyData = [];

        beforeEach(() => {
            result = addOrUpdatePlayerData(fantasyData, statObject, fanduelPoints, draftKingsPoints)
        });

        it('should return expected fantasyData', () => {
            expect(fantasyData).toEqual([
                {
                    playerId: 123,
                    name: 'first last',
                    Fanduel: 69,
                    DraftKings: 69
                }
            ])
        });
    });

    describe('existing player case', () => {
        let result: any;
        let fantasyData = [
            {
                playerId: 123,
                name: 'first last',
                Fanduel: 351,
                DraftKings: 351
            }
        ];

        beforeEach(() => {
            result = addOrUpdatePlayerData(fantasyData, statObject, fanduelPoints, draftKingsPoints)
        });

        it('should return expected fantasyData', () => {
            expect(fantasyData).toEqual([
                {
                    playerId: 123,
                    name: 'first last',
                    Fanduel: 420,
                    DraftKings: 420
                }
            ])
        });
    });
});