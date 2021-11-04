import enums from '../shared/enums';

import { ChallengeLog } from '../shared/challenge-log';

export const getCardBadges = (t, opts) => {    

    const scope = enums.Scope.Member;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.LogEntries;
    const capability = enums.Capability.CardBadges;

    const log = await t.get(scope, visibility, key);

    console.log(`Data stored for ${key} against ${scope} with ${visibility} access for ${capability}  : `,  log);

    const challengeText = ChallengeLog.getButtonText(log, capability, enums.Type.Challenge);
    const celebrateText = ChallengeLog.getButtonText(log, capability, enums.Type.Celebrate);

    console.log(`Current value for ${key} for card-badges`,  log);

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