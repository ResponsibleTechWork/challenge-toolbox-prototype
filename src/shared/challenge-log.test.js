import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

describe('tests for instances of ChallengeLog', () => {

    const challengeLog = new ChallengeLog(enums.Type.Challenge);

    const context = {
        board: 'board #1',
        member: 'member #1',
        card: 'card #1',
    };

    const pledgeId = 1;

    const type = enums.Type.Challenge;

    it('log should initially be empty', () => {
        expect(challengeLog.getLog()).toEqual([]);
    });

    it('log should include first record', () => {
        challengeLog.record(context, type, pledgeId);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: {
                    id: pledgeId
                }, 
            }
        ])
    });

});