import enums from '../shared/enums';

import { ChallengeLog } from '../shared/challenge-log';

const get = async t => {

    const scope = enums.Scope.Member;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.LogEntries;
    const capability = enums.Capability.CardBadges;

    const log = await t.get(scope, visibility, key);

    console.log(`Data stored for ${key} against ${scope} with ${visibility} access for ${capability}  : `,  log);

    const context = t.getContext();

    console.log('Context for card badges: ', context);

    const card = await t.card('name').get('name');

    console.log('card: ', JSON.stringify(card, null, 2));

    const challengeText = ChallengeLog.getButtonText(log, capability, enums.Type.Challenge);
    const celebrateText = ChallengeLog.getButtonText(log, capability, enums.Type.Celebrate);

    console.log(`Current value for ${key} for card-badges`,  log);

    // check for card in log - if there's a match return challenges, celebrations, both or neither
    // match count agsainst specific card

    return t
        .card('id', 'name')            
        .then(function (card) {
        return [
            {
            text: challengeText,
            color: "red"
            },
            {
            text: celebrateText,
            color: "green"
            },
        ];
        });
};

export const getCardBadges = (t, opts) => {
    return get(t);
}