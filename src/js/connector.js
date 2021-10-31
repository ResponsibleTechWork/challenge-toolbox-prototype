
const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

const onBtnClick = function (t, opts) {    
    const context = t.getContext();
    // console.log(JSON.stringify(context, null, 2));

    t.get('card', 'shared', 'isClicked').then(function(data) {
        console.log('card clicked callback, properties of isClicked: ', JSON.stringify(data, null, 2));
    });
  };

  window.TrelloPowerUp.initialize({
    'card-buttons': function (t, opts) {
        const context = t.getContext();
        // console.log(JSON.stringify(context, null, 2));
        const myKeyValueObject = {
            'isClicked': 'you bectcha!',
          };
        t.set('card', 'shared', myKeyValueObject);
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
        "card-detail-badges": function (t, opts) {
            return t
              .card("name")
              .get("name")
              .then(function (cardName) {
                console.log("We just loaded the card name for fun: " + cardName);        
                return [                  
                  {
                    // card detail badges (those that appear on the back of cards)
                    // also support callback functions so that you can open for example
                    // open a popup on click
                    title: "Popup Detail Badge",
                    text: "Popup",
                    callback: function(t){
                        return t.popup({
                          title: "Hello Dolly",
                          url: './html/section.html'
                        });
                      }
                  },
                ];
              });
          },
    // 'card-back-section': function(cbs, options){
    //     return {
    //     title: 'My Card Back Section',
    //     icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
    //     content: {
    //         type: 'iframe',
    //         url: cbs.signUrl('./section.html', { anArg: 'hey' }),
    //         height: 230, // Max height is 1500.
    //         action: {
    //             text: 'My Action',
    //             callback: (t) => t.popup(),
    //         },
    //     }
    //     };
    // }
          
  });