import { getCardDetailBadges } from "../capabilities/card-detail-badges";
import { getCardBadges } from "../capabilities/card-badges";
import { getCardButtons } from "../capabilities/card-buttons";

window.TrelloPowerUp.initialize({

    "card-badges": (t, opts) => getCardBadges(t, opts),
    'card-buttons': (t, opts) => getCardButtons(t, opts),
    // 'card-detail-badges': (t, opts) => getCardDetailBadges(t, opts),

});