const Scope = Object.freeze({
    Board: 'board',
    Member: 'member',
    Card: 'card',
    Organization: 'organization'
});

const Type = Object.freeze({
    Challenge: 'challenge',
    Celebrate: 'celebtrate'
});

const Visibility = Object.freeze({
    Shared: 'shared',
    Private: 'private'
});

const Key = Object.freeze({
    LogEntries: 'Log entries'
});

const Capability = Object.freeze({
    CardBadges: 'card-badges',
    CardButtons: 'card-buttons',
    CardDetailBadges: 'card-detail-badges'
});

const Condition = Object.freeze({
    Admin: 'admin',
    Edit: 'edit',
    ReadOnly: 'readOnly',
    SignedIn: 'signedIn',
    SignedOut: 'signedOut',
    Always: 'always'
});

const enums = {
    Scope,
    Type,
    Visibility,
    Key,
    Capability,
    Condition
};

export default enums;