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


    it('log should remove first pledge', () => {
        challengeLog.togglePledge(context, pledge);
        expect(challengeLog.getLog()).toStrictEqual([])
    });

});