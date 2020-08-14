import {callApi} from "../callApi/callApi";
import {getFantasyDataFromNBAGame} from "./getFantasyDataFromNBAGame";
import * as _ from 'lodash';

const mockNBAEventIdResponse = require('../../fixtures/nbaEventIdResponse.json');

jest.mock('../callApi/callApi');

describe('getFantasyDataFromNBAGame', () => {
    const eventId = 123;
    const signature = 'signature';

    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockNBAEventIdResponse);
            result = await getFantasyDataFromNBAGame(eventId, signature)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/basketball/nba/events/123", "&box=true", signature)
        });

        it('should return expected result', () => {
            expect(_.sortBy(result, 'name')).toEqual(_.sortBy([
                {
                    "DraftKings": 29.25,
                    "Fanduel": 35,
                    "name": "JJ Redick",
                    "playerId": 172643
                },
                {
                    "DraftKings": 18,
                    "Fanduel": 19.3,
                    "name": "E'Twaun Moore",
                    "playerId": 398424
                },
                {
                    "DraftKings": 42.75,
                    "Fanduel": 40,
                    "name": "Jrue Holiday",
                    "playerId": 457576
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Darius Miller",
                    "playerId": 469484
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Derrick Favors",
                    "playerId": 502808
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Josh Gray",
                    "playerId": 708918
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Josh Hart",
                    "playerId": 741892
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Jahlil Okafor",
                    "playerId": 842301
                },
                {
                    "DraftKings": 33.75,
                    "Fanduel": 39.1,
                    "name": "Kenrich Williams",
                    "playerId": 843742
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Zylan Cheatham",
                    "playerId": 846964
                },
                {
                    "DraftKings": 42.25,
                    "Fanduel": 44.9,
                    "name": "Brandon Ingram",
                    "playerId": 887665
                },
                {
                    "DraftKings": 12,
                    "Fanduel": 14.4,
                    "name": "Frank Jackson",
                    "playerId": 937667
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Lonzo Ball",
                    "playerId": 946714
                },
                {
                    "DraftKings": 9,
                    "Fanduel": 9.3,
                    "name": "Nickeil Alexander-Walker",
                    "playerId": 1067668
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Zion Williamson",
                    "playerId": 1132025
                },
                {
                    "DraftKings": 27.75,
                    "Fanduel": 32.4,
                    "name": "Jaxson Hayes",
                    "playerId": 1140887
                },
                {
                    "DraftKings": 34,
                    "Fanduel": 38.2,
                    "name": "Nicolo Melli",
                    "playerId": 1178793
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Pau Gasol",
                    "playerId": 3494
                },
                {
                    "DraftKings": 15.5,
                    "Fanduel": 16.8,
                    "name": "Carmelo Anthony",
                    "playerId": 172890
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Anthony Tolliver",
                    "playerId": 229905
                },
                {
                    "DraftKings": 20.75,
                    "Fanduel": 23.6,
                    "name": "Kent Bazemore",
                    "playerId": 410764
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Damian Lillard",
                    "playerId": 463121
                },
                {
                    "DraftKings": 33,
                    "Fanduel": 29.8,
                    "name": "Hassan Whiteside",
                    "playerId": 513234
                },
                {
                    "DraftKings": 42,
                    "Fanduel": 50.3,
                    "name": "CJ McCollum",
                    "playerId": 522878
                },
                {
                    "DraftKings": 21.75,
                    "Fanduel": 22,
                    "name": "Rodney Hood",
                    "playerId": 603106
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Jusuf Nurkic",
                    "playerId": 830642
                },
                {
                    "DraftKings": 12.5,
                    "Fanduel": 13.4,
                    "name": "Mario Hezonja",
                    "playerId": 840595
                },
                {
                    "DraftKings": 8.5,
                    "Fanduel": 9.4,
                    "name": "Skal Labissiere",
                    "playerId": 891349
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Zach Collins",
                    "playerId": 955887
                },
                {
                    "DraftKings": 3,
                    "Fanduel": 4,
                    "name": "Gary Trent Jr.",
                    "playerId": 1060908
                },
                {
                    "DraftKings": 24.25,
                    "Fanduel": 28.6,
                    "name": "Anfernee Simons",
                    "playerId": 1121307
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Jaylen Hoard",
                    "playerId": 1132326
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Moses Brown",
                    "playerId": 1134769
                },
                {
                    "DraftKings": 33.25,
                    "Fanduel": 35.7,
                    "name": "Nassir Little",
                    "playerId": 1138391
                }
            ], 'name'))
        });
    });

    describe('error case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getFantasyDataFromNBAGame(eventId, signature)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/basketball/nba/events/123", "&box=true", signature)
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});