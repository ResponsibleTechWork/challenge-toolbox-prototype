import regeneratorRuntime from "regenerator-runtime";
import data from '../api/data/authors.json';
import trelloEnums from '../shared/trello-enums';

const init = async () => {

    const isLive = document.referrer === 'https://trello.com/';

    let t, prefs;

    if(isLive) {
        t = window.TrelloPowerUp.iframe();
        prefs = t.arg('prefs');
    } else {
        prefs = {
            id: "spotify",
            name: "Spotify",
            title: "Spotify Ethics Assessment"
        };
    }


    const authorList = document.getElementById('authors');

    const selected = data.authors.find(a => a.id === prefs.id);

    const selectAuthor = async (e, id) => {

        if(!isLive) return console.log(id);

        const scope = trelloEnums.Scope.Board;
        const visibility = trelloEnums.Visibility.Shared;
        const key = trelloEnums.Key.ChallengePreferences;

        await t.set(scope, visibility, key, a);
        const response = await t.get(scope, visibility, key);
        console.log('return saved author: ',  response);

    };
        
    const authors = data.authors.map(a => {

        return `<li>
                    <button id="${a.id}" class="btn"><span>${a.id === selected.id ? '*' : '-' }</span> <span>${a.title}</span></button>
                </li>`;
    });

    authorList.innerHTML = authors.join('');

    authorList.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => selectAuthor(e, btn.id));
    });
};

init();