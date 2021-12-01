import ChallengeLog from '../shared/challenge-log';
import trelloEnums from '../shared/trello-enums';
import selector from '../shared/capability-selector';

const get = async t => {

    const context = t.getContext();

    console.log('card-detail-badges context ', context);

    const logEntries = await t.get(trelloEnums.Scope.Card, trelloEnums.Visibility.Shared, trelloEnums.Key.LogEntries);

    // console.log('card-detail-badges logEntries ', logEntries);

    const challengeLog = new ChallengeLog();

    let log;

    if(logEntries && logEntries !== undefined) {
        log = challengeLog.setLog(logEntries);
    }

    // console.log('card-detail-badges log ', log);
    
    const prefs = await t.get(trelloEnums.Scope.Board, trelloEnums.Visibility.Shared, trelloEnums.Key.ChallengePreferences);
    const data = await selector.getData(prefs);

    // console.log('card-detail-badges data ', data);

    const pledges = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);
    const labels = await selector.getTrelloLabels({t, challengeLog, pledges, log, context: {board: context.board, card: context.card, member: context.member}});

    // console.log('card-detail-badges labels ', labels);

    return labels;
};    

export const getCardDetailBadges = (t, opts) => {
    return get(t);
}