const sources = [
    {
        name: 'Principles of Green Software Engineering',
        src: 'https://principles.green/',
        pledges: [
            'carbon efficient',
            'energy efficient'
        ],
        reasons: {
            positive: [
                'efficient',
                'low intensity'
            ],
            negative: [
                'inefficient',
                'high intensity'
            ],
        },
        selected: true
    },
    {
        name: 'Challenge Toolbox Prototype',
        src: 'https://www.figma.com/file/E7ZOq83wqAE6ABfoIXnnVm/Challenge-Toolbox-Prototype?node-id=3%3A111',
        pledges: [
            'respect people',
            'protect against abuse'
        ],
        reasons: {
            positive: [
                'improves well-being',
                'improves privacy'
            ],
            negative: [
                'annoying',
                'misleading'
            ],
        },
        selected: false
    },
]

const pledges = sources.find(s => s.selected).pledges;
const reasons = sources.find(s => s.selected).reasons.negative;

const pledgesContainer = document.getElementById('pledges');
const reasonsContainer = document.getElementById('reasons');

const redrawChallengePledges = () => {
    const pledgeItems = pledges.map(pledge => {
        return `<li>
                    <button id="${pledge}" class="btn btnChallenge" onclick="onSelect(${pledge});">${pledge}</button>
                </li>`;
    });
    
    pledgesContainer.innerHTML = pledgeItems;
};

redrawChallengePledges();

let reasonItems = '';

const redrawChallengeReasons = () => {
    reasons.map(reason => {
        reasonItems += `<li>
                            <button id="${reason}" class="btn btnChallenge">${reason}</button>
                        </li>`;
    });
    
    reasonsContainer.innerHTML = reasonItems;
};

redrawChallengePledges();

const onSelect = pledge => {
    console.log(pledge);
};

const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
console.log(JSON.stringify(context, null, 2));

let pledgesLog = [];

const logChallenge = pledge => {
    const log = pledgesLog.find(log => log.pledge === pledge);
    if(log) {
        pledgesLog = pledgesLog.filter(log => log.pledge === pledge);
    } else {
        pledgesLog.push({
                type: 'challenge',
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: pledge,        
            }
        );
    }
};