import { add, logChallenge } from '../shared/funcs';
import sources from '../shared/sources.json';

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

let pledgesLog = [];

const clickHandler = pledgeId => {
    const t = window.TrelloPowerUp.iframe();
    const context = t.getContext();
    pledgesLog = logChallenge(pledgesLog, context, pledgeId);
};

const redrawChallengePledges = () => {
    
    const pledgeItems = pledges.map(pledge => {
        return `<li>
                    <button id="${pledge.id}" class="btn btnChallenge">${pledge.text}</button>
                </li>`;
    });

    pledgesContainer.innerHTML = pledgeItems.join('');
    const buttons = pledgesContainer.querySelectorAll('.btn');
    console.log(buttons);
    buttons.forEach(btn => {
        btn.addEventListener('click', () => clickHandler(btn.id));
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