import trelloEnums from '../shared/trello-enums';
import ChallengeLog from '../shared/challenge-log';

describe('tests for instances of ChallengeLog', () => {

    const type = trelloEnums.Type.Challenge;

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

describe('tests for trello labels', () => {

    const type = trelloEnums.Type.Challenge;

    const challengeLog = new ChallengeLog(type);

    const context = {
        board: 'board #1',
        member: 'member #1',
        card: 'card #1',
    };

    const pledge = {
        id: "2",
        text: "Emotional harm"
    };

    it('log should handle pledge with string id', () => {

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
});

describe('tests for challenge reasons', () => {

    const type = trelloEnums.Type.Challenge;

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

describe('tests for mixing challenges and celebrations', () => {

    let type = trelloEnums.Type.Challenge;

    const challengeLog = new ChallengeLog(type);

    const context = {
        board: 'board #1',
        member: 'member #1',
        card: 'card #1',
    };

    const challengePledge = {
        id: 1,
        text: 'pledge #1'
    };

    const celebratePledge = {
        id: 1,
        text: 'pledge #1'
    };

    const challengeReason = {
        id: 1,
        text: 'reason #1'
    };

    const celebrateReason = {
        id: 1,
        text: 'reason #1'
    };

    it('log should initially be empty', () => {
        expect(challengeLog.getLog()).toEqual([]);
    });

    it('log should contain one entry with a challenge pledge, and one reason', () => {
        const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, challengePledge);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...challengePledge, reasons: [] }
            }
        ]);
        const { isReasonNowLogged, updatedReasons } = challengeLog.toggleReason(challengeReason);
        expect(challengeLog.getLog()).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...challengePledge, reasons: [ challengeReason ] }
            }
        ]);
        expect(isReasonNowLogged).toBe(true);
        expect(updatedReasons.length).toBe(1);
    });

    it('log should contain entries for a challenge and a celebration, each with one reason', () => {

        let type = trelloEnums.Type.Celebrate;

        challengeLog.setType(type);

        const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, celebratePledge);

        expect(challengeLog.getLog().find(entry => entry.type === type)).toStrictEqual({
                "board": "board #1",
                "card": "card #1",
                "member": "member #1",
                "pledge": {
                    "id": 1,
                    "reasons": [],
                    "text": "pledge #1"
                },
                "type": "celebrate"
            });
        const { isReasonNowLogged, updatedReasons } = challengeLog.toggleReason(celebrateReason);
        expect(challengeLog.getLog().filter(entry => entry.type === type)).toStrictEqual([
            {
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: { ...celebratePledge, reasons: [ celebrateReason ] }
            }
        ]);
        expect(isReasonNowLogged).toBe(true);
        expect(updatedReasons.length).toBe(1);
    });
});

describe('test for islogTruthy function', () => {

    const type = trelloEnums.Type.Challenge;

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

    const type = trelloEnums.Type.Challenge;

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

describe('test for capability badge text', () => {
    let context, log;
    const { challenges, celebrations } = ChallengeLog.getChallengePledgeCounts(context, log);
    it('should return "Challenge" as initial text for the Challenge badge', () => {
        const { challenges, celebrations } = ChallengeLog.getChallengePledgeCounts(context, log);
        const text = ChallengeLog.getButtonText(trelloEnums.Type.Challenge, challenges);
        expect(text).toBe('Challenge');
    });
    it('should return "Celebrate" as initial text for the Celebrate badge', () => {
        const { challenges, celebrations } = ChallengeLog.getChallengePledgeCounts(context, log);
        const text = ChallengeLog.getButtonText(trelloEnums.Type.Celebrate, celebrations);
        expect(text).toBe('Celebrate');
    });
    it('should return "Challenge (2)" as text for the Challenge badge when pledge has been challenged twice', () => {
        
        context = {
            "version": "build-9130",
            "member": "589471d5096aa1f280b53d4d",
            "permissions": {
                "board": "write",
                "organization": "write",
                "card": "write"
            },
            "organization": "60c218737c4fef8e93049552",
            "board": "613873560579fa6ac33c26cb",
            "card": "61545338699b3d6656e60a76",
            "command": "card-badges"
        };

        log = [
            {
                "type": "challenge",
                "board": "613873560579fa6ac33c26cb",
                "member": "589471d5096aa1f280b53d4d",
                "card": "61545338699b3d6656e60a76",
                "pledge": {
                    "id": 1,
                    "text": "respect people",
                    "reasons": [
                        {
                            "id": 2,
                            "text": "misleading"
                        },
                        {
                            "id": 1,
                            "text": "annoying"
                        }
                    ]
                }
            },
            {
                "type": "challenge",
                "board": "613873560579fa6ac33c26cb",
                "member": "589471d5096aa1f280b53d4d",
                "card": "61545338699b3d6656e60a76",
                "pledge": {
                    "id": 2,
                    "text": "protect against abuse",
                    "reasons": [
                        {
                            "id": 1,
                            "text": "annoying"
                        }
                    ]
                }
            }
        ];

        const { challenges, celebrations } = ChallengeLog.getChallengePledgeCounts(context, log);
        const text = ChallengeLog.getButtonText(trelloEnums.Type.Challenge, challenges);
        expect(text).toBe('Challenges (2)');
    });
});

describe('test for card badge counts', () => {
    let context, log;
    it('should return 0 for all badge counts where log is missing', () => {
        expect(ChallengeLog.getChallengePledgeCounts(context, log)).toStrictEqual(
            { challenges: 0, celebrations: 0 }
        );
    });

    it('should return 2 for challenge badge count, and 0 for celebrations badge count for card in context', () => {

        context = {
            "version": "build-9130",
            "member": "589471d5096aa1f280b53d4d",
            "permissions": {
                "board": "write",
                "organization": "write",
                "card": "write"
            },
            "organization": "60c218737c4fef8e93049552",
            "board": "613873560579fa6ac33c26cb",
            "card": "61545338699b3d6656e60a76",
            "command": "card-badges"
        };
    
        log = [
            {
                "type": "challenge",
                "board": "613873560579fa6ac33c26cb",
                "member": "589471d5096aa1f280b53d4d",
                "card": "61545338699b3d6656e60a76",
                "pledge": {
                    "id": 1,
                    "text": "respect people",
                    "reasons": [
                        {
                            "id": 2,
                            "text": "misleading"
                        },
                        {
                            "id": 1,
                            "text": "annoying"
                        }
                    ]
                }
            },
            {
                "type": "challenge",
                "board": "613873560579fa6ac33c26cb",
                "member": "589471d5096aa1f280b53d4d",
                "card": "61545338699b3d6656e60a76",
                "pledge": {
                    "id": 2,
                    "text": "protect against abuse",
                    "reasons": [
                        {
                            "id": 1,
                            "text": "annoying"
                        }
                    ]
                }
            }
        ];
    
        expect(ChallengeLog.getChallengePledgeCounts(context, log)).toStrictEqual(
            { challenges: 2, celebrations: 0 }
        );
    });

});

describe('test for vote count', () => {
    const context = { card: 1 };
    const log = [
        { 
            card: 1,
            member: 1,
            type: trelloEnums.Type.Challenge
        },
        { 
            card: 1,
            member: 1,
            type: trelloEnums.Type.Challenge
        },
        { 
            card: 1,
            member: 2,
            type: trelloEnums.Type.Challenge
        },
    ];
    it('where member has voted twice on one challenge', () => {
        const { challenges, celebrations } = ChallengeLog.getChallengeBadgeCounts(context, log);
        expect(challenges).toStrictEqual(2);
        expect(celebrations).toStrictEqual(0);
    });
    it('where member has also voted for on new celebration', () => {
        log.push({ 
            card: 1,
            member: 2,
            type: trelloEnums.Type.Celebrate
        });
        const { challenges, celebrations } = ChallengeLog.getChallengeBadgeCounts(context, log);
        expect(challenges).toStrictEqual(2);
        expect(celebrations).toStrictEqual(1);
    });
});