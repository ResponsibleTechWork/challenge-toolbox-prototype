export const add = (x,y) => {
    return x + y;
};

export const logChallenge = (pledgesLog, context, pledgeId) => {
    let _pledgesLog = [ ...pledgesLog ];
    const log = _pledgesLog.length > 0 ? _pledgesLog.find(log => log.pledge.id === pledgeId) : undefined;
    if(log === undefined) {
        _pledgesLog.push({
            type: 'challenge',
            board: context.board,
            member: context.member,
            card: context.card,
            pledge: {
                id: pledgeId
            },        
        }
    );
    } else {
        _pledgesLog = _pledgesLog.filter(log => log.pledge.id !== pledgeId);
    }
    return _pledgesLog;
};