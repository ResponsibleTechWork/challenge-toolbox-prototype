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
        text: 'pldege #1'
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
        expect(challengeLog.getLog()).toStrictEqual([])
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
        text: 'pldege #1'
    };

    const reason = {
        id: 1,
        text: 'reason #1'
    }

    it('when no reasons selected notification should be blank', () => {
        const reasons = challengeLog.getPledge().reasons;
        const reasonCount = (reasons && reasons.length > 0) ? reasons.length : 0;
        const notification = reasonCount === 0 ? '' : reasonCount;    
        expect(reasonCount).toBe(0);
        expect(notification).toBe('');
    });

    challengeLog.togglePledge(context, pledge);
    challengeLog.toggleReason(reason);

    console.log(challengeLog.getLog()[0].pledge.reasons);

    it('when reason selected notification should be 1', () => {        
        const reasons = challengeLog.getLog()[0].pledge.reasons;
        const reasonCount = (reasons && reasons.length > 0) ? reasons.length : 0;
        const notification = reasonCount === 0 ? '' : reasonCount;    
        expect(reasonCount).toBe(1);
        expect(notification).toBe(1);
    });

});