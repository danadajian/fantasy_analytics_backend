import {getFantasyData} from "./index";
import {getEventIds} from "../helpers/getEventIds/getEventIds";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNFLGame";
import {getFantasyDataFromMLBGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromMLBGame";
import {getFantasyDataFromNBAGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNBAGame";
import {getFantasyDataFromNHLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNHLGame";
import {getSignature} from "../helpers/getSignature/getSignature";
import {API_DELAY_MS, delay} from "../constants";

jest.mock('../helpers/getEventIds/getEventIds');
jest.mock('../helpers/getSignature/getSignature');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromMLBGame');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromNFLGame');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromNBAGame');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromNHLGame');
jest.mock('../constants');

(getEventIds as jest.Mock).mockResolvedValue([1, 2, 3]);
(getSignature as jest.Mock).mockReturnValue('signature');
(getFantasyDataFromMLBGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);
(getFantasyDataFromNFLGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);
(getFantasyDataFromNBAGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);
(getFantasyDataFromNHLGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);
(delay as jest.Mock).mockResolvedValue('delay complete');

describe('getFantasyData', () => {
    const season = 1969;
    const date = 'date';

    describe('mlb case', () => {
        let result: any;
        const sport = 'mlb';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it('should call getSignature with correct params', () => {
            expect(getSignature).toHaveBeenCalledWith(process.env.API_KEY, process.env.API_SECRET)
        });

        it('should call delay with correct params', () => {
            expect(delay).toHaveBeenCalledWith(API_DELAY_MS)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromMLBGame with correct params', (eventId) => {
                expect(getFantasyDataFromMLBGame).toHaveBeenCalledWith(eventId, 'signature')
            }
        );

        it('should return expected result', () => {
            expect(result).toEqual([
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'}
            ])
        });
    });

    describe('nfl case', () => {
        let result: any;
        const sport = 'nfl';
        const week = 69;
        const event = {sport, season, week};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, undefined, week)
        });

        it('should call getSignature with correct params', () => {
            expect(getSignature).toHaveBeenCalledWith(process.env.API_KEY, process.env.API_SECRET)
        });

        it('should call delay with correct params', () => {
            expect(delay).toHaveBeenCalledWith(API_DELAY_MS)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNFLGame with correct params', (eventId) => {
                expect(getFantasyDataFromNFLGame).toHaveBeenCalledWith(eventId, 'signature')
            }
        );

        it('should return expected result', () => {
            expect(result).toEqual([
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'}
            ])
        });
    });

    describe('nba case', () => {
        let result: any;
        const sport = 'nba';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it('should call getSignature with correct params', () => {
            expect(getSignature).toHaveBeenCalledWith(process.env.API_KEY, process.env.API_SECRET)
        });

        it('should call delay with correct params', () => {
            expect(delay).toHaveBeenCalledWith(API_DELAY_MS)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNBAGame with correct params', (eventId) => {
                expect(getFantasyDataFromNBAGame).toHaveBeenCalledWith(eventId, 'signature')
            }
        );

        it('should return expected result', () => {
            expect(result).toEqual([
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'}
            ])
        });
    });

    describe('nhl case', () => {
        let result: any;
        const sport = 'nhl';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it('should call getSignature with correct params', () => {
            expect(getSignature).toHaveBeenCalledWith(process.env.API_KEY, process.env.API_SECRET)
        });

        it('should call delay with correct params', () => {
            expect(delay).toHaveBeenCalledWith(API_DELAY_MS)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNHLGame with correct params', (eventId) => {
                expect(getFantasyDataFromNHLGame).toHaveBeenCalledWith(eventId, 'signature')
            }
        );

        it('should return expected result', () => {
            expect(result).toEqual([
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'},
                {some: 'stuff'},
                {some: 'other stuff'}
            ])
        });
    });
});
