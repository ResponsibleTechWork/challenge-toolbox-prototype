console.log('testing challenge cards')
window.TrelloPowerUp.initialize({
    "card-badges": function (t, opts) {
      let cardAttachments = opts.attachments; // Trello passes you the attachments on the card
      return t
        .card("name")
        .get("name")
        .then(function (cardName) {
          console.log("We just loaded the card name for fun: " + cardName);
          return [
            {
              // Dynamic badges can have their function rerun
              // after a set number of seconds defined by refresh.
              // Minimum of 10 seconds.
              dynamic: function () {
                // we could also return a Promise that resolves to
                // this as well if we needed to do something async first
                return {
                  text: "Dynamic " + (Math.random() * 100).toFixed(0).toString(),
                //   icon: "./images/icon.svg",
                  color: "green",
                  refresh: 10, // in seconds
                };
              },
            },
            {
              // It's best to use static badges unless you need your
              // badges to refresh.
              // You can mix and match between static and dynamic
              text: "Static",
            //   icon: HYPERDEV_ICON, // for card front badges only
              color: null,
            },
          ];
        });
    },
  });

  var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

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
  }
});