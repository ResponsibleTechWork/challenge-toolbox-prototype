import { logChallenge } from '../shared/funcs';
import api from '../shared/api';
import sources from '../shared/sources.json';
import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

const { log, warn, error } = window.console;
const logify = data => JSON.stringify(data, null, 2)

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

const challengeLog = new ChallengeLog(enums.Type.Challenge);

const clickHandler = (e, pledgeId) => {

    const t = window.TrelloPowerUp.iframe();
    const context = t.getContext();
    
    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

    challengeLog.record(context, enums.Type.Challenge, pledgeId); 
};

const redrawChallengePledges = () => {
    
    const pledgeItems = pledges.map(pledge => {
        return `<li>
                    <button id="${pledge.id}" class="btn btnChallenge">${pledge.text}</button>
                </li>`;
    });

    pledgesContainer.innerHTML = pledgeItems.join('');

    const buttons = pledgesContainer.querySelectorAll('.btn');
          buttons.forEach(btn => {
              btn.addEventListener('click', e => clickHandler(e, btn.id));
          });
};

redrawChallengePledges();

const redrawChallengeReasons = () => {
    const reasonItems = reasons.map(reason => {
        return `<li>
                    <button id="${reason}" class="btn btnChallenge">${reason}</button>
                </li>`;
    });
    
    reasonsContainer.innerHTML = reasonItems.join('');
};

redrawChallengeReasons();

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async e => {
    
    // https://developer.atlassian.com/cloud/trello/power-ups/client-library/getting-and-setting-data/
    // https://developer.atlassian.com/cloud/trello/rest/api-group-actions/

    // NB although you could use card ID instead of card, Trello stores against the current card (board, member, etc.) by default.

    // const cardData = await api.getCard(context.card);

    // logify(cardData);

    const scope = 'member';
    const visibility = 'shared';
    const key = 'challenged pledges';
    const value = challengeLog.getLog();
    
    console.log(' log: ', challengeLog.getLog());

    await t.set(scope, visibility, key, value);

    const response = await t.get(scope, visibility, key);

    log('challenged pledges: ', logify(response ? response.challenges : 'nothing stored on t'));
});