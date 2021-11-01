export const add = (x,y) => {
    return x + y;
};


let pledgesLog = [];

export const logChallenge = (context, pledgeId) => {
    const log = pledgesLog.length > 0 ? pledgesLog.find(log => log.pledge.id === pledgeId) : undefined;
    if(log === undefined) {
        pledgesLog.push({
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
        pledgesLog = pledgesLog.filter(log => log.pledge.id !== pledgeId);
    }
    console.log(pledgesLog);
};