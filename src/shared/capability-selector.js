import regeneratorRuntime from "regenerator-runtime";
import ChallengeLog from '../shared/challenge-log';
import trelloEnums from '../shared/trello-enums';
import api from '../api/api';

const getData = async prefs => {
    return await api.getAuthorDataById(prefs.id);
};

const getLabelsByCapability = (data, capability) => {
    
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

const onLabelForActionClick = async ({t, challengeLog, context, label, scope, visibility, key}) => {

    const { isPledgeNowLogged, updatedPledges } = challengeLog.togglePledge(context, label);

    await t.set(scope, visibility, key, updatedPledges);
    
    return await t.get(scope, visibility, key);
};

const getTrelloLabels = async ({t, challengeLog, labels, log, context, popup = null, modal = null, mode = trelloEnums.Mode.Label, scope, visibility, key}) => {

    const getCount = (context, log, label) => {
        const count = ChallengeLog.getLabelVoteCount(context, log, label);
        return count ? (count).toString() || '' : '';
    };

    switch(mode) {
        case trelloEnums.Mode.Label:
            return labels.map(label => {
                return {
                    text: `${label.text} ${getCount(context, log, label)}`,
                    condition: trelloEnums.Condition.Always,
                    callback: () => onLabelForActionClick({t, challengeLog, context, label, scope, visibility, key})
                }
            });
            case trelloEnums.Mode.Popup:
                return labels.map(label => {
                    return {
                        text: `${label.text} ${getCount(context, log, label)}`,
                        condition: trelloEnums.Condition.Always,
                        callback: () => onLabelForPopupClick(t, context, popup)
                    }
                });
            case trelloEnums.Mode.Modal:
                return labels.map(label => {
                    return {
                        text: `${label.text} ${getCount(context, log, label)}`,
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
    getLabelsByCapability,
    getTrelloLabels,
    getPopup
}

export default selector;