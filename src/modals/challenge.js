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

let pledgeItems = '';

pledges.map(pledge => {
    pledgeItems += `<li>
                <button id="${pledge}" class="btn btnChallenge" onclick="{onSelect}">${pledge}</button>
             </li>`;
});

pledgesContainer.innerHTML = pledgeItems;

let reasonItems = '';

reasons.map(reason => {
    reasonItems += `<li>
                <button id="${reason}" class="btn btnChallenge">${reason}</button>
             </li>`;
});

reasonsContainer.innerHTML = reasonItems;

const onSelect = e => {
    console.log(e);

    
};

const t = window.TrelloPowerUp.iframe();
    const context = t.getContext();
    console.log(JSON.stringify(context, null, 2));