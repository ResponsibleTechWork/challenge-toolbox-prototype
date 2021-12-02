import ChallengeLog from '../shared/challenge-log';
import trelloEnums from '../shared/trello-enums';
import selector from '../shared/capability-selector';

const get = async t => {


    const logEntries = await t.get(trelloEnums.Scope.Card, trelloEnums.Visibility.Shared, trelloEnums.Key.LogEntries);

    const onLabelClick = async t => {



        return t.popup
    };

    return {
        title: 'My Card Back Section',
        icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
        content: {
          type: 'iframe',
          url: t.signUrl('./section.html'),
          height: 230, // Max height is 1500.
          action: {
            text: 'My Action',
            callback: t => onLabelClick(t)
          },
        }
    }
    
};

export const getCardBackSection = (t, opts) => {
        return get(t);
};