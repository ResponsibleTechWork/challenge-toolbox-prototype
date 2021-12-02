const init = async () => {

    const isLive = document.referrer === 'https://trello.com/';

    let t, data;

    if(isLive) {

        t = window.TrelloPowerUp.iframe();
        data = t.arg('data');
        console.log(data);

    } else {
        data = {}
    }

};

init();