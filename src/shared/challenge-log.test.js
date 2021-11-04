import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

describe('tests for instances of ChallengeLog', () => {

    const type = enums.Type.Challenge;

    const challengeLog = new ChallengeLog(type);

    const context = {
        board: 'board #1',
        member: 'member #1',
        card: 'card #1',
    };

    const pledge = {
        id: 1,
        text: 'pledge #1'
    };

    const reason = {
        id: 1,
        text: 'reason #1'
    }

    it('log should initially be empty', () => {
        expect(challengeLog.getLog()).toEqual([]);
    });

    it('log should include first pledge', () => {
        challengeLog.togglePledge(context, pledge);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...pledge, reasons: [] }
            }
        ])
    });

    it('log should include first reason', () => {
        challengeLog.toggleReason(reason);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...pledge, reasons: [ reason ] }
            }
        ])
    });

    it('log should remove first reason when toggled', () => {
        challengeLog.toggleReason(reason);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...pledge, reasons: [ ] }
            }
        ])
    });

    it('log should remove first pledge when toggled', () => {
        challengeLog.togglePledge(context, pledge);
        expect(challengeLog.getLog()).toStrictEqual([]);
    });

});

describe('tests for challenge reasons', () => {

    const type = enums.Type.Challenge;

    const challengeLog = new ChallengeLog(type);

    const context = {
        board: 'board #1',
        member: 'member #1',
        card: 'card #1',
    };

    const pledge = {
        id: 1,
        text: 'pledge #1'
    };

    const reason = {
        id: 1,
        text: 'reason #1'
    }

    const reason2 = {
        id: 2,
        text: 'reason #2'
    }

    it('when no reason selected count should be blank', () => {
        const count = challengeLog.getReasonsCount();
        expect(count).toBe('');
    });

    it('when reason selected count should be "1"', () => {        
        challengeLog.togglePledge(context, pledge);
        challengeLog.toggleReason(reason); 
        const count = challengeLog.getReasonsCount();   
        expect(count).toBe('1');
    });

    it('when second reason selected count should be "2"', () => {                
        challengeLog.toggleReason(reason2);
        const count = challengeLog.getReasonsCount();
        expect(count).toBe('2');
    });

    it('when first reason reselected count should drop to "1"', () => {                
        challengeLog.toggleReason(reason);
        const count = challengeLog.getReasonsCount();
        expect(count).toBe('1');
    });

});