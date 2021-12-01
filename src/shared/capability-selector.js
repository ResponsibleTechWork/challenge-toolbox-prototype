import regeneratorRuntime from "regenerator-runtime";
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
        return [{}];
    }
};

const setTrelloProperty = async (t, scope, visibility, key, label) => {

    const value = {
        // board
        // card
        // member
        pledge: label,
        type: label.title
    };
    await t.set(scope, visibility, key, value);
    const response = await t.get(scope, visibility, key);
    return response;
};

const onLabelForPopupClick = (t, title, effects) => {
    
    return t.popup({
        title: title,
        items: effects
    });
};

const onLabelActionClick = (t, label) => {
    setTrelloProperty(t, trelloEnums.Scope.Card, trelloEnums.Visibility.Shared, trelloEnums.Key.LogEntries, label);
};

const getTrelloLabels = async (labels, popup = null) => {

    return popup 
            ? labels.map(label => {
                return {
                    text: label.title,
                    condition: trelloEnums.Condition.Always,
                    callback: t => onLabelForPopupClick(t, popup.prompt, popup.effects)
                }
            })
            : labels.map(label => {
                return {
                    text: label.title,
                    condition: trelloEnums.Condition.Always,
                    callback: t => onLabelActionClick(t, label.title)
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