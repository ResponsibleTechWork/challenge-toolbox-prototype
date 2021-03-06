import regeneratorRuntime from "regenerator-runtime";
import sources from '../challenge-log/sources.json';
import trelloEnums from '../trello-api/trello-enums';
import ChallengeLog from '../challenge-log/challenge-log';

const init = async () => {

    const isLive = document.referrer === 'https://trello.com/';

    const pledges = sources.data.find(s => s.selected).pledges;

    const pledgesContainer = document.getElementById('pledges');
    const reasonsContainer = document.getElementById('reasons');

    document.getElementById('src').href = sources.data.find(s => s.selected).src;

    const scope = trelloEnums.Scope.Card;
    const visibility = trelloEnums.Visibility.Shared;
    const key = trelloEnums.Key.LogEntries;
    const capability = trelloEnums.Capability.CardButtons;

    let type, t, log;

    if(isLive) {

        t = window.TrelloPowerUp.iframe();
        log = await t.get(scope, visibility, key);
        type = t.arg('type');

    } else {
        type = trelloEnums.Type.Challenge;
    }

    const challengeLog = new ChallengeLog(type);

    const reasons = type === trelloEnums.Type.Challenge
        ? sources.data.find(s => s.selected).reasons.negative
        : sources.data.find(s => s.selected).reasons.positive;

    if(log && log !== undefined) {
        const updatedLogFromTrello = challengeLog.setLog(log);
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

            const classList = type === trelloEnums.Type.Challenge ? 'btnChallenge' : 'btnCelebrate';

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

        await t.notifyParent('done');

        return t.closeModal();

    });
};

init();
