console.log('testing challenge cards')
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var onBtnClick = function (t, opts) {
    console.log('Someone clicked the button: ', t.getAll());
  };
  
  window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
      console.log('card-buttons t object:', t.getAll());
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
      console.log('card-badges t object:', t.getAll();
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
