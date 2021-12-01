import trelloEnums from '../shared/trello-enums';
import selector from '../shared/capability-selector';

const get = async t => {

    const scope = trelloEnums.Scope.Board;
    const visibility = trelloEnums.Visibility.Shared;

    const prefs = await t.get(scope, visibility, trelloEnums.Key.ChallengePreferences);

    console.log('prefs from card-detail-badges: ', prefs);

    const data = await selector.getData(prefs);

    console.log('data from card-detail-badges: ', data);

    const labels = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);
    const trelloLabels = await selector.getTrelloLabels(labels);

    return trelloLabels;
};    

export const getCardDetailBadges = (t, opts) => {
    return get(t);
}