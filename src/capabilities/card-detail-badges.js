import trelloEnums from '../shared/trello-enums';
import selector from '../shared/capability-selector';

const get = async t => {

    const context = t.getContext();
    const logEntries = await t.get(trelloEnums.Scope.Card, trelloEnums.Visibility.Shared, trelloEnums.Key.LogEntries);

    let log;

    if(logEntries && logEntries !== undefined) {
        log = challengeLog.setLog(logEntries);
    }
    
    const prefs = await t.get(trelloEnums.Scope.Board, trelloEnums.Visibility.Shared, trelloEnums.Key.ChallengePreferences);
    const data = await selector.getData(prefs);

    const pledges = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);
    const labels = await selector.getTrelloLabels({pledges, log, context: {board: context.board, card: context.card, member: context.member}});

    return labels;
};    

export const getCardDetailBadges = (t, opts) => {
    return get(t);
}