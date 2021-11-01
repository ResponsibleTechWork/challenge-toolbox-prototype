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
          
            // https://developer.atlassian.com/cloud/trello/power-ups/client-library/getting-and-setting-data/
            // https://developer.atlassian.com/cloud/trello/rest/api-group-actions/

            const scope = 'memeber';
            const visibility = 'private';
            const key = 'challenged pledges';
            const intitial = { challenges: [] };
            
            const data = t.get(scope, visibility, key, intitial);

            console.log(data.challenges);

            const value = {
                challenges: [
                    ...data.challenges,
                    pledgesLog.map(pledge => {
                        return {
                            member: t.member,
                            card: t.card,
                            pledge: pledge.id
                      }
                    })              
                ]   
            }
            
            t.set(scope, visibility, key, value);

            const response = t.get(scope, visibility, key, empty);

            console.log('challenged pledges: ', JSON.stringify((response ? response.challenges : 'nothing stored on t'), null, 2));

        });