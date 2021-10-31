const reasons = [
    'inefficient',
    'high intensity'
];

const reasonsContainer = document.getElementById('reasons');

let items;

reasons.map(reason => {
    items += <li>
                <button class="btn btnChallenge">reason</button>
             </li>
});

reasonsContainer.innerHTML = items;