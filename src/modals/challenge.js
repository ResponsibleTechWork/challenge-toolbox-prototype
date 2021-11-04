import api from '../shared/api';
import sources from '../shared/sources.json';
import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

// close modal on submit
// reload pledges and reason when re-opening modal
// show reason count on pledge

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

const t = window.TrelloPowerUp.iframe();

const challengeLog = new ChallengeLog(t.arg('type'));

const clickPledgeHandler = (e, pledgeId) => {
    
    const context = t.getContext();

    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

    const pledge = pledges.find(p => p.id === parseInt(pledgeId));

    console.log('pledgeId: ', pledgeId);

    if(pledge !== challengeLog.getCurrentPledge()) {
        reasonsContainer.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('selected')
        })
    }

    console.log('pledge: ', pledge);

    challengeLog.togglePledge(context, pledge); 

};

const clickReasonHandler = (e, reasonId) => {

    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

    const reason = reasons.find(r => r.id === parseInt(reasonId));

    challengeLog.toggleReason(reason);
};

const redrawChallengePledges = () => {
    const reasonCount = challengeLog.getReasonsCount();
    const pledgeItems = pledges.map(pledge => {
        
        return `<li>
                    <button id="${pledge.id}" class="btn btnChallenge">${pledge.text}<span class="counter">${reasonCount}</span></button>
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
        const reasonCount = challengeLog.getReasonsCount();
        return `<li>
                    <button id="${reason.id}" class="btn btnChallenge">${reason.text}<span class="counter">${reasonCount}</span></button>
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

    await t.set(scope, visibility, key, value);

    const response = await t.get(scope, visibility, key);

    console.log('returned save object: ',  response);

    t.notifyParent('done');

    return t.closeModal();
});