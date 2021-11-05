import enums from '../shared/enums';

export class ChallengeLog {

    constructor(type) {
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
    getCurrentPledge() {
        return this.currentPledge;
    }

    // private
    addPledgeToLog() {
        this.log.push({
                type: this.type,
                board: this.context.board,
                member: this.context.member,
                card: this.context.card,
                pledge: {
                    id: this.currentPledge.id,
                    text: this.currentPledge.text,
                    reasons: []
                },                
            })
            return { isPledgeNowLogged: true, updatedPledges: this.log.map(entry => entry.pledge) };
    };
    
    // private
    removePledgeFromLog() {
        if(this.isLogEmpty()) return { isPledgeNowLogged: false, updatedPledges: [] };
        if(this.getReasonsForCurrentPledge(this.currentPledge).length > 0) {
            return { isPledgeNowLogged: false, updatedPledges: this.log.map(entry => entry.pledge) };
        }
        this.log = this.log.filter(entry => entry.pledge.id !== this.currentPledge.id);
        return { isPledgeNowLogged: false, updatedPledges: this.log.map(entry => entry.pledge) };
    }

    // public
    togglePledge(context, pledge) {

        this.currentPledge = pledge;
        this.context = context;
        
        const isPledgeLogged = this.isLogEmpty() ? false : this.islogTruthy(this.log.find(entry => entry.pledge.id === pledge.id));

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
        const reasons = this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons;
        return reasons === undefined ? [] : reasons;
    }

    // private 
    addReasonToPledge() {
        const reasons = [ ...this.getReasonsForCurrentPledge(), this.currentReason ];
        const updatedReasons = [ ...this.getReasonsForCurrentPledge(), this.currentReason ];
        this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons = reasons;
        return { isReasonNowLogged: true, updatedReasons };
    }

    // private
    removeReasonFromPledge() {        
        this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons = this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons.filter(r => r.id !== this.currentReason.id);
        return { isReasonNowLogged: false, updatedReasons: this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons };
    }

    // public
    toggleReason(reason) {

        if(this.currentPledge === {}) return;

        this.currentReason = reason;

        const isPledgeLogged = !!this.log.find(entry => entry.pledge.id === this.currentPledge.id);
        const isReasonLogged = isPledgeLogged && !!this.log.find(entry => entry.pledge.id === this.currentPledge.id && entry.pledge.reasons.find(r => r.id === reason.id));

        const { isReasonNowLogged, updatedReasons } = isReasonLogged 
            ? this.removeReasonFromPledge()
            : this.addReasonToPledge();

        return { isReasonNowLogged, updatedReasons };
    }

    // public
    getReasonsCount() {
        const entry = this.log.find(entry => entry.pledge.id === this.currentPledge.id);
        const reasons = entry !== undefined ? entry.pledge.reasons ? entry.pledge.reasons : [] : [];
        const reasonCount = reasons.length > 0 ? reasons.length : 0;
        return reasonCount === 0 ? '' : reasonCount.toString();
    }

    // public
    getReasonsCountByPledge(pledgeId) {
        const entry = this.log.find(entry => entry.pledge.id === pledgeId);
        const reasons = entry !== undefined ? entry.pledge.reasons ? entry.pledge.reasons : [] : [];
        const reasonCount = reasons.length > 0 ? reasons.length : 0;
        return reasonCount === 0 ? '' : reasonCount.toString();
    }

    //static
    static getButtonText(log, capability, type) {
     
        const entries = (log && log !== undefined) ? log.filter(entry => entry.type === type) : [];

        let text = '';

        switch(type) {
            case enums.Type.Challenge:
                text = entries.length > 0
                    ? `Challenges (${entries.length})`
                    : `Challenge`;
                    break;
            case enums.Type.Celebrate:
                text = entries.length > 0
                    ? `Celebrations (${entries.length})`
                    : `Celebrate`;
                    break;
        }

        console.warn('button text: ', text);

        return text;
    }
}