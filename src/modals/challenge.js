// import('../sources.json').then(function (sources) {

async function load() {
    
        const sources = await import('../shared/sources.json');
        const funcs = await import('../shared/funcs');
        const add = await import('../shared/funcs');
    
        console.log(sources.data);
        console.log('add: ', add);
        console.log('funcs: ', funcs);
        console.log('funcs.add: ', funcs.add);
        // console.log('add 2 + 2 = ', funcs.funcs.add(2,2));

        const pledges = sources.data.find(s => s.selected).pledges;
        const reasons = sources.data.find(s => s.selected).reasons.negative;

        const pledgesContainer = document.getElementById('pledges');
        const reasonsContainer = document.getElementById('reasons');

        const redrawChallengePledges = () => {
            const pledgeItems = pledges.map(pledge => {    
                return `<li>
                            <button id="${pledge.id}" class="btn btnChallenge" onclick="logChallenge(${pledge.id});">${pledge.text}</button>
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

        const logChallenge = pledgeId => {
            const log = pledgesLog.find(log => log.pledge.id === pledgeId);
            if(log === undefined) {
                pledgesLog.push({
                    type: 'challenge',
                    board: context.board,
                    member: context.member,
                    card: context.card,
                    pledgeId: pledgeId,        
                }
            );
            } else {
                pledgesLog = pledgesLog.filter(log => log.pledge.id !== pledgeId);
            }
            console.log(pledgesLog);
        };
}

load();

// });