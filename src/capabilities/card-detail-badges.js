import enums from '../shared/enums';

const get = async t => {

    const scope = enums.Scope.Member;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.ChallengedPledges;

    const log = await t.get(scope, visibility, key);

    console.log(`Curent value for ${key}`,  log);

    const challenges = (log && log !== undefined) ? log.filter(entry => entry.type === enums.Type.Challenge) : [];

    const challengeText = challenges.length > 0
        ? `Challenge ${challenges.length}`
        : `Challenge`;

    console.log('challengeText: ', challengeText);

    const onCloseChallengToolbox = async t => {

        console.log('onCloseChallengToolbox');
        const context = t.getContext();
        console.log(JSON.stringify(context, null, 2));
    };

    return t
    .card("name")
    .get("name")
    .then(function (cardName) {
        return [
        {
            text: challengeText,
            callback: function(t){
                return t.modal({
                    title: "Challenge card",
                    url: './modals/challenge.html',
                    fullscreen: false,
                    height: 500,
                    callback: onCloseChallengToolbox,
                });
                }
        },      
        {
            text: "Celebrate",
            callback: function(t){
                return t.modal({
                title: "Celebrate card",
                url: './modals/celebrate.html',
                fullscreen: false,
                height: 500,
                });
            }
        },
        ];
    });
};    

export const getCardDetailBadges = (t, opts) => {
    return [{
        dynamic: () => {
            return get(t);
        },
    }];
}