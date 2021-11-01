import { add, logChallenge } from '../shared/funcs';
import sources from '../shared/sources.json';

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

let pledgesLog = [];

const clickHandler = (e, pledgeId) => {
    
    const t = window.TrelloPowerUp.iframe();
    const context = t.getContext();

    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

    pledgesLog = logChallenge(pledgesLog, context, pledgeId);
    
    console.log('click! - ', pledgesLog);
    console.log('btn: ', btn);
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