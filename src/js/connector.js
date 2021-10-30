console.log('testing challenge cards')
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var onBtnClick = function (t, opts) {
    t.getAll()
            .then(function (data) {
                console.log('Clicked Add challenge button--');
                console.log(JSON.stringify(data, null, 2));
        });
  };
  
  window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        t.getAll()
            .then(function (data) {
                console.log('card-buttons');
                console.log(JSON.stringify(data, null, 2));
        });
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
        t.getAll()
        .then(function (data) {
            console.log('card-badges');
            console.log(JSON.stringify(data, null, 2));
    });
      return t
        .card("name")
        .get("name")
        .then(function (cardName) {        
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
