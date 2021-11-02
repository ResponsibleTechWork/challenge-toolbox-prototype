import enums from '../shared/enums';

export class ChallengeLog {

    constructor(type) {
      this.type = type;
      this.log = [];
    }
  
    checkType() {
      console.log(`Hello, my type is ${this.type}`);
      console.log(`Does type match enum ${this.type === enums.Type.Challenge}`)
    }

    getLog() {
        return this.log;
    }

    add(context, type, pledgeId) {
        this.log.push({
                type: type,
                board: context.board,
                member: context.member,
                card: context.card,
                pledge: {
                    id: pledgeId
                },        
            })
        };
    
    remove(pledgeId) {
        if(this.log.length === 0) return;
        this.log = this.log.filter(entry => entry.pledge.id !== pledgeId);
    }

    record(context, type, pledgeId) {
        (this.log.length > 0 && this.log.find(entry => entry.pledge.id === pledgeId)) 
            ? this.remove(pledgeId)
            : this.add(context, type, pledgeId);
    }  
}