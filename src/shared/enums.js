const Scope = Object.freeze({
    Board: 'board',
    Member: 'member',
    Card: 'card',
});

const Type = Object.freeze({
    Challenge: 'challenge',
    Celebtrate: 'celebtrate'
});

const Visibility = Object.freeze({
    Shared: 'shared',
    Private: 'private'
});

const enums = {
    Scope,
    Type,
    Visibility
};

export default enums;