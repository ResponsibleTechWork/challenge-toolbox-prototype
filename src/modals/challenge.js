const sources = [
    {
        name: 'Principles of Green Software Engineering',
        src: 'https://principles.green/',
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

const reasons = sources.find(s => s.selected).negative.reasons;

const reasonsContainer = document.getElementById('reasons');

let items = '';

reasons.map(reason => {
    items += `<li>
                <button id="${reason}" class="btn btnChallenge">${reason}</button>
             </li>`;
});

reasonsContainer.innerHTML = items;