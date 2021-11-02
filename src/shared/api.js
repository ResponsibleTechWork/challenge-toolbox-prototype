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

const api = {
    getCard
};

export default api;