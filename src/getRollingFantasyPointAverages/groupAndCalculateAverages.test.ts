import {groupAndCalculateAverages} from "./groupAndCalculateAverages";

describe('groupAndCalculateAverages', () => {
    describe('data exists case', () => {
        let result: any;
        const fantasyData = [
            [
                {
                    DraftKings: 0.8,
                    Fanduel: 1.0,
                    name: "Player 1",
                    playerId: 123
                },
                {
                    DraftKings: 69.6,
                    Fanduel: 69.6,
                    name: "Player 69",
                    playerId: 69
                },
                {
                    DraftKings: 3.6,
                    Fanduel: 2.8,
                    name: "Player 2",
                    playerId: 456
                }
            ],
            [
                {
                    DraftKings: 5.0,
                    Fanduel: 9.0,
                    name: "Player 1",
                    playerId: 123
                },
                {
                    DraftKings: 27.8,
                    Fanduel: 20.8,
                    name: "Player 2",
                    playerId: 456
                },
                {
                    DraftKings: 3.7,
                    Fanduel: 2.7,
                    name: "Player 3",
                    playerId: 789
                }
            ]
        ];

        beforeEach(async () => {
            result = await groupAndCalculateAverages(fantasyData, "Fanduel")
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    DraftKings: 69.6,
                    Fanduel: 69.6,
                    name: "Player 69",
                    playerId: 69
                },
                {
                    name: "Player 2",
                    DraftKings: 15.7,
                    Fanduel: 11.8,
                    playerId: 456
                },
                {
                    name: "Player 1",
                    DraftKings: 2.9,
                    Fanduel: 5.0,
                    playerId: 123
                },
                {
                    DraftKings: 3.7,
                    Fanduel: 2.7,
                    name: "Player 3",
                    playerId: 789
                }
            ])
        });
    });

    describe('data does not exist case', () => {
        let result: any;
        const fantasyData = [];

        beforeEach(async () => {
            result = await groupAndCalculateAverages(fantasyData, "any site")
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });
});