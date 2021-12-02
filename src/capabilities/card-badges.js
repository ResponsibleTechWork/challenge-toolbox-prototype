import trelloEnums from '../shared/trello-enums';

import ChallengeLog from '../shared/challenge-log';

const get = async t => {

    const scope = trelloEnums.Scope.Card;
    const visibility = trelloEnums.Visibility.Shared;
    const key = trelloEnums.Key.LogEntries;

    const log = await t.get(scope, visibility, key);

    const context = t.getContext();

    const { challenges, celebrations } = ChallengeLog.getChallengeBadgeCounts(context, log);

    const challengeText = ChallengeLog.getButtonText(trelloEnums.Type.Challenge, challenges);
    const celebrateText = ChallengeLog.getButtonText(trelloEnums.Type.Celebrate, celebrations);

    if(challenges === 0 && celebrations === 0) return [];

    const badges = [
        {
            text: challengeText,
            color: "red"
        },
        {
            text: celebrateText,
            color: "green"
        },
    ];

    const badgeArray = [];
    
    if(challenges !== 0) {
        badgeArray.push(badges[0]);
    } if(challenges !== 0) {
        badgeArray.push(badges[1]);
    }

    return t
    .card('id', 'name')            
    .then(function (card) {
        return badgeArray;
    });
};

export const getCardBadges = (t, opts) => {
    return get(t);
}