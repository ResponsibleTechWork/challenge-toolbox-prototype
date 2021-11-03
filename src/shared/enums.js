const Scope = Object.freeze({
    Board: 'board',
    Member: 'member',
    Card: 'card',
    Organization: 'organization'
});

const Type = Object.freeze({
    Challenge: 'challenge',
    Celebtrate: 'celebtrate'
});

const Visibility = Object.freeze({
    Shared: 'shared',
    Private: 'private'
});

const Key = Object.freeze({
    ChallengedPledges: 'challenged pledges'
})

const enums = {
    Scope,
    Type,
    Visibility,
    Key
};

export default enums;