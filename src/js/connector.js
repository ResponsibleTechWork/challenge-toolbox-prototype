import { getBoardButtons } from "../capabilities/board-buttons";
import { getCardBadges } from "../capabilities/card-badges";
import { getCardButtons } from "../capabilities/card-buttons";
import { getCardDetailBadges } from "../capabilities/card-detail-badges";

window.TrelloPowerUp.initialize({

    // "board-buttons": (t, opts) => getBoardButtons(t, opts),
    "card-badges": (t, opts) => getCardBadges(t, opts),
    'card-buttons': (t, opts) => getCardButtons(t, opts),
    // 'card-detail-badges': (t, opts) => getCardDetailBadges(t, opts),

});