import trelloEnums from '../trello-api/trello-enums';
import selector from './capability-selector';

describe('selector validation', () => {

    const prefs = {
        "id": "spotify",
        "name": "Spotify",
        "title": "Spotify Ethics Assessment"
    };

    const labels = [
        {
            "id": "1",
            "text": "Physical harm"
         },
         {
            "id": "2",
            "text": "Emotional harm"
         },
         {
            "id": "3",
            "text": "Societal harm"
         }
    ];

    it('should return labels for card-detail-badges', async () => {
        const data = await selector.getData(prefs);
        const _labels = await selector.getLabelsByCapability(data, trelloEnums.Capability.CardDetailBadges);
        expect(_labels).toStrictEqual(labels);
    });

    it('should not return labels for card-buttons', async () => {
        const data = await selector.getData(prefs);
        const _labels = await selector.getLabelsByCapability(data, trelloEnums.Capability.CardButtons);
        expect(_labels).toStrictEqual([]);
    });

    // it('should not return popup where it is missing or disabled', async () => {
    //     const data = await selector.getData(prefs);
    //     const popup = await selector.getPopup(data);
    //     expect(popup).toBe(null);
    // });

    it('should return popup prompt and challenges', async () => {
        const data = await selector.getData(prefs);
        const popup = await selector.getPopup(data);
        expect(popup.prompt).toBe("How confident are you of this outcome?");
        expect(data.challenges.length).toBe(5);
    });

    it('should return trello badges without popup', async () => {
        const data = await selector.getData(prefs);
        const labels = await selector.getLabelsByCapability(data, trelloEnums.Capability.CardDetailBadges);
        const trelloLabels = await selector.getTrelloLabels({labels, log:[], context:{}});
        expect(trelloLabels.length).toStrictEqual(3); // mock here
    });

    // it('should return trello badges with popup', async () => {
    //     const data = await selector.getData(prefs);
    //     data.popup.enabled = true;
    //     const popup = await selector.getPopup(data);
    //     const labels = await selector.getLabelsByCapability(data, trelloEnums.Capability.CardDetailBadges);
    //     const trelloLabels = await selector.getTrelloLabels(labels, popup);
    //     expect(trelloLabels.length).toStrictEqual(3); // mock here
    // });
    
});