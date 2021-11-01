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
    pledgesLog = logChallenge(pledgesLog, context, pledgeId);
};

const redrawChallengePledges = () => {
    const pledgeItems = pledges.map(pledge => {    
        const li = document.createElement('li');
        const btn = document.createElement('button');
              btn.id = pledge.id;
              btn.classList.add('btn'); 
              btn.classList.add('btnChallenge'); 
              btn.innerHTML = pledge.text;
              btn.addEventListener('click', e => clickHandler(e, pledge.id));
              li.appendChild(btn);
              return li;
        // return `<li>
        //             <button id="${pledge.id}" class="btn btnChallenge" onclick="clickHandler(${pledge.id})">${pledge.text}</button>
        //         </li>`;
        // return `<li>
        //             <button id="${pledge.id}" class="btn btnChallenge" onclick="clickHandler(${pledge.id})">${pledge.text}</button>
        //         </li>`;
    });

    // pledgesContainer.innerHTML = pledgeItems.join('');
    pledgeItems.forEach(item => {
        pledgesContainer.appendChild(item);
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