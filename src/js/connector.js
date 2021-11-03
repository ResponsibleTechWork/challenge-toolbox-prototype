import enums from '../shared/enums';

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

const { log, warn, error } = window.console;

// const onBtnClick = function (t, opts) {    
//     const context = t.getContext();
//     console.log(JSON.stringify(context, null, 2));

//     t.get('card', 'shared', 'isClicked').then(function(data) {
//         console.log('card clicked callback, properties of isClicked: ', JSON.stringify(data, null, 2));
//     });
//   };

// const onDone = (t, opts) => {
//     log('onDone outside');
//     const context = t.getContext();
//     log(JSON.stringify(context, null, 2));
// };

window.TrelloPowerUp.initialize({
    // 'card-buttons': function (t, opts) {
    //     const context = t.getContext();
    //     console.log(JSON.stringify(context, null, 2));
    //     const myKeyValueObject = {
    //         'isClicked': 'you bectcha!',
    //       };
    //     t.set('card', 'shared', myKeyValueObject);
    //     return [{
    //         icon: GRAY_ICON,
    //         text: 'Add challenge--',
    //         callback: onBtnClick,
    //         condition: 'edit'
    //     }, {
    //         icon: GRAY_ICON,
    //         text: 'Just a URL',
    //         condition: 'always',
    //         url: 'https://www.the-public-good.com/',
    //         target: 'The Public Good'
    //     }];
    //     },
    // "card-badges": function (t, opts) {    
    //     return t
    //         .card('id', 'name')            
    //         .then(function (card) {
    //         return [
    //             {
    //             text: "Challenge",
    //             color: "red"
    //             },
    //             {
    //             text: "Celebrate",
    //             color: "green"
    //             },
    //         ];
    //         });
    //     },
        "card-detail-badges": function (t, opts) {

            // const context = t.getContext();
            // error('card context: ', JSON.stringify(context, null, 2));

            const onDone = async (t, opts) => {
                log('onDone inside');
                const context = t.getContext();
                log(JSON.stringify(context, null, 2));

                const scope = enums.Scope.Member;
                const visibility = enums.Visibility.Shared;
                const key = 'challenged pledges';

                const response = await t.get(scope, visibility, key);

                log('returned save object: ',  response);
            };

            return t
            .card("name")
            .get("name")
            .then(function (cardName) {
                return [
                {
                    text: "Challenge",
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
        },     
});