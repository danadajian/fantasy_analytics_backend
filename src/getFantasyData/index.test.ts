import {getFantasyData} from "./index";
import {getEventIds} from "../helpers/getEventIds/getEventIds";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNFLGame";
import {getFantasyDataFromMLBGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromMLBGame";
import {getFantasyDataFromNBAGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNBAGame";
import {getFantasyDataFromNHLGame} from "../helpers/getFantasyDataFromEvent/getFantasyDataFromNHLGame";

jest.mock('../helpers/getEventIds/getEventIds');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromMLBGame');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromNFLGame');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromNBAGame');
jest.mock('../helpers/getFantasyDataFromEvent/getFantasyDataFromNHLGame');

(getEventIds as jest.Mock).mockResolvedValue([1, 2, 3]);
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

describe('getFantasyData', () => {
    const season = 1969;

    describe('mlb case', () => {
        let result: any;
        const sport = 'mlb';
        const date = 'date';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromMLBGame with correct params', (eventId) => {
                expect(getFantasyDataFromMLBGame).toHaveBeenCalledWith(eventId)
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

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNFLGame with correct params', (eventId) => {
                expect(getFantasyDataFromNFLGame).toHaveBeenCalledWith(eventId)
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
        const date = 'date';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNBAGame with correct params', (eventId) => {
                expect(getFantasyDataFromNBAGame).toHaveBeenCalledWith(eventId)
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
        const date = 'date';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNHLGame with correct params', (eventId) => {
                expect(getFantasyDataFromNHLGame).toHaveBeenCalledWith(eventId)
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
