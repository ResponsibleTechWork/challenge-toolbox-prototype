import api from '../shared/api';
import sources from '../shared/sources.json';
import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

const challengeLog = new ChallengeLog(enums.Type.Challenge);

const clickPledgeHandler = (e, pledgeId) => {

    const t = window.TrelloPowerUp.iframe();
    const context = t.getContext();
    
    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

    const pledge = pledges.find(p => p.id === parseInt(pledgeId));

    console.log('pledgeId: ', pledgeId);

    if(pledge !== challengeLog.getPledge()) {
        reasonsContainer.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('selected')
        })
    }

    console.log('pledge: ', pledge);

    challengeLog.togglePledge(context, pledge); 

};

const clickReasonHandler = (e, reasonId) => {

    const t = window.TrelloPowerUp.iframe();
    const context = t.getContext();
    
    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

    const reason = reasons.find(r => r.id === parseInt(reasonId));

    challengeLog.toggleReason(reason);
};

const redrawChallengePledges = () => {
    
    const pledgeItems = pledges.map(pledge => {
        return `<li>
                    <button id="${pledge.id}" class="btn btnChallenge">${pledge.text}</button>
                </li>`;
    });

    pledgesContainer.innerHTML = pledgeItems.join('');

    pledgesContainer.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => clickPledgeHandler(e, btn.id));
    });
};

redrawChallengePledges();

const redrawChallengeReasons = () => {
    const reasonItems = reasons.map(reason => {
        return `<li>
                    <button id="${reason.id}" class="btn btnChallenge">${reason.text}</button>
                </li>`;
    });
    
    reasonsContainer.innerHTML = reasonItems.join('');

    reasonsContainer.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => clickReasonHandler(e, btn.id));
    });
};

redrawChallengeReasons();

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async e => {

    const scope = enums.Scope.Member;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.ChallengedPledges;
    const value = challengeLog.getLog();
    
    console.log(' log: ', challengeLog.getLog());

    const t = window.TrelloPowerUp.iframe();

    await t.set(scope, visibility, key, value);

    const response = await t.get(scope, visibility, key);

    console.log('returned save object: ',  response);

    return t.notifyParent('done');
});