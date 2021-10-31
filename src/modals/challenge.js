const sources = [
    {
        name: 'Principles of Green Software Engineering',
        src: 'https://principles.green/',
        pledges: [
            {
                id: 1,
                text: 'carbon efficient',
            },            
            {
                id: 2,
                text: 'energy efficient',
            },            
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
            {
                id: 1,
                text: 'respect people',
            },
            {
                id: 2,
                text: 'protect against abuse',
            },            
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
                    <button id="${pledge.id}" class="btn btnChallenge" onclick="logChallenge('${pledge}');">${pledge.text}</button>
                </li>`;
    });

    pledgesContainer.innerHTML = pledgeItems;
};

redrawChallengePledges();

const redrawChallengeReasons = () => {
    const reasonItems = reasons.map(reason => {
        return `<li>
                    <button id="${reason}" class="btn btnChallenge">${reason}</button>
                </li>`;
    });
    
    reasonsContainer.innerHTML = reasonItems;
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
};