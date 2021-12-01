import trelloEnums from '../shared/trello-enums';

import ChallengeLog from '../shared/challenge-log';

import data from '../api/data/authors.json';

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';
const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

const get = async t => {

    const scope = trelloEnums.Scope.Board;
    const visibility = trelloEnums.Visibility.Shared;
    const key = trelloEnums.Key.ChallengePreferences;
    const capability = trelloEnums.Capability.BoardButtons;

    const onBtnClick = async t => {

        const prefs = await t.get(trelloEnums.Scope.Board, trelloEnums.Visibility.Shared, trelloEnums.Key.ChallengePreferences);
        const selected = data.authors.find(a => a.id === prefs.id);
        
        const preferences = data.authors.map(a => {
            return {
                text: a.title,
                icon: {
                    light: selected.id === prefs.id ? BLACK_ICON : GRAY_ICON,
                    dark: selected.id === prefs.id ? WHITE_ICON : GRAY_ICON
                },
                callback: async (t, opts) => {
                    await t.set(scope, visibility, key, a);
                    const response = await t.get(scope, visibility, key);
                    console.log('return saved author: ',  response);
                }
            }
        });
    
        console.log('selected: ', selected);
        console.log('prefs: ', prefs);

        return t.popup({
            title: 'Toolbox preferences',
            items: preferences
        });
    };

    return [{
        // icon: {
        //   dark: WHITE_ICON,
        //   light: BLACK_ICON
        // },
        text: 'Challenge Toolbox',
        callback: t => onBtnClick(t),
        condition: trelloEnums.Condition.Always
      }];

};

export const getBoardButtons = (t, opts) => {
    return get(t);
}