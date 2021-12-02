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

const onLabelForModalClick = (t, context, modal) => {
    
    return t.modal({
        title: modal.prompt,
        items: modal.effects
    });

    // click events missing …
};

const onLabelForPopupClick = (t, context, popup) => {
    
    return t.popup({
        title: popup.prompt,
        items: popup.effects
    });

    // click events missing …
};

const onLabelForActionClick = async (t, challengeLog, context, pledge) => {

    // console.log('context ', context);
    // console.log('pledge ', pledge);

    const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, pledge);

    console.log('updatedPledges ', updatedPledges);

    // missing context, etc!!!!
    await t.set(scope, visibility, key, updatedPledges); // pass func to mock
    return await t.get(scope, visibility, key);

    // update label in situ after click?
};

const getTrelloLabels = async ({t, challengeLog, pledges, log, context, popup = null, modal = null, mode = trelloEnums.Mode.Label}) => {

    console.log('context ', context);
    console.log('log ', log);
    console.log('pledge ', pledge);

    const getCount = pledge => {
        const count = ChallengeLog.getLabelVoteCount(context, log, pledge);
        console.log('count ', count);
        return (count).toString() || '';
    };

    switch(mode) {
        case trelloEnums.Mode.Label:
            return pledges.map(pledge => {
                return {
                    text: `${pledge.text} ${getCount(pledge)}`,
                    condition: trelloEnums.Condition.Always,
                    callback: () => onLabelForActionClick(t, challengeLog, context, pledge)
                }
            });
            case trelloEnums.Mode.Popup:
                return pledges.map(pledge => {
                    return {
                        text: `${pledge.text} ${getCount(pledge)}`,
                        condition: trelloEnums.Condition.Always,
                        callback: () => onLabelForPopupClick(t, context, popup)
                    }
                });
            case trelloEnums.Mode.Modal:
                return pledges.map(pledge => {
                    return {
                        text: `${pledge.text} ${getCount(pledge)}`,
                        condition: trelloEnums.Condition.Always,
                        callback: () => onLabelForModalClick(t, context, modal)
                    }
                });
    }
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