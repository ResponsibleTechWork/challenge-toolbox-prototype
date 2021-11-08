import 'regenerator-runtime/runtime'
import sources from '../shared/sources.json';
import enums from '../shared/enums';
import { ChallengeLog } from '../shared/challenge-log';

const init = async () => {

    const isLive = document.referrer === 'https://trello.com/';

    console.log('isLive: ', isLive);

    const pledges = sources.data.find(s => s.selected).pledges;

    const pledgesContainer = document.getElementById('pledges');
    const reasonsContainer = document.getElementById('reasons');

    document.getElementById('src').href = sources.data.find(s => s.selected).src;

    const scope = enums.Scope.Card;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.LogEntries;
    const capability = enums.Capability.CardButtons;

    let type, t, log;

    if(isLive) {

        t = window.TrelloPowerUp.iframe();
        log = await t.get(scope, visibility, key);
        type = t.arg('type');

        console.log(`Data stored for ${key} against ${scope} with ${visibility} access for ${capability}  : `,  log);    

    } else {
        type = enums.Type.Challenge;
    }

    const challengeLog = new ChallengeLog(type);

    const reasons = type === enums.Type.Challenge
        ? sources.data.find(s => s.selected).reasons.negative
        : sources.data.find(s => s.selected).reasons.positive;

    if(log && log !== undefined) {
        const updatedLogFromTrello = challengeLog.setLog(log);
        console.log('set log with log from t: ', challengeLog.setLog(updatedLogFromTrello));   
    }

    const showSelectedPledges = (pledges, currentPledge) => {

        pledgesContainer.querySelectorAll('.btn').forEach(btn => {

            btn.classList.remove('selected');
            
            pledges.forEach(pledge => {
                if (parseInt(currentPledge.id) === parseInt(btn.id)) {
                    btn.classList.add('selected');
                }
            });

            if (parseInt(currentPledge.id) === parseInt(btn.id)) {
                btn.classList.add('selected');
            }
        });
    };

    const clickPledgeHandler = (e, pledgeId) => {
        
        const context = isLive ? t.getContext() : {
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

        // console.log(JSON.stringify(challengeLog.getCurrentPledge(), null, 2));

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

            const classList = type === enums.Type.Challenge ? 'btnChallenge' : 'btnCelebrate';

            return `<li>
                        <button id="${pledge.id}" class="btn ${classList}">${pledge.text}<span class="counter">${reasonCount}</span></button>
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
            return `<li>
                        <button id="${reason.id}" class="btn btnReason">${reason.text}</button>
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

    submitButton.addEventListener('click', async e => {

        if(!isLive) return;
        
        const value = challengeLog.getLog();

        await t.set(scope, visibility, key, value);

        const response = await t.get(scope, visibility, key);

        console.log('returned save object: ',  response);

        await t.notifyParent('done');

        return t.closeModal();

    });
};

init();
