import {getFantasyDataFromNFLGame} from "./getFantasyDataFromNFLGame";
import {callApi} from "../callApi/callApi";

const mockNflEventIdResponse = require('../../fixtures/nflEventIdResponse.json');

jest.mock('../callApi/callApi');

describe('getFantasyDataFromNFLGame', () => {
    const eventId = 'eventId';

    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockNflEventIdResponse);
            result = await getFantasyDataFromNFLGame(eventId)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/football/nfl/events/eventId", "&box=true")
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    "DraftKings": 9.6,
                    "Fanduel": 6.6,
                    "name": "Mike Davis",
                    "playerId": 694015
                },
                {
                    "DraftKings": 5.5,
                    "Fanduel": 5,
                    "name": "David Montgomery",
                    "playerId": 946739
                },
                {
                    "DraftKings": 12.22,
                    "Fanduel": 9.22,
                    "name": "Mitchell Trubisky",
                    "playerId": 728169
                },
                {
                    "DraftKings": 1.1,
                    "Fanduel": 0.6,
                    "name": "Cordarrelle Patterson",
                    "playerId": 690153
                },
                {
                    "DraftKings": 12.9,
                    "Fanduel": 8.9,
                    "name": "Tarik Cohen",
                    "playerId": 756928
                },
                {
                    "DraftKings": 20.2,
                    "Fanduel": 13.7,
                    "name": "Allen Robinson II",
                    "playerId": 609496
                },
                {
                    "DraftKings": 4.4,
                    "Fanduel": 3.4,
                    "name": "Taylor Gabriel",
                    "playerId": 752062
                },
                {
                    "DraftKings": 1.6,
                    "Fanduel": 1.1,
                    "name": "Adam Shaheen",
                    "playerId": 1049770
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Anthony Miller",
                    "playerId": 749136
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Javon Wims",
                    "playerId": 922039
                },
                {
                    "DraftKings": 9,
                    "Fanduel": 9,
                    "name": "Bears D/ST",
                    "playerId": 326
                },
                {
                    "DraftKings": 4.9,
                    "Fanduel": 4.4,
                    "name": "Aaron Jones",
                    "playerId": 741314
                },
                {
                    "DraftKings": 15.92,
                    "Fanduel": 12.92,
                    "name": "Aaron Rodgers",
                    "playerId": 213957
                },
                {
                    "DraftKings": 3.5,
                    "Fanduel": 2.5,
                    "name": "Jamaal Williams",
                    "playerId": 695311
                },
                {
                    "DraftKings": 9.2,
                    "Fanduel": 7.2,
                    "name": "Marquez Valdes-Scantling",
                    "playerId": 742382
                },
                {
                    "DraftKings": 7.6,
                    "Fanduel": 5.6,
                    "name": "Davante Adams",
                    "playerId": 611417
                },
                {
                    "DraftKings": 12,
                    "Fanduel": 10.5,
                    "name": "Jimmy Graham",
                    "playerId": 295918
                },
                {
                    "DraftKings": 3.4,
                    "Fanduel": 2.4,
                    "name": "Marcedes Lewis",
                    "playerId": 214197
                },
                {
                    "DraftKings": 3.8,
                    "Fanduel": 3.3,
                    "name": "Trevor Davis",
                    "playerId": 615494
                },
                {
                    "DraftKings": 3.8,
                    "Fanduel": 3.3,
                    "name": "Robert Tonyan",
                    "playerId": 660151
                },
                {
                    "DraftKings": 14,
                    "Fanduel": 14,
                    "name": "Packers D/ST",
                    "playerId": 335
                }
            ])
        });
    });

    describe('error case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getFantasyDataFromNFLGame(eventId)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/football/nfl/events/eventId", "&box=true")
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});