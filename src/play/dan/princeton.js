import 'regenerator-runtime/runtime'

import schema from './rtw-schema.json';

const init = async () => {

    const clickVoteHandler = e => {
        
        const id = e.target.name;
        const pledge = set.pledges.find(p => parseInt(p.id) === parseInt(id));

        subtext.innerHTML = `<span>${pledge.text}</span> <div>${pledge.subtext}</div>`;
        
        Array.from(document.getElementsByTagName('span')).forEach(s => s.classList.remove('selected'));

        document.getElementById(id).getElementsByTagName('span')[0].classList.add('selected');
    };

    const hoverHandler = e => {
        const id = e.target.parentElement.id;
        const pledge = set.pledges.find(p => parseInt(p.id) === parseInt(id));

        subtext.innerHTML = `<span>${pledge.text}</span> <div>${pledge.subtext}</div>`;
    };

    const set = schema.sets.find(s => s.enabled);

    const table = document.getElementById('challenge-table');

    const caption = `<caption><a href="${set.src}">${set.title}</a></caption`;

    const headers = `<thead><th>${set.pledges_alternate || "pledges"}</th><th>${set.exclusive_terms ? set.exclusive_terms[0] : "Agree"}</th><th>${set.exclusive_terms ? set.exclusive_terms[1] : "Neutral"}</th><th>${set.exclusive_terms ? set.exclusive_terms[2] : "Disagree"}</th></thead>`;

    console.log(set)

    const rows = set.pledges.map(p => {
        return  `<tr>
                    <td id="${p.id}"><img src="${p.icon}" /><span>${p.text}</span></td><td><input type="radio" id="0" name="${p.id}" value="0"></td><td><input type="radio" id="1" name="${p.id}" checked value="1"></td><td><input type="radio" id="2" name="${p.id}" value="2"></td>
                </tr>`;
    });

    table.innerHTML  = caption;
    table.innerHTML += headers;
    table.innerHTML += rows.join('');

    Array.from(table.getElementsByTagName('input')).forEach(rb => {
        rb.addEventListener('change', clickVoteHandler);
    });

    Array.from(table.getElementsByTagName('span')).forEach(span => {
        span.addEventListener('mouseover', hoverHandler);
    });

    const subtext = document.getElementById('subtext');

};

init();