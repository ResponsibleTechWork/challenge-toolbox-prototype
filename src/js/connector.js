console.log('testing challenge cards')
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
  };
  
  window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
      return [{
        // usually you will provide a callback function to be run on button click
        // we recommend that you use a popup on click generally
        icon: GRAY_ICON, // don't use a colored icon here
        text: 'Pop up challenges',
        callback: onBtnClick,
        condition: 'edit'
      }, {
        // but of course, you could also just kick off to a url if that's your thing
        icon: GRAY_ICON,
        text: 'Just a URL',
        condition: 'always',
        url: 'https://www.the-public-good.com/',
        target: 'The Public Good' // optional target for above url
      }];
    },
  
    "card-badges": function (t, opts) {    
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
