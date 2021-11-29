import enums from '../shared/enums';

import ChallengeLog from '../shared/challenge-log';

const get = async t => {

    const scope = enums.Scope.Card;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.LogEntries;
    const capability = enums.Capability.CardBadges;

    const log = await t.get(scope, visibility, key);

    console.log(`Data stored for ${key} against ${scope} with ${visibility} access for ${capability}  : `,  log);

    const context = t.getContext();

    console.log('Context for card badges: ', context);

    const { challenges, celebrations } = ChallengeLog.getChallengeBadgeCounts(context, log);

    const challengeText = ChallengeLog.getButtonText(enums.Type.Challenge, challenges);
    const celebrateText = ChallengeLog.getButtonText(enums.Type.Celebrate, celebrations);

    console.log(`Current value for ${key} for card-badges`,  log);

    // check for card in log - if there's a match return challenges, celebrations, both or neither
    // match count agsainst specific card

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