import enums from '../shared/enums';

const get = async t => {

    const scope = enums.Scope.Member;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.ChallengedPledges;

    const log = await t.get(scope, visibility, key);

    console.log(`Current value for ${key}`,  log);

    const challenges = (log && log !== undefined) ? log.filter(entry => entry.type === enums.Type.Challenge) : [];
    const celebrations = (log && log !== undefined) ? log.filter(entry => entry.type === enums.Type.Celebtrate) : [];

    const challengeText = challenges.length > 0
        ? `Challenge ${challenges.length}`
        : `Challenge`;

    const celebrationText = celebrations.length > 0
        ? `Challenge ${celebrations.length}`
        : `Challenge`;

    console.log('challengeText: ', challengeText);
    console.log('celebrationText: ', celebrationText);

    const onCloseChallengToolbox = t => {

        console.log('onCloseChallengToolbox');
        // const context = t.getContext();
        // console.log(JSON.stringify(context, null, 2));
    };

    const card = await t.card('name').get('name');

    console.log('card: ', JSON.stringify(card, null, 2));

    return [
        {
            text: challengeText,
            color: 'blue',
            callback: function(t){
                return t.modal({
                    title: "Challenge cards",
                    url: './modals/challenge.html',
                    fullscreen: false,
                    height: 500,
                    callback: onCloseChallengToolbox,
                });
            }
        },      
        {
            text: celebrationText,
            color: 'green',
            callback: function(t){
                return t.modal({
                    url: './modals/celebrate.html',
                    fullscreen: false,
                    height: 500,
                    callback: onCloseChallengToolbox,
                });
            }
        },
        ];
    // });
};    

export const getCardDetailBadges = (t, opts) => {
    return { dynamic: () => {
        return get(t);
    }}
}