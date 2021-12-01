import regeneratorRuntime from "regenerator-runtime";

import enums from '../../api/enums';

import api from '../../api/api';

let author, data;

const init = async () => {
    author = { id: enums.Authors.RTW };
    data = await api.getTrelloData(author);
    console.log('rtw:', data);
    author = { id: enums.Authors.Spotify };
    data = await api.getTrelloData(author);
    console.log('spotify:', data);
};

init();