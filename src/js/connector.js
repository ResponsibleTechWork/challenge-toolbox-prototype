
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

const onBtnClick = function (t, opts) {    
    const context = t.getContext();
    console.log(JSON.stringify(context, null, 2));
    return t.card('id', 'name').then(function (card) {
        console.log('click event, card');
        console.log(JSON.stringify(card, null, 2));
    });
  };

  window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        return [{
            icon: GRAY_ICON,
            text: 'Add challenge--',
            callback: onBtnClick,
            condition: 'edit'
        }, {
            icon: GRAY_ICON,
            text: 'Just a URL',
            condition: 'always',
            url: 'https://www.the-public-good.com/',
            target: 'The Public Good'
        }];
        },
  
    "card-badges": function (t, opts) {    
        return t
            .card('id', 'name')            
            .then(function (card) {        
            return [
                {
                text: "Challenge",
                color: "red"
                },
                {
                text: "Celebrate",
                color: "green"
                },
            ];
            });
        },
  });

    const t = window.TrelloPowerUp.iframe();
