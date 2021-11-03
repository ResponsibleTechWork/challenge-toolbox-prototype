import enums from '../shared/enums';
export const getCardDetailBadges = (t, opts) => {

    let challengeText = `Challenge`;

    const onDone = async t => {

        console.log('onDone inside');
        const context = t.getContext();
        console.log(JSON.stringify(context, null, 2));

        const scope = enums.Scope.Member;
        const visibility = enums.Visibility.Shared;
        const key = 'challenged pledges';

        const log = await t.get(scope, visibility, key);

        console.log('returned save object: ',  log);

        const challenges = log.filter(entry => entry.type === enums.Type.Challenge);

        challengeText = challenges.length > 0
            ? `Challenge ${challenges.length}`
            : `Challenge`;
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
                    callback: onDone,
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