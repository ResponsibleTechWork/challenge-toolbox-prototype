import ChallengeLog from '../shared/challenge-log';
import trelloEnums from '../shared/trello-enums';
import selector from '../shared/capability-selector';

const get = async t => {

    const context = t.getContext();

// hack

    await t.set(trelloEnums.Scope.Card, trelloEnums.Visibility.Shared, trelloEnums.Key.LogEntries, [{
        ...context,
        pledge: {
            id: '2', text: 'Emotional harm'
        },
        type: trelloEnums.Type.Challenge
    }])

    const logEntries = await t.get(trelloEnums.Scope.Card, trelloEnums.Visibility.Shared, trelloEnums.Key.LogEntries);

    const challengeLog = new ChallengeLog(trelloEnums.Type.Challenge);

    let log;

    if(logEntries && logEntries !== undefined) {
        log = challengeLog.setLog(logEntries);
    }
    
    const prefs = await t.get(trelloEnums.Scope.Board, trelloEnums.Visibility.Shared, trelloEnums.Key.ChallengePreferences);
    const data = await selector.getData(prefs);

    const pledges = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);

    console.log('card-detail-badges pledges ', pledges);

    const labels = await selector.getTrelloLabels({t, challengeLog, pledges, log, context: {board: context.board, card: context.card, member: context.member}, mode: trelloEnums.Mode.Label});

    console.log('card-detail-badges labels ', labels);

    return labels;
};    

export const getCardDetailBadges = (t, opts) => {
    return get(t);
}