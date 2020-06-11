import {getFantasyData} from "./index";
import {getEventIds} from "../helpers/getEventIds/getEventIds";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromNFLGame/getFantasyDataFromNFLGame";
import {getFantasyDataFromMLBGame} from "../helpers/getFantasyDataFromMLBGame/getFantasyDataFromMLBGame";

jest.mock('../helpers/getEventIds/getEventIds');
jest.mock('../helpers/getFantasyDataFromMLBGame/getFantasyDataFromMLBGame');
jest.mock('../helpers/getFantasyDataFromNFLGame/getFantasyDataFromNFLGame');

(getEventIds as jest.Mock).mockResolvedValue([1, 2, 3]);
(getFantasyDataFromMLBGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);
(getFantasyDataFromNFLGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);

describe('getFantasyData', () => {
    describe('non-nfl case', () => {
        let result: any;
        const sport = 'mlb';
        const season = 'season';
        const date = 'date';
        const event = {sport, season, date};

        beforeEach(async () => {
            result = await getFantasyData(event)
        });

        it('should call getEventIdsByWeek with correct params', () => {
            expect(getEventIds).toHaveBeenCalledWith(sport, season, date, undefined)
        });

        it.each([1, 2, 3])(
            'should call getFantasyDataFromNFLGame with correct params', (eventId) => {
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
        const season = 'season';
        const week = 'week';
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
});