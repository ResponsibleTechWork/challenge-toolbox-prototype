import trelloEnums from '../shared/trello-enums';
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
            "title": "Physical harm"
         },
         {
            "id": "2",
            "title": "Emotional harm"
         },
         {
            "id": "3",
            "title": "Societal harm"
         }
    ];

    it('should return labels for card-detail-badges', async () => {
        const data = await selector.getData(prefs);
        const _labels = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);
        expect(_labels).toStrictEqual(labels);
    });

    it('should not return labels for card-buttons', async () => {
        const data = await selector.getData(prefs);
        const _labels = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardButtons);
        expect(_labels).toStrictEqual([{}]);
    });

    it('should not return popup where it is missing or disabled', async () => {
        const data = await selector.getData(prefs);
        const popup = await selector.getPopup(data);
        expect(popup).toBe(null);
    });

    it('should return enabled popup', async () => {
        const data = await selector.getData(prefs);
        data.popup.enabled = true;
        const popup = await selector.getPopup(data);
        expect(popup.enabled).toBe(true);
        expect(popup.prompt).toBe("How confident are you of this outcome?");
        expect(popup.effects.length).toBe(5);
    });

    it('should return trello badges without popup', async () => {
        const data = await selector.getData(prefs);
        const _labels = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);
        const trelloLabels = await selector.getTrelloLabels(_labels);
        expect(trelloLabels.length).toStrictEqual(3); // mock here
        // expect(trelloLabels).toStrictEqual([
        //     {
        //         text: "Physical harm",
        //         condition: "always"
        //      },
        //      {
        //         text: "Emotional harm",
        //         condition: "always"
        //      },
        //      {
        //         text: "Societal harm",
        //         condition: "always"
        //      }
        // ]);
    });

    it('should return trello badges with popup', async () => {
        const data = await selector.getData(prefs);
        data.popup.enabled = true;
        const popup = await selector.getPopup(data);
        const _labels = await selector.getCapabilityPreferences(data, trelloEnums.Capability.CardDetailBadges);
        const trelloLabels = await selector.getTrelloLabels(_labels, popup);
        expect(trelloLabels.length).toStrictEqual(3); // mock here
    });
    
});