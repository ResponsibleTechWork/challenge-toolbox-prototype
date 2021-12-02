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

    // return await selector.getTrelloLabels({t, challengeLog, labels, log, context: {board: context.board, card: context.card, member: context.member}, mode: trelloEnums.Mode.Popup, scope, visibility, key});

    if(data) {
        console.log('title ', data.title);
        if(data.modal) {
            console.log('modal.prompt ', data.modal.prompt);
        }
    }

    return t.modal({
        title: 'Spotify Ethics Assessment',
        icon: GRAY_ICON,
        content: {
          type: 'iframe',
          url: t.signUrl('./card-back-modal-challenges.html'),
          height: 230, // Max height is 1500.
          action: {
            text: 'My Action',
            callback: t => console.log(t)
          },
        }
    });


};

export const getCardBackSection = (t, opts) => {
        return get(t);
};