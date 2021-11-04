import enums from '../shared/enums';

export class ChallengeLog {

    constructor(type) {
      this.type = type;
      this.log = [];
      this.currentPledge = {};
      this.context = {};
      this.currentReason = {};
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

    // public 
    hasCurrentPledgeChanged(pledge) {
        if(this.getCurrentPledge() === {}) return true;
        return pledge.id !== this.getCurrentPledge().id;
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
        };
    
    // private
    removePledgeFromLog() {
        if(this.isLogEmpty()) return;
        this.log = this.log.filter(entry => entry.pledge.id !== this.currentPledge.id);
    }

    // public
    togglePledge(context, pledge) {

        this.currentPledge = pledge;
        this.context = context;
        
        const isPledgeLogged = this.isLogEmpty() ? false : this.log.find(entry => entry.pledge.id === pledge.id);

        isPledgeLogged
            ? this.removePledgeFromLog()
            : this.addPledgeToLog();

        return isPledgeLogged;
    }

    // public 
    getReasonsForCurrentPledge() {
        if(this.currentPledge === {} || this.isLogEmpty()) return [];
        const reasons = this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons;
        return reasons === undefined ? [] : reasons;
    }

    // private 
    addReasonToPledge() {
        const reasons = [ ...this.getReasonsForCurrentPledge(), this.currentReason ];
        this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons = reasons;
    }

    // private
    removeReasonFromPledge() {
        this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons = this.log.find(entry => entry.pledge.id === this.currentPledge.id).pledge.reasons.filter(r => r.id !== this.currentReason.id);
    }

    // public
    toggleReason(reason) {

        if(this.currentPledge === {}) return;

        this.currentReason = reason;

        const isPledgeLogged = this.log.find(entry => entry.pledge.id === this.currentPledge.id);
        const isReasonLogged = isPledgeLogged && this.log.find(entry => entry.pledge.reasons.find(r => r.id === reason.id));

        isReasonLogged 
            ? this.removeReasonFromPledge()
            : this.addReasonToPledge();

        return isReasonLogged;
    }

    // public
    getReasonsCount() {
        const entry = this.log.find(entry => entry.pledge.id === this.currentPledge.id);
        const reasons = entry !== undefined ? entry.pledge.reasons ? entry.pledge.reasons : [] : [];
        const reasonCount = reasons.length > 0 ? reasons.length : 0;
        return reasonCount === 0 ? '' : reasonCount.toString();
    }
}