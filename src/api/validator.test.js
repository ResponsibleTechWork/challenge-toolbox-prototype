import validator from './validator';
import challengeSchema from './schemata/challenge-schema';
import trelloSchema from './schemata/trello-schema';
import rtwData from './data/rtw.json';
import rtwTrelloData from './data/rtw-trello.json';
import spotifyTrelloData from './data/spotify-trello.json';

describe('schema validation', () => {

    it('for test schema and data', () => {
        const valid = validator();
        expect(valid).toBe(true);
    });

    it('for challenge schema and rtw data', () => {
        const valid = validator(challengeSchema, rtwData);
        expect(valid).toBe(true);
    });

    it('for trello only schema and trello only rtw data', () => {
        const valid = validator(trelloSchema, rtwTrelloData);
        expect(valid).toBe(true);
    });

    it('for trello only schema and trello only spotify data', () => {
        const valid = validator(trelloSchema, spotifyTrelloData);
        expect(valid).toBe(true);
    });

    it('for trello challenge schema and rtw data', () => {
        const schema = { ...challengeSchema, ...trelloSchema };
        const data = { ...rtwData, ...rtwTrelloData };
        const valid = validator(schema, data);
        expect(valid).toBe(true);
    });

});