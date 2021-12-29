import trelloEnums from '../trello-api/trello-enums';
import ChallengeLog from '../challenge-log/challenge-log';

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

    const prompt = document.getElementById('prompt');
    const labelsContainer = document.getElementById('labels');

    const challengeLog = new ChallengeLog(trelloEnums.Type.Challenge);

    const capability = data.capabilities.find(c => c.capability === trelloEnums.Capability.CardBackSection);

    console.log('capability ', capability);

    const clickLabelHandler = async (e, id) => {

        const context = isLive ? t.getContext() : {
            board: 'board #1',
            member: 'member #1',
            card: 'card #1',
        };

        const label = labels.find(label => parseInt(label.id) === parseInt(id));

        const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, label);

        const scope = trelloEnums.Scope.Card;
        const visibility = trelloEnums.Visibility.Shared;
        const key = trelloEnums.Key.LogEntries;

        await t.set(scope, visibility, key, updatedPledges);

        const response = await t.get(scope, visibility, key);

        console.log(response);
    };

    const labels = capability.labels.map(label => {
        return `<li>
                    <button id="${label.id}" class="btn">${label.text}</button>
                </li>`;
    });

    prompt.innerText = capability.prompt;
    labelsContainer.innerHTML = labels.join('');

    labelsContainer.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => clickLabelHandler(e, btn.id));
    });

};

init();