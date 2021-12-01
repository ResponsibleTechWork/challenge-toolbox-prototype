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

const onLabelForActionClick = async (t, context, pledge) => {

    const challengeLog = new ChallengeLog();
    
    const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, pledge);

    await t.set(scope, visibility, key, updatedPledges); // pass func to mock
    return await t.get(scope, visibility, key);

    // update label in situ after click?
};

const getTrelloLabels = async ({pledges, log, context, popup = null}) => {

    console.log('getTrelloLabels log: ', log);

    return popup 
            ? pledges.map(pledge => {
                return {
                    text: `${pledge.text} ${ChallengeLog.getCustomBadgeCounts(context, log, pledge)}`,
                    condition: trelloEnums.Condition.Always,
                    callback: t => onLabelForPopupClick(t, context, popup)
                }
            })
            : pledges.map(pledge => {
                return {
                    text: pledge.text,
                    condition: trelloEnums.Condition.Always,
                    callback: t => onLabelForActionClick(t, context, pledge)
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