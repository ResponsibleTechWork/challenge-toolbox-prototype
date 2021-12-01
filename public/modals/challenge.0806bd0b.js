function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},i={},n=t.parcelRequire0e29;null==n&&((n=function(e){if(e in s)return s[e].exports;if(e in i){var t=i[e];delete i[e];var n={id:e,exports:{}};return s[e]=n,t.call(n.exports,n,n.exports),n.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){i[e]=t},t.parcelRequire0e29=n),n("bDs4w");var d;d=JSON.parse('{"data":[{"name":"Principles of Software Engineering","src":"https://principles.green/","pledges":[{"id":1,"text":"carbon efficient"},{"id":2,"text":"energy efficient"}],"reasons":{"positive":[{"id":1,"text":"efficient"},{"id":2,"text":"low intensity"}],"negative":[{"id":1,"text":"inefficient"},{"id":2,"text":"high intensity"}]},"selected":false},{"name":"Sustainable Web Manifesto","src":"https://www.sustainablewebmanifesto.com/","pledges":[{"id":1,"text":"clean"},{"id":2,"text":"efficient"},{"id":3,"text":"open"},{"id":4,"text":"honest"},{"id":5,"text":"regenerative"},{"id":6,"text":"resilient"}],"reasons":{"positive":[{"id":1,"text":"supportive"},{"id":2,"text":"collaborative"},{"id":3,"text":"fast"}],"negative":[{"id":1,"text":"obstructive"},{"id":2,"text":"opaque"},{"id":3,"text":"slow"}]},"selected":false},{"name":"Challenge Toolbox Prototype","src":"https://www.figma.com/file/E7ZOq83wqAE6ABfoIXnnVm/Challenge-Toolbox-Prototype?node-\'id\'=3%3A111","pledges":[{"id":1,"text":"respect people"},{"id":2,"text":"protect against abuse"},{"id":3,"text":"make accessible tech"},{"id":4,"text":"consider social impacts"}],"reasons":{"positive":[{"id":1,"text":"improves well-being"},{"id":2,"text":"improves privacy"}],"negative":[{"id":1,"text":"annoying"},{"id":2,"text":"misleading"}]},"selected":true}]}');var o=n("LdkDU");o=n("LdkDU");var r=class{constructor(e=o.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){return this.log.push({type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}}),{isPledgeNowLogged:!0,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))}}removePledgeFromLog(){return this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){this.currentPledge=t,this.context=e;const s=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>e.pledge.id===t.id&&e.type===this.type))),{isPledgeNowLogged:i,updatedPledges:n}=s?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:i,updatedPledges:n}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:s,updatedReasons:i}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:s,updatedReasons:i}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],s=t.length>0?t.length:0;return 0===s?"":s.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),s=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],i=s.length>0?s.length:0;return 0===i?"":i.toString()}static getButtonText(e,t){let s="";switch(e){case o.default.Type.Challenge:s=t>0?`Challenges (${t})`:"Challenge";break;case o.default.Type.Celebrate:s=t>0?`Celebrations (${t})`:"Celebrate"}return s}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const s=e.card;return{challenges:[...new Set(t.filter((e=>e.type===o.default.Type.Challenge&&e.card===s)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===o.default.Type.Celebrate&&e.card===s)).map((e=>e.member)))].length}}static getCustomBadgeCounts(e,t,s={}){if(void 0===t)return s.count=0,s;const i=e.card,n=[...new Set(t.filter((e=>e.pledge.id===s.id&&e.card===i)).map((e=>e.member)))].length;return s.count=n,s}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const s=e.card;return{challenges:t.filter((e=>e.type===o.default.Type.Challenge&&e.card===s)).length,celebrations:t.filter((e=>e.type===o.default.Type.Celebrate&&e.card===s)).length}}};(async()=>{const t="https://trello.com/"===document.referrer;console.log("isLive: ",t);const s=e(d).data.find((e=>e.selected)).pledges,i=document.getElementById("pledges"),n=document.getElementById("reasons");document.getElementById("src").href=e(d).data.find((e=>e.selected)).src;const l=o.default.Scope.Card,a=o.default.Visibility.Shared,g=o.default.Key.LogEntries,c=o.default.Capability.CardButtons;let p,u,h;t?(u=window.TrelloPowerUp.iframe(),h=await u.get(l,a,g),p=u.arg("type"),console.log(`Data stored for ${g} against ${l} with ${a} access for ${c}  : `,h)):p=o.default.Type.Challenge;const f=new r(p),y=p===o.default.Type.Challenge?e(d).data.find((e=>e.selected)).reasons.negative:e(d).data.find((e=>e.selected)).reasons.positive;if(h&&void 0!==h){const e=f.setLog(h);console.log("set log with log from t: ",f.setLog(e))}const m=(e,t)=>{i.querySelectorAll(".btn").forEach((s=>{s.classList.remove("selected"),e.forEach((e=>{parseInt(t.id)===parseInt(s.id)&&s.classList.add("selected")})),parseInt(t.id)===parseInt(s.id)&&s.classList.add("selected")}))},P=e=>{n.querySelectorAll(".btn").forEach((t=>{t.classList.remove("selected"),e!==[]&&e.forEach((s=>{parseInt(s.id)===parseInt(t.id)?t.classList.add("selected"):e.filter((e=>parseInt(e.id)===parseInt(t.id)))===[]&&t.classList.remove("selected")}))}))},b=()=>{const e=s.map((e=>{const t=f.getReasonsCountByPledge(e.id),s=p===o.default.Type.Challenge?"btnChallenge":"btnCelebrate";return`<li>\n                        <button id="${e.id}" class="btn ${s}">${e.text}<span class="counter">${t}</span></button>\n                    </li>`}));i.innerHTML=e.join(""),i.querySelectorAll(".btn").forEach((e=>{e.addEventListener("click",(i=>((e,i)=>{const n=t?u.getContext():{board:"board #1",member:"member #1",card:"card #1"},d=s.find((e=>parseInt(e.id)===parseInt(i))),{isPledgeNowLogged:o,updatedPledges:r}=f.togglePledge(n,d);m(r,d),w(),P(f.getReasonsForCurrentPledge())})(0,e.id)))})),m(f.getLoggedPledges(),f.getCurrentPledge())};b();const w=()=>{const e=y.map((e=>`<li>\n                        <button id="${e.id}" class="btn btnReason">${e.text}</button>\n                    </li>`));n.innerHTML=e.join(""),n.querySelectorAll(".btn").forEach((e=>{e.addEventListener("click",(t=>((e,t)=>{const s=y.find((e=>parseInt(e.id)===parseInt(t))),{isReasonNowLogged:i,updatedReasons:n}=f.toggleReason(s);P(n),b()})(0,e.id)))})),P(f.getReasonsForCurrentPledge())};w();document.getElementById("submit").addEventListener("click",(async e=>{if(!t)return;const s=f.getLog();await u.set(l,a,g,s);const i=await u.get(l,a,g);return console.log("returned save object: ",i),await u.notifyParent("done"),u.closeModal()}))})();
//# sourceMappingURL=challenge.0806bd0b.js.map