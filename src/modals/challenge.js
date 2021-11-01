import('../shared').then(function (data) {

console.log(data.sources)

const pledges = data.sources.find(s => s.selected).pledges;
const reasons = data.sources.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

const redrawChallengePledges = () => {
    const pledgeItems = pledges.map(pledge => {    
        return `<li>
                    <button id="${pledge.id}" class="btn btnChallenge" onclick="logChallenge('${pledge}');">${pledge.text}</button>
                </li>`;
    });

    pledgesContainer.innerHTML = pledgeItems.join('');
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

const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
console.log(JSON.stringify(context, null, 2));

let pledgesLog = [];

const logChallenge = pledge => {
    const log = pledgesLog.find(log => log.pledge.id === pledge.id);
    if(log === undefined) {
        pledgesLog.push({
            type: 'challenge',
            board: context.board,
            member: context.member,
            card: context.card,
            pledge: pledge,        
        }
    );
    } else {
        pledgesLog = pledgesLog.filter(log => log.pledge !== pledge);        
    }
    console.log(pledgesLog);
};
});