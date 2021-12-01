import regeneratorRuntime from "regenerator-runtime";
import ChallengeLog from '../shared/challenge-log';
import trelloEnums from '../shared/trello-enums';
import api from '../api/api';

const getData = async prefs => {
    return await api.getAuthorDataById(prefs.id);
};

const getCapabilityPreferences = (data, capability) => {
    
    const capabilities = data.capabilities;
    const capabilitySelection = capabilities.find(c => c.capability === capability);

    if(capabilitySelection && capabilitySelection.enabled) {
        return capabilitySelection.labels;
    } else {
        return [];
    }
};

const onLabelForPopupClick = (t, context, popup) => {
    
    return t.popup({
        title: popup.prompt,
        items: popup.effects
    });

    // click events missing …
};

const onLabelForActionClick = async (t, challengeLog, context, pledge) => {

    console.log('t ', t);
    console.log('challengeLog ', challengeLog);
    console.log('context ', context);
    console.log('pledge ', pledge);

    const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, pledge);

    console.log('updatedPledges ', updatedPledges);

    await t.set(scope, visibility, key, updatedPledges); // pass func to mock
    return await t.get(scope, visibility, key);

    // update label in situ after click?
};

const getTrelloLabels = async ({t, challengeLog, pledges, log, context, popup = null}) => {

    console.log('getTrelloLabels log: ', log);

    return popup 
            ? pledges.map(pledge => {
                return {
                    text: `${pledge.text} ${ChallengeLog.getCustomBadgeCounts(context, log, pledge)}`,
                    condition: trelloEnums.Condition.Always,
                    callback: () => onLabelForPopupClick(t, context, popup)
                }
            })
            : pledges.map(pledge => {
                return {
                    text: pledge.text,
                    condition: trelloEnums.Condition.Always,
                    callback: () => onLabelForActionClick(t, challengeLog, context, pledge)
                }
            });
};

const getPopup = async data => {
    
    const popup = data.popup;

    if(!popup || (popup && !popup.enabled)) return null;

    return popup;
}

const selector = {
    getData,
    getCapabilityPreferences,
    getTrelloLabels,
    getPopup
}

export default selector;