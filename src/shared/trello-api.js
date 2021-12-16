const checkResponseStatus = res => {
    if(res.ok){
        return res
    } else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
    }
}

const getBoards = async () => {

    const url = "http://localhost:3001/boards";
    
    const response  = await fetch(url);
    const json = response.json();
    return await json;
    
};

const getBoardsFromTheClient = async () => {
   
    const url =  'https://api.trello.com/1/members/me/boards?key=779f3fe25b914f6cef4434357de28641&token=602e83ccd5c6601463227a54d4fc622a5f3f4a609cd05a6219613aaf91be15cb';

    fetch(url)
    .then(checkResponseStatus)
    .then(res => res.json())
    .then(text => console.log(text))
    .catch(err => console.log(err));
    
};

const getCard = async id => {

    console.log('card id: ', id);

    const success = data => {
        console.log('Card returned successfully.');
        console.log(JSON.stringify(data, null, 2));
    };

    const error = response => {
        console.log('error: ', response);
    };

    console.log('window.Trello: ', window.Trello);

    let response;

    try {
        response = await window.Trello.get('/cards/', id, success, error);
    } catch(e) {
        console.error('error: ', e.message);
        console.warn('reponse: ', response);
    }

    return response;
};

const getTest = async url => {
    
    const res  = await fetch(url);
    return  await res.json();
}

const api = {
    getBoards,
    getBoardsFromTheClient,
    getCard,
    getTest
};

export default api;