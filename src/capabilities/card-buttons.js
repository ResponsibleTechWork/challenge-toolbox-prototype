import trelloEnums from '../shared/trello-enums';

import ChallengeLog from '../shared/challenge-log';

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

const get = async t => {

    const scope = trelloEnums.Scope.Card;
    const visibility = trelloEnums.Visibility.Shared;
    const key = trelloEnums.Key.LogEntries;
    const capability = trelloEnums.Capability.CardButtons;

    const log = await t.get(scope, visibility, key);

    // console.log(`Data stored for ${key} against ${scope} with ${visibility} access for ${capability}  : `,  log);

    const context = t.getContext();

    // console.log('Context for card badges: ', context);

    const { challenges, celebrations } = ChallengeLog.getChallengeBadgeCounts(context, log);

    const challengeText = ChallengeLog.getButtonText(trelloEnums.Type.Challenge, challenges);
    const celebrateText = ChallengeLog.getButtonText(trelloEnums.Type.Celebrate, celebrations);

    const onCloseChallengToolbox = t => {
        console.log('onCloseChallengToolbox');
    };

    const card = await t.card('name').get('name');

    console.log('card: ', JSON.stringify(card, null, 2));

    return [
        {
            icon: GRAY_ICON,
            text: challengeText,
            condition: trelloEnums.Condition.Always,
            callback: function(t){
                return t.modal({
                    title: "Challenge",                    
                    args: { type: trelloEnums.Type.Challenge },
                    url: './challenge.html',
                    fullscreen: false,
                    height: 500,                    
                    callback: onCloseChallengToolbox,
                });
            }
        },      
        {
            icon: GRAY_ICON,
            text: celebrateText,
            condition: trelloEnums.Condition.Always,
            callback: function(t){
                return t.modal({
                    title: "Celebrate",
                    args: { type: trelloEnums.Type.Celebrate },
                    url: './modals/celebrate.html',
                    fullscreen: false,
                    height: 500
                });
            }
        }
    ];
};    

export const getCardButtons = (t, opts) => {
    return get(t);
}