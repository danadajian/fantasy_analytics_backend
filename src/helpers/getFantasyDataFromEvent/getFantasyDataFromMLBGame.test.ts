import {getFantasyDataFromMLBGame} from "./getFantasyDataFromMLBGame";
import {callApi} from "../callApi/callApi";

const mockMLBEventIdResponse = require('../../fixtures/mlbEventIdResponse.json');

jest.mock('../callApi/callApi');

describe('getFantasyDataFromMLBGame', () => {
    const eventId = 123;
    const signature = 'signature'

    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockMLBEventIdResponse);
            result = await getFantasyDataFromMLBGame(eventId, signature)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/baseball/mlb/events/123", "&box=true", signature)
        });

        it('should return expected result', () => {
            expect(result).toEqual([
                {
                    "DraftKings": 19,
                    "Fanduel": 25.4,
                    "name": "DJ LeMahieu",
                    "playerId": 500845
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Aaron Judge",
                    "playerId": 549847
                },
                {
                    "DraftKings": 37,
                    "Fanduel": 50.6,
                    "name": "Gio Urshela",
                    "playerId": 505997
                },
                {
                    "DraftKings": 5,
                    "Fanduel": 6.2,
                    "name": "Didi Gregorius",
                    "playerId": 456349
                },
                {
                    "DraftKings": 19,
                    "Fanduel": 24.9,
                    "name": "Cameron Maybin",
                    "playerId": 303002
                },
                {
                    "DraftKings": 23,
                    "Fanduel": 32.2,
                    "name": "Mike Tauchman",
                    "playerId": 737856
                },
                {
                    "DraftKings": 6,
                    "Fanduel": 6,
                    "name": "Austin Romine",
                    "playerId": 390355
                },
                {
                    "DraftKings": 4,
                    "Fanduel": 6.2,
                    "name": "Mike Ford",
                    "playerId": 708447
                },
                {
                    "DraftKings": 11,
                    "Fanduel": 15.4,
                    "name": "Breyvic Valera",
                    "playerId": 546472
                },
                {
                    "DraftKings": 9.85,
                    "Fanduel": 21,
                    "name": "Domingo German",
                    "playerId": 548637
                },
                {
                    "DraftKings": 5.05,
                    "Fanduel": 9,
                    "name": "Chad Green",
                    "playerId": 550041
                },
                {
                    "DraftKings": 12.95,
                    "Fanduel": 21,
                    "name": "Luis Cessa",
                    "playerId": 506912
                },
                {
                    "DraftKings": 23,
                    "Fanduel": 31.7,
                    "name": "Bo Bichette",
                    "playerId": 917949
                },
                {
                    "DraftKings": 4,
                    "Fanduel": 6.2,
                    "name": "Cavan Biggio",
                    "playerId": 738582
                },
                {
                    "DraftKings": 8,
                    "Fanduel": 9.5,
                    "name": "Lourdes Gurriel Jr.",
                    "playerId": 908697
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Brandon Drury",
                    "playerId": 549169
                },
                {
                    "DraftKings": 5,
                    "Fanduel": 6,
                    "name": "Vladimir Guerrero Jr.",
                    "playerId": 920245
                },
                {
                    "DraftKings": 6,
                    "Fanduel": 6,
                    "name": "Freddy Galvis",
                    "playerId": 392933
                },
                {
                    "DraftKings": 2,
                    "Fanduel": 3,
                    "name": "Justin Smoak",
                    "playerId": 454366
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Randal Grichuk",
                    "playerId": 500734
                },
                {
                    "DraftKings": 14,
                    "Fanduel": 18.7,
                    "name": "Derek Fisher",
                    "playerId": 597981
                },
                {
                    "DraftKings": 29,
                    "Fanduel": 37.1,
                    "name": "Reese McGuire",
                    "playerId": 737505
                },
                {
                    "DraftKings": -10.95,
                    "Fanduel": -11,
                    "name": "Thomas Pannone",
                    "playerId": 658922
                },
                {
                    "DraftKings": 3.75,
                    "Fanduel": 9,
                    "name": "Zack Godley",
                    "playerId": 503798
                },
                {
                    "DraftKings": 4.8,
                    "Fanduel": 8,
                    "name": "Jason Adam",
                    "playerId": 548332
                },
                {
                    "DraftKings": -1.55,
                    "Fanduel": 0,
                    "name": "Buddy Boshers",
                    "playerId": 454539
                }
            ])
        });
    });

    describe('error case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getFantasyDataFromMLBGame(eventId, signature)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/baseball/mlb/events/123", "&box=true", signature)
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});