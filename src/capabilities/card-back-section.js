import ChallengeLog from '../shared/challenge-log';
import trelloEnums from '../shared/trello-enums';
import selector from '../shared/capability-selector';

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

const get = async t => {

    const scope = trelloEnums.Scope.Card;
    const visibility = trelloEnums.Visibility.Shared;
    const key = trelloEnums.Key.LogEntries;

    const context = t.getContext();

    const logEntries = await t.get(scope, visibility, key);

    const challengeLog = new ChallengeLog(trelloEnums.Type.Challenge);

    let log;

    if(logEntries && logEntries !== undefined) {
        log = challengeLog.setLog(logEntries);
    }
    
    const prefs = await t.get(trelloEnums.Scope.Board, visibility, trelloEnums.Key.ChallengePreferences);
    const data = await selector.getData(prefs);

    const labels = await selector.getLabelsByCapability(data, trelloEnums.Capability.CardDetailBadges);

    if(data) {
        console.log('title ', data.title);
        if(data.modal) {
            console.log('modal.prompt ', data.modal.prompt);
        }
    }

    return {
        title: 'Spotify Ethics Assessment',
        icon: GRAY_ICON,
        content: {
          type: 'iframe',
          url: t.signUrl('./card-back-modal-challenges.html', { data: data }),
          height: 180,
          action: {
            text: 'My Action',
            callback: t => console.log(t)
          },
        }
    };


};

export const getCardBackSection = (t, opts) => {
    return get(t);
};