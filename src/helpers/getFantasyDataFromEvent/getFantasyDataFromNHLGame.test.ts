import {callApi} from "../callApi/callApi";
import {getFantasyDataFromNHLGame} from "./getFantasyDataFromNHLGame";
import * as _ from 'lodash';

const mockNHLEventIdResponse = require('../../fixtures/nhlEventIdResponse.json');

jest.mock('../callApi/callApi');

describe('getFantasyDataFromNHLGame', () => {
    const eventId = 123;
    const signature = 'signature';

    describe('success case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue(mockNHLEventIdResponse);
            result = await getFantasyDataFromNHLGame(eventId, signature)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/hockey/nhl/events/123", "&box=true", signature)
        });

        it('should return expected result', () => {
            expect(_.sortBy(result, 'name')).toEqual(_.sortBy([
                {
                    "DraftKings": 21.1,
                    "Fanduel": 18.4,
                    "name": "Tuukka Rask",
                    "playerId": 300802
                },
                {
                    "DraftKings": 4.5,
                    "Fanduel": 4.8,
                    "name": "David Krejci",
                    "playerId": 325618
                },
                {
                    "DraftKings": 2.8,
                    "Fanduel": 3.2,
                    "name": "David Backes",
                    "playerId": 321868
                },
                {
                    "DraftKings": 4.3,
                    "Fanduel": 4.8,
                    "name": "Peter Cehlarik",
                    "playerId": 743270
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Sean Kuraly",
                    "playerId": 610872
                },
                {
                    "DraftKings": 1.3,
                    "Fanduel": 1.6,
                    "name": "Trent Frederic",
                    "playerId": 920239
                },
                {
                    "DraftKings": 6.9,
                    "Fanduel": 4.8,
                    "name": "Danton Heinen",
                    "playerId": 831469
                },
                {
                    "DraftKings": 8,
                    "Fanduel": 11.7,
                    "name": "Torey Krug",
                    "playerId": 652695
                },
                {
                    "DraftKings": 6.9,
                    "Fanduel": 4.8,
                    "name": "Kevan Miller",
                    "playerId": 594808
                },
                {
                    "DraftKings": 6.3,
                    "Fanduel": 10.1,
                    "name": "Brad Marchand",
                    "playerId": 414433
                },
                {
                    "DraftKings": 3,
                    "Fanduel": 3.2,
                    "name": "Brandon Carlo",
                    "playerId": 878156
                },
                {
                    "DraftKings": 27.5,
                    "Fanduel": 32.5,
                    "name": "David Pastrnak",
                    "playerId": 831092
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Chris Wagner",
                    "playerId": 555392
                },
                {
                    "DraftKings": 10.6,
                    "Fanduel": 14.4,
                    "name": "Zdeno Chara",
                    "playerId": 170750
                },
                {
                    "DraftKings": 8.4,
                    "Fanduel": 6.4,
                    "name": "Joakim Nordstrom",
                    "playerId": 554554
                },
                {
                    "DraftKings": 1.5,
                    "Fanduel": 1.6,
                    "name": "Jake DeBrusk",
                    "playerId": 878045
                },
                {
                    "DraftKings": 4.1,
                    "Fanduel": 4.8,
                    "name": "Charlie McAvoy",
                    "playerId": 920223
                },
                {
                    "DraftKings": 12.1,
                    "Fanduel": 16,
                    "name": "Patrice Bergeron",
                    "playerId": 230685
                },
                {
                    "DraftKings": 4.3,
                    "Fanduel": 4.8,
                    "name": "John Moore",
                    "playerId": 504301
                },
                {
                    "DraftKings": 15.1,
                    "Fanduel": 22.4,
                    "name": "Carter Hart",
                    "playerId": 920353
                },
                {
                    "DraftKings": 7.1,
                    "Fanduel": 8,
                    "name": "Ivan Provorov",
                    "playerId": 878038
                },
                {
                    "DraftKings": 8.2,
                    "Fanduel": 6.4,
                    "name": "Robert Hagg",
                    "playerId": 743047
                },
                {
                    "DraftKings": 13,
                    "Fanduel": 17.3,
                    "name": "Oskar Lindblom",
                    "playerId": 831501
                },
                {
                    "DraftKings": 1.3,
                    "Fanduel": 1.6,
                    "name": "Mikhail Vorobyev",
                    "playerId": 878246
                },
                {
                    "DraftKings": 4.5,
                    "Fanduel": 4.8,
                    "name": "Nolan Patrick",
                    "playerId": 1057100
                },
                {
                    "DraftKings": 5.8,
                    "Fanduel": 6.4,
                    "name": "Radko Gudas",
                    "playerId": 554520
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Phil Varone",
                    "playerId": 651744
                },
                {
                    "DraftKings": 13,
                    "Fanduel": 16.8,
                    "name": "Claude Giroux",
                    "playerId": 329656
                },
                {
                    "DraftKings": 10.8,
                    "Fanduel": 14.9,
                    "name": "Sean Couturier",
                    "playerId": 600101
                },
                {
                    "DraftKings": 14.5,
                    "Fanduel": 21.3,
                    "name": "Jakub Voracek",
                    "playerId": 392948
                },
                {
                    "DraftKings": 1.3,
                    "Fanduel": 1.6,
                    "name": "Christian Folin",
                    "playerId": 824587
                },
                {
                    "DraftKings": 8.6,
                    "Fanduel": 9.6,
                    "name": "Scott Laughton",
                    "playerId": 659866
                },
                {
                    "DraftKings": 26.4,
                    "Fanduel": 32.2,
                    "name": "Travis Sanheim",
                    "playerId": 831082
                },
                {
                    "DraftKings": 6,
                    "Fanduel": 6.4,
                    "name": "James van Riemsdyk",
                    "playerId": 392943
                },
                {
                    "DraftKings": 1.3,
                    "Fanduel": 1.6,
                    "name": "Andrew MacDonald",
                    "playerId": 340229
                },
                {
                    "DraftKings": 0,
                    "Fanduel": 0,
                    "name": "Michael Raffl",
                    "playerId": 736539
                },
                {
                    "DraftKings": 7.3,
                    "Fanduel": 8,
                    "name": "Wayne Simmonds",
                    "playerId": 409789
                },
                {
                    "DraftKings": 12.3,
                    "Fanduel": 16.5,
                    "name": "Travis Konecny",
                    "playerId": 878055
                }
            ], 'name'))
        });
    });

    describe('error case', () => {
        let result: any;

        beforeEach(async () => {
            (callApi as jest.Mock).mockResolvedValue({an: 'error'});
            result = await getFantasyDataFromNHLGame(eventId, signature)
        });

        it('should call callApi with correct params', () => {
            expect(callApi).toHaveBeenCalledWith("stats/hockey/nhl/events/123", "&box=true", signature)
        });

        it('should return expected result', () => {
            expect(result).toEqual([])
        });
    });

    afterEach(() => {
        jest.clearAllMocks()
    })
});