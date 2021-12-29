const Scope = Object.freeze({
    Board: 'board',
    Member: 'member',
    Card: 'card',
    Organization: 'organization'
});

const Type = Object.freeze({
    Challenge: 'challenge',
    Celebrate: 'celebrate'
});

const Visibility = Object.freeze({
    Shared: 'shared',
    Private: 'private'
});

const Key = Object.freeze({
    LogEntries: 'Log entries',
    ChallengePreferences: 'Challenge preferences'
});

const Capability = Object.freeze({
    BoardButtons: 'board-buttons',
    CardBadges: 'card-badges',
    CardButtons: 'card-buttons',
    CardDetailBadges: 'card-detail-badges',
    CardBackSection: 'card-back-section',
});

const Condition = Object.freeze({
    Admin: 'admin',
    Edit: 'edit',
    ReadOnly: 'readOnly',
    SignedIn: 'signedIn',
    SignedOut: 'signedOut',
    Always: 'always'
});

const Mode = Object.freeze({
    Label: 'label',
    Popup: 'popup',
    Modal: 'modal'
});

const trelloEnums = {
    Scope,
    Type,
    Visibility,
    Key,
    Capability,
    Condition,
    Mode
};

export default trelloEnums;