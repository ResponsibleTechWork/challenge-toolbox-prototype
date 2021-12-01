import trelloEnums from '../shared/trello-enums';

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