import trelloEnums from '../shared/trello-enums';

// const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
// const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';
// const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

const get = async t => {

    const onBtnClick = async t => {

        return t.popup({
            title: 'Toolbox preferences',
            url: './board-buttons-popup-authors.html',
            height: 225
        });
    };

    return [{
        text: 'Challenge Toolbox',
        callback: t => onBtnClick(t),
        condition: trelloEnums.Condition.Always
      }];

};

export const getBoardButtons = (t, opts) => {
    return get(t);
}