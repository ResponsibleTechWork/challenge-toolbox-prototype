import { add, logChallenge } from './funcs';

describe('tests for the funcs functions', () => {
    it('add', () => {
        const result = add(2,2);
        expect(result).toBe(4);
    });
    let pledgesLog = [];
    it('logChallenge', () => {
        const context = {
            board: 'board 1',
            member: 'member 1',
            card: 'card 1'
        };
        const pledgeId = 1;        
        pledgesLog = logChallenge(pledgesLog, context, pledgeId)        
        expect(pledgesLog).toEqual([{
            board: 'board 1',
            member: 'member 1',
            card: 'card 1',
            pledge: { id: 1 },
            type: 'challenge'
        }]);
    });
    it('logChallenge', () => {
        const context = {
            board: 'board 1',
            member: 'member 1',
            card: 'card 1'
        };
        const pledgeId = 1;        
        pledgesLog = logChallenge(pledgesLog, context, pledgeId)
        expect(pledgesLog).toEqual([]);
    });
});