export const add = (x,y) => {
    return x + y;
};


let pledgesLog = [];

export const logChallenge = pledgeId => {
    const log = pledgesLog.find(log => log.pledge.id === pledgeId);
    if(log === undefined) {
        pledgesLog.push({
            type: 'challenge',
            board: context.board,
            member: context.member,
            card: context.card,
            pledgeId: pledgeId,        
        }
    );
    } else {
        pledgesLog = pledgesLog.filter(log => log.pledge.id !== pledgeId);
    }
    console.log(pledgesLog);
};