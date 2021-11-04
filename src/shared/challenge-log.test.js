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
        const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, pledge);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...pledge, reasons: [] }
            }
        ]);
        expect(isPledgeNowLogged).toBe(true);
    });

    it('log should not include any reasons for first pledge', () => {
        expect(challengeLog.getReasonsForCurrentPledge()).toEqual([]);
    });

    it('log should include first reason', () => {
        const { isReasonNowLogged, updatedReasons } = challengeLog.toggleReason(reason);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...pledge, reasons: [ reason ] }
            }
        ]);
        expect(isReasonNowLogged).toBe(true);
        expect(updatedReasons.length).toBe(1);
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

describe('test for islogTruthy function', () => {

    const type = enums.Type.Challenge;

    const challengeLog = new ChallengeLog(type);

    it('should be true', () => {
        expect(challengeLog.islogTruthy(1)).toBe(true);
        expect(challengeLog.islogTruthy('1')).toBe(true);
        expect(challengeLog.islogTruthy({a:1})).toBe(true);
        expect(challengeLog.islogTruthy({"a":1})).toBe(true);
        expect(challengeLog.islogTruthy([1,2])).toBe(true);
    });

    it('should be false', () => {
        expect(challengeLog.islogTruthy(null)).toBe(false);
        expect(challengeLog.islogTruthy(undefined)).toBe(false);
        expect(challengeLog.islogTruthy({})).toBe(false);
        expect(challengeLog.islogTruthy([])).toBe(false);
    });
});

describe('test for islogFalsy function', () => {

    const type = enums.Type.Challenge;

    const challengeLog = new ChallengeLog(type);

    it('should be false', () => {
        expect(challengeLog.islogFalsy(1)).toBe(false);
        expect(challengeLog.islogFalsy('1')).toBe(false);
        expect(challengeLog.islogFalsy({a:1})).toBe(false);
        expect(challengeLog.islogFalsy({"a":1})).toBe(false);
        expect(challengeLog.islogFalsy([1,2])).toBe(false);
    });

    it('should be true', () => {
        expect(challengeLog.islogFalsy(null)).toBe(true);
        expect(challengeLog.islogFalsy(undefined)).toBe(true);
        expect(challengeLog.islogFalsy({})).toBe(true);
        expect(challengeLog.islogFalsy([])).toBe(true);
    });
});

describe.only('test for capability badge text', () => {
    let log;
    it('should return "Challenge" as initial text for the Challenge badge', () => {
        const text = ChallengeLog.getButtonText(log, enums.Capability.CardBadges, enums.Type.Challenge);
        expect(text).toBe('Challenge');
    });
    it('should return "Celebrate" as initial text for the Celebrate badge', () => {
        const text = ChallengeLog.getButtonText(log, enums.Capability.CardBadges, enums.Type.Celebrate);
        expect(text).toBe('Celebrate');
    });
});