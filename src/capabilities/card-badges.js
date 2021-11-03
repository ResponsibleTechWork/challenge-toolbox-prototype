export const getCardBadges = (t, opts) => {    
    return t
        .card('id', 'name')            
        .then(function (card) {
        return [
            {
            text: "Challenge",
            color: "red"
            },
            {
            text: "Celebrate",
            color: "green"
            },
        ];
        });
};