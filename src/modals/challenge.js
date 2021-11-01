import { logChallenge } from '../shared/funcs';
import sources from '../shared/sources.json';

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

let pledgesLog = [];

const t = window.TrelloPowerUp.iframe();
const context = t.getContext();

const clickHandler = (e, pledgeId) => {
    
    const btn = e.target;
          Array.from(btn.classList).find(c => c === 'selected') 
            ? btn.classList.remove('selected')
            : btn.classList.add('selected');

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
      submitButton.addEventListener('click', e => {
          
        console.log('submit!');

          const challengedPledges = t.get('challenged pledges') || [];
          
          t.set('challenged pledges', [
              ...challengedPledges,
              pledgesLog.map(pledge => {
                  return {
                    card: t.card,
                    pledge: pledge.id
                }
              })              
          ]);

          console.log('challenged pledges: ', t.get('challenged pledges'));

      });