import { logChallenge } from '../shared/funcs';
import sources from '../shared/sources.json';
commit -m 'clearer logging'
const { log, warn, error } = console;

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

            const t = window.TrelloPowerUp.iframe();
            const context = t.getContext();

            warn('context: ', context);

            const scope = 'member';
            const visibility = 'shared';
            const key = 'challenged pledges';
                        
            const data = await t.get(scope, visibility, key) || { challenges: [] };
            const data2 = await t.get('card', visibility, key) || { challenges: [] };

            log('member data: ', data);
            log('member data challenges: ', data.challenges);
            log('card data: ', data2);

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

            const response = t.get(scope, visibility, key);

            log('challenged pledges: ', JSON.stringify((response ? response.challenges : 'nothing stored on t'), null, 2));

        });