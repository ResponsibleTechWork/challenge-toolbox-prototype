import ChallengeLog from '../challenge-log/challenge-log';
import trelloEnums from '../trello-api/trello-enums';
import selector from '../capabilities/capability-selector';

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

    return await selector.getTrelloLabels({t, challengeLog, labels, log, context: {board: context.board, card: context.card, member: context.member}, mode: trelloEnums.Mode.Label, scope, visibility, key});
};    

export const getCardDetailBadges = (t, opts) => {
    return get(t);
}