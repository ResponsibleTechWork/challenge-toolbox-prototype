import enums from '../shared/enums';

export class ChallengeLog {

    constructor(type) {
      this.type = type;
      this.log = [];
      this.pledge = {};
      this.context = {};
      this.reason = {};
    }
  
    // public
    getLog() {
        return this.log;
    }

    // public
    getPledge() {
        return this.pledge;
    }

    // private
    addPledgeToLog() {
        this.log.push({
                type: this.type,
                board: this.context.board,
                member: this.context.member,
                card: this.context.card,
                pledge: {
                    id: this.pledge.id,
                    text: this.pledge.text,
                    reasons: []
                },                
            })
        };
    
    // private
    removePledgeFromLog() {
        if(this.log.length === 0) return;
        this.log = this.log.filter(entry => entry.pledge.id !== this.pledge.id);
    }

    // public
    togglePledge(context, pledge) {

        this.pledge = pledge;
        this.context = context;
        
        const isPledgeLogged = (this.log.length > 0 && this.log.find(entry => entry.pledge.id === pledge.id));

        isPledgeLogged
            ? this.removePledgeFromLog()
            : this.addPledgeToLog();
    }

    // private 
    addReasonToPledge() {
        this.log.find(entry => entry.pledge.id === this.pledge.id).pledge.reasons = [ ...this.log.find(entry => entry.pledge.id === this.pledge.id).pledge.reasons, this.reason ];
    }

    // private
    removeReasonFromPledge() {
        this.log.find(entry => entry.pledge.id === this.pledge.id).pledge.reasons = this.log.find(entry => entry.pledge.id === this.pledge.id).pledge.reasons.filter(r => r.id !== this.reason.id);
    }

    // public
    toggleReason(reason) {

        this.reason = reason;

        const isPledgeLogged = (this.log.length > 0 && !!this.log.find(entry => entry.pledge.id === this.pledge.id));
        const isReasonLogged = isPledgeLogged && this.log.find(entry => entry.pledge.id === this.pledge.id).pledge.reasons.length > 0;

        isReasonLogged 
            ? this.removeReasonFromPledge()
            : this.addReasonToPledge()
    }

    // public
    getReasonsCount() {
        const reasons = this.log.length > 0 ? this.log[0].pledge.reasons : [];
        const reasonCount = reasons.length > 0 ? reasons.length : 0;
        return reasonCount === 0 ? '' : reasonCount.toString();
    }
}