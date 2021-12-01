import enums from './enums';

const getTrelloData = async author => {

    const id = author.id;

    return await getAuthorDataById(id);

};

const getAuthorDataById = async id => {

    let data, trelloData;
    
    return (async () => {
        switch(id) {
            case enums.Authors.RTW:
                data = await import('./data/rtw.json');
                trelloData = await import('./data/rtw-trello.json');
                return { ...data, ...trelloData };
            case enums.Authors.Spotify:
                data = await import('./data/spotify.json');
                trelloData = await import('./data/spotify-trello.json');
                return { ...data, ...trelloData };
            case enums.Authors.SWM:
                data = await import('./data/swm.json');
                return { ...data, ...trelloData };
            case enums.Authors.Princeton:
                data = await import('./data/princeton.json');
                return { ...data, ...trelloData };
        }
    })();
};

const api = {
    getTrelloData,
    getAuthorDataById
};

export default api;