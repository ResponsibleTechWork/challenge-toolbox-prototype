import trelloEnums from './trello-enums';

class ChallengeLog {

    constructor(type = trelloEnums.Type.Challenge) {
      this.type = type;
      this.log = [];
      this.currentPledge = {};
      this.context = {};
      this.currentReason = {};
    }

    // private 
    islogTruthy(val) {
        return (val !== null && val !== undefined && val !== [] && Object.entries(val).length > 0 || typeof(val) === 'number' );
    }

    // private 
    islogFalsy(val) {
        return !this.islogTruthy(val);
    }

    // public 
    isLogEmpty() {
        return this.log === [];
    }
  
    // public
    getLog() {
        return this.log;
    }
  
    // public
    setLog(log) {
        this.log = log;
        return this.log;
    }
  
    // public
    setType(type) {
        this.type = type;
        return this.type;
    }

    // public
    getCurrentPledge() {
        return this.currentPledge;
    }

    // private
    addPledgeToLog() {

        const pledge = {
            type: this.type,
            board: this.context.board,
            member: this.context.member,
            card: this.context.card,
            pledge: {
                id: this.currentPledge.id,
                text: this.currentPledge.text,
                reasons: []
            },                
        };

        this.log.push(pledge);

        const matchingEntries = this.log.filter(entry => entry.type === this.type && entry.card === this.context.card);

        return { isPledgeNowLogged: true, updatedPledges: matchingEntries };
    };
    
    // private
    removePledgeFromLog() {

        if(this.isLogEmpty()) return { isPledgeNowLogged: false, updatedPledges: [] };
        if(this.getReasonsForCurrentPledge(this.currentPledge).length > 0) {
            return { isPledgeNowLogged: false, updatedPledges: this.log.map(entry => entry.pledge) };
        }
        this.log = this.log.filter(entry => entry.pledge.id !== this.currentPledge.id && entry.type === this.type);
        return { isPledgeNowLogged: false, updatedPledges: this.log.filter(entry => entry.pledge).filter(entry => entry.type === this.type) };
    }

    // public
    togglePledge(context, pledge) {

        this.currentPledge = pledge;
        this.context = context;

        const isPledgeLogged = this.isLogEmpty() ? false : this.islogTruthy(this.log.find(entry => parseInt(entry.pledge.id) === parseInt(pledge.id) && entry.type === this.type));

        const { isPledgeNowLogged, updatedPledges } = isPledgeLogged
            ? this.removePledgeFromLog()
            : this.addPledgeToLog();

        return { isPledgeNowLogged, updatedPledges };
    }

    // public
    getLoggedPledges() {
        return this.log.map(entry => entry.pledge);
    }

    // public 
    getReasonsForCurrentPledge() {
        if(this.islogFalsy(this.currentPledge) || this.isLogEmpty()) return [];
        const reasons = this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type).pledge.reasons;
        return reasons === undefined ? [] : reasons;
    }

    // private 
    addReasonToPledge() {
        const reasons = [ ...this.getReasonsForCurrentPledge(), this.currentReason ];
        const updatedReasons = [ ...this.getReasonsForCurrentPledge(), this.currentReason ];
        this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type).pledge.reasons = reasons;
        return { isReasonNowLogged: true, updatedReasons };
    }

    // private
    removeReasonFromPledge() {        
        this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type).pledge.reasons = this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type).pledge.reasons.filter(r => r.id !== this.currentReason.id);
        return { isReasonNowLogged: false, updatedReasons: this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type).pledge.reasons };
    }

    // public
    toggleReason(reason) {

        if(this.currentPledge === {}) return;

        this.currentReason = reason;

        const isPledgeLogged = !!this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type);
        const isReasonLogged = isPledgeLogged && !!this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type && entry.pledge.reasons.find(r => r.id === reason.id));

        const { isReasonNowLogged, updatedReasons } = isReasonLogged 
            ? this.removeReasonFromPledge()
            : this.addReasonToPledge();

        return { isReasonNowLogged, updatedReasons };
    }

    // public
    getReasonsCount() {
        const entry = this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.type === this.type);
        const reasons = entry !== undefined ? entry.pledge.reasons ? entry.pledge.reasons : [] : [];
        const reasonCount = reasons.length > 0 ? reasons.length : 0;
        return reasonCount === 0 ? '' : reasonCount.toString();
    }

    // public
    getReasonsCountByPledge(pledgeId) {
        const entry = this.log.find(entry => entry.pledge.id === pledgeId && entry.type === this.type);
        const reasons = entry !== undefined ? entry.pledge.reasons ? entry.pledge.reasons : [] : [];
        const reasonCount = reasons.length > 0 ? reasons.length : 0;
        return reasonCount === 0 ? '' : reasonCount.toString();
    }

    // public static
    static getButtonText(type, count) {
     
        let text = '';

        switch(type) {
            case trelloEnums.Type.Challenge:
                text = count > 0
                    ? `Challenges (${count})`
                    : `Challenge`;
                    break;
            case trelloEnums.Type.Celebrate:
                text = count > 0
                    ? `Celebrations (${count})`
                    : `Celebrate`;
                    break;
        }

        return text;
    }

    // public static
    static getChallengeBadgeCounts(context, log) {

        if(log === undefined) {
            return { challenges: 0, celebrations: 0 };
        }

        const card = context.card;
        const cardChallengeCount = [ ...new Set(log.filter(e => e.type === trelloEnums.Type.Challenge && e.card === card).map(e => e.member)) ].length;
        const cardCelebrationCount = [ ...new Set(log.filter(e => e.type === trelloEnums.Type.Celebrate && e.card === card).map(e => e.member)) ].length;

        return {
            challenges: cardChallengeCount,
            celebrations: cardCelebrationCount
        }
    }

    // public static 
    static getLabelVoteCount(context, log, pledge = {}) {

        if(log === undefined) {            
            return 0;
        }

        const card = context.card;

        const count = [ ...new Set(log.filter(e => e.pledge.id === pledge.id && e.card === card).map(e => e.member)) ].length;

        return count;
    }

    static getChallengePledgeCounts(context, log) {

        if(log === undefined) {
            return { challenges: 0, celebrations: 0 };
        }

        const card = context.card;
        const cardChallengeCount = log.filter(entry => entry.type === trelloEnums.Type.Challenge && entry.card === card).length;
        const cardCelebrationCount = log.filter(entry => entry.type === trelloEnums.Type.Celebrate && entry.card === card).length;

        return {
            challenges: cardChallengeCount,
            celebrations: cardCelebrationCount
        }
    }
};

export default ChallengeLog;