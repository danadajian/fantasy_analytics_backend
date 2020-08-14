import {getFantasyDataWithPercentiles} from "./getFantasyDataWithPercentiles";

describe('getFantasyDataPercentiles', () => {
    let result: any;
    const fantasyData = [
        {
            playerId: 1,
            Fanduel: 1
        },
        {
            playerId: 2,
            Fanduel: 2
        },
        {
            playerId: 3,
            Fanduel: 3
        },
        {
            playerId: 4,
            Fanduel: 4
        },
        {
            playerId: 5,
            Fanduel: 5
        }
    ];
    const playerPool = [
        {
            playerId: 1,
            position: 'pos1'
        },
        {
            playerId: 2,
            position: 'pos1'
        },
        {
            playerId: 3,
            position: 'pos2'
        },
        {
            playerId: 4,
            position: 'pos1'
        },
        {
            playerId: 5,
            position: 'pos1'
        }
    ]

    beforeEach(async () => {
        // @ts-ignore
        result = await getFantasyDataWithPercentiles(fantasyData, playerPool)
    });

    it('should return expected result', () => {
        expect(result).toEqual([
            {
                playerId: 1,
                Fanduel: 1,
                positionPercentile: 25,
                overallPercentile: 20
            },
            {
                playerId: 2,
                Fanduel: 2,
                positionPercentile: 50,
                overallPercentile: 40
            },
            {
                playerId: 3,
                Fanduel: 3,
                positionPercentile: 100,
                overallPercentile: 60
            },
            {
                playerId: 4,
                Fanduel: 4,
                positionPercentile: 75,
                overallPercentile: 80
            },
            {
                playerId: 5,
                Fanduel: 5,
                positionPercentile: 100,
                overallPercentile: 100
            }
        ])
    });
});