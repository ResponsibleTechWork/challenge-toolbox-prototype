import regeneratorRuntime from "regenerator-runtime";
import api from './trello-api';

const json = document.getElementById('json');

const getBoards = async () => {

    let boards;

    try {
        boards = await api.getBoards();
        json.innerHTML = JSON.stringify(boards, null, 4);
    } catch (e) {
        console.error(e);
    }
};

document.getElementById('btnGetBoards').addEventListener('click', e => { getBoards(); });


const test = async () => {

    const url = "http://localhost:3001";

    try {

        const res  = await fetch(`${url}/api`);
        const json = await res.json();
        await console.log(json);

    } catch(e) {
        console.error(e);
    }

    try {
        console.log(await api.getTest(`${url}/api`));
    }
    catch (e) {
        console.error(e);
    }

    try {
        console.log(await api.getBoardsFromTheClient());
    } catch (e) {
        console.error(e);
    }

    getBoards();

};

// test();

