import sources from '../shared/sources.json';
import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

// close modal on submit

const pledges = sources.data.find(s => s.selected).pledges;
const reasons = sources.data.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

// const t = window.TrelloPowerUp.iframe();

const challengeLog = new ChallengeLog(enums.Type.Challenge);
// const challengeLog = new ChallengeLog(t.arg('type'));

const showSelectedPledges = (pledges, currentPledge) => {

    pledgesContainer.querySelectorAll('.btn').forEach(btn => {

        btn.classList.remove('selected');
        
        pledges.forEach(pledge => {
            if (parseInt(currentPledge.id) === parseInt(btn.id)) {
                btn.classList.add('selected');
            } 
            // else {
            //     if (pledges.filter(sb => parseInt(sb.id) === parseInt(btn.id)) === []) {
            //         if(pledge.id && parseInt(btn.id) === parseInt(currentPledge.id)) {
            //             btn.classList.remove('selected');
            //         }
            //     }
            // }
        });
    });
};

const clickPledgeHandler = (e, pledgeId) => {
    
    // const context = t.getContext();

    const context = {
        board: 'board #1',
        member: 'member #1',
        card: 'card #1',
    };
    
    const pledge = pledges.find(p => parseInt(p.id) === parseInt(pledgeId));

    const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, pledge); 

    showSelectedPledges(updatedPledges, pledge);
    redrawChallengeReasons();
    showSelectedReasons(challengeLog.getReasonsForCurrentPledge());
};

const showSelectedReasons = reasons => {

    console.log(JSON.stringify(challengeLog.getCurrentPledge(), null, 2));

    reasonsContainer.querySelectorAll('.btn').forEach(btn => {

        btn.classList.remove('selected');

        if(reasons === []) return;

        reasons.forEach(reason => {
            if (parseInt(reason.id) === parseInt(btn.id)) {
                btn.classList.add('selected');
            } else {
                if (reasons.filter(sb => parseInt(sb.id) === parseInt(btn.id)) === []) {
                    btn.classList.remove('selected');
                }
            }
        });
    });
};

const clickReasonHandler = (e, reasonId) => {

    const reason = reasons.find(r => parseInt(r.id) === parseInt(reasonId));

    const { isReasonNowLogged, updatedReasons } = challengeLog.toggleReason(reason);

    showSelectedReasons(updatedReasons);

    redrawChallengePledges();
};

const redrawChallengePledges = () => {

    const pledgeItems = pledges.map(pledge => {
       
        const reasonCount = challengeLog.getReasonsCountByPledge(pledge.id);

        return `<li>
                    <button id="${pledge.id}" class="btn btnChallenge">${pledge.text}<span class="counter">${reasonCount}</span></button>
                </li>`;
    });

    pledgesContainer.innerHTML = pledgeItems.join('');

    pledgesContainer.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', e => clickPledgeHandler(e, btn.id));
    });

    showSelectedPledges(challengeLog.getLoggedPledges(), challengeLog.getCurrentPledge());
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

    showSelectedReasons(challengeLog.getReasonsForCurrentPledge());
};

redrawChallengeReasons();

const submitButton = document.getElementById('submit');

// submitButton.addEventListener('click', async e => {
submitButton.addEventListener('click', e => {

    const scope = enums.Scope.Member;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.ChallengedPledges;
    const value = challengeLog.getLog();
    
    console.log(' log: ', challengeLog.getLog());

    // await t.set(scope, visibility, key, value);

    // const response = await t.get(scope, visibility, key);

    // console.log('returned save object: ',  response);

    // t.notifyParent('done');

    // return t.closeModal();
});