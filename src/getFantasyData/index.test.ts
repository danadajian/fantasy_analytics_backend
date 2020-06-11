import {getFantasyData} from "./index";
import {getEventIdsByWeek} from "../helpers/getEventIdsByWeek/getEventIdsByWeek";
import {getFantasyDataFromNFLGame} from "../helpers/getFantasyDataFromNFLGame/getFantasyDataFromNFLGame";

jest.mock('../helpers/getEventIdsByWeek/getEventIdsByWeek');
jest.mock('../helpers/getFantasyDataFromNFLGame/getFantasyDataFromNFLGame');

(getEventIdsByWeek as jest.Mock).mockResolvedValue([1, 2, 3]);
(getFantasyDataFromNFLGame as jest.Mock).mockResolvedValue([
    {some: 'stuff'},
    {some: 'other stuff'}
]);

describe('getFantasyData', () => {
    let result: any;
    const sport = 'sport';
    const week = 'week';
    const season = 'season';
    const event = {sport, week, season};

    beforeEach(async () => {
        result = await getFantasyData(event)
    });

    it('should call getEventIdsByWeek with correct params', () => {
        expect(getEventIdsByWeek).toHaveBeenCalledWith(week, season)
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