import enums from '../shared/enums';

import ChallengeLog from '../shared/challenge-log';

import data from '../api/data/authors.json';

const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

const get = async t => {

    const scope = enums.Scope.Board;
    const visibility = enums.Visibility.Shared;
    const key = enums.Key.ChallengePreferences;
    const capability = enums.Capability.BoardButtons;

    const context = t.getContext();

    console.log('Context for board buttons: ', context);

    const preferences = data.authors.map(a => {
        return {
            text: a.title,
            callback: async (t, opts) => {
                console.log('t: ', t);
                console.log('opts: ', opts);
                console.log('a: ', a);
                await t.set(scope, visibility, key, a);
                const response = await t.get(scope, visibility, key);
                console.log('return saved author: ',  response);
            }
        }
    });

    const onBtnClick = t => {
        console.log('t in onBtnClick: ', t);
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
        condition: enums.Condition.Always
      }];

};

export const getBoardButtons = (t, opts) => {
    return get(t);
}