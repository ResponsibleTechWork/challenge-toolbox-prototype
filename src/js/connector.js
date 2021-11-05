import { getCardDetailBadges } from "../capabilities/card-detail-badges";
import { getCardBadges } from "../capabilities/card-badges";

const GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({

    "card-badges": (t, opts) => getCardBadges(t, opts),
    'card-detail-badges': (t, opts) => getCardDetailBadges(t, opts),

});