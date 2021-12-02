function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},n={},i=t.parcelRequire0e29;null==i&&((i=function(e){if(e in s)return s[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return s[e]=i,t.call(i.exports,i,i.exports),i.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){n[e]=t},t.parcelRequire0e29=i),i("bDs4w");var d;d=JSON.parse('{"data":[{"name":"Principles of Software Engineering","src":"https://principles.green/","pledges":[{"id":1,"text":"carbon efficient"},{"id":2,"text":"energy efficient"}],"reasons":{"positive":[{"id":1,"text":"efficient"},{"id":2,"text":"low intensity"}],"negative":[{"id":1,"text":"inefficient"},{"id":2,"text":"high intensity"}]},"selected":false},{"name":"Sustainable Web Manifesto","src":"https://www.sustainablewebmanifesto.com/","pledges":[{"id":1,"text":"clean"},{"id":2,"text":"efficient"},{"id":3,"text":"open"},{"id":4,"text":"honest"},{"id":5,"text":"regenerative"},{"id":6,"text":"resilient"}],"reasons":{"positive":[{"id":1,"text":"supportive"},{"id":2,"text":"collaborative"},{"id":3,"text":"fast"}],"negative":[{"id":1,"text":"obstructive"},{"id":2,"text":"opaque"},{"id":3,"text":"slow"}]},"selected":false},{"name":"Challenge Toolbox Prototype","src":"https://www.figma.com/file/E7ZOq83wqAE6ABfoIXnnVm/Challenge-Toolbox-Prototype?node-\'id\'=3%3A111","pledges":[{"id":1,"text":"respect people"},{"id":2,"text":"protect against abuse"},{"id":3,"text":"make accessible tech"},{"id":4,"text":"consider social impacts"}],"reasons":{"positive":[{"id":1,"text":"improves well-being"},{"id":2,"text":"improves privacy"}],"negative":[{"id":1,"text":"annoying"},{"id":2,"text":"misleading"}]},"selected":true}]}');var r=i("LdkDU");r=i("LdkDU");var o=class{constructor(e=r.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){const e={type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}};this.log.push(e),console.log("log ",this.log),console.log("this.currentPledge ",this.currentPledge);const t=this.log.map((e=>e.type===this.type&&parseInt(e.pledge.id)===parseInt(this.currentPledge.id)));return console.log("matchingEntries ",t),{isPledgeNowLogged:!0,updatedPledges:t}}removePledgeFromLog(){return console.log("removePledgeFromLog"),this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){this.currentPledge=t,this.context=e;const s=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>parseInt(e.pledge.id)===parseInt(t.id)&&e.type===this.type))),{isPledgeNowLogged:n,updatedPledges:i}=s?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:n,updatedPledges:i}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:s,updatedReasons:n}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:s,updatedReasons:n}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],s=t.length>0?t.length:0;return 0===s?"":s.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),s=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],n=s.length>0?s.length:0;return 0===n?"":n.toString()}static getButtonText(e,t){let s="";switch(e){case r.default.Type.Challenge:s=t>0?`Challenges (${t})`:"Challenge";break;case r.default.Type.Celebrate:s=t>0?`Celebrations (${t})`:"Celebrate"}return s}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const s=e.card;return{challenges:[...new Set(t.filter((e=>e.type===r.default.Type.Challenge&&e.card===s)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===r.default.Type.Celebrate&&e.card===s)).map((e=>e.member)))].length}}static getLabelVoteCount(e,t,s={}){if(void 0===t)return 0;const n=e.card;return[...new Set(t.filter((e=>e.pledge.id===s.id&&e.card===n)).map((e=>e.member)))].length}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const s=e.card;return{challenges:t.filter((e=>e.type===r.default.Type.Challenge&&e.card===s)).length,celebrations:t.filter((e=>e.type===r.default.Type.Celebrate&&e.card===s)).length}}};(async()=>{const t="https://trello.com/"===document.referrer,s=e(d).data.find((e=>e.selected)).pledges,n=document.getElementById("pledges"),i=document.getElementById("reasons");document.getElementById("src").href=e(d).data.find((e=>e.selected)).src;const l=r.default.Scope.Card,a=r.default.Visibility.Shared,g=r.default.Key.LogEntries;r.default.Capability.CardButtons;let c,p,u;t?(p=window.TrelloPowerUp.iframe(),u=await p.get(l,a,g),c=p.arg("type")):c=r.default.Type.Challenge;const h=new o(c),f=c===r.default.Type.Challenge?e(d).data.find((e=>e.selected)).reasons.negative:e(d).data.find((e=>e.selected)).reasons.positive;if(u&&void 0!==u){const e=h.setLog(u);console.log("set log with log from t: ",e)}const y=(e,t)=>{n.querySelectorAll(".btn").forEach((s=>{s.classList.remove("selected"),e.forEach((e=>{parseInt(t.id)===parseInt(s.id)&&s.classList.add("selected")})),parseInt(t.id)===parseInt(s.id)&&s.classList.add("selected")}))},m=e=>{i.querySelectorAll(".btn").forEach((t=>{t.classList.remove("selected"),e!==[]&&e.forEach((s=>{parseInt(s.id)===parseInt(t.id)?t.classList.add("selected"):e.filter((e=>parseInt(e.id)===parseInt(t.id)))===[]&&t.classList.remove("selected")}))}))},P=()=>{const e=s.map((e=>{const t=h.getReasonsCountByPledge(e.id),s=c===r.default.Type.Challenge?"btnChallenge":"btnCelebrate";return`<li>\n                        <button id="${e.id}" class="btn ${s}">${e.text}<span class="counter">${t}</span></button>\n                    </li>`}));n.innerHTML=e.join(""),n.querySelectorAll(".btn").forEach((e=>{e.addEventListener("click",(n=>((e,n)=>{const i=t?p.getContext():{board:"board #1",member:"member #1",card:"card #1"},d=s.find((e=>parseInt(e.id)===parseInt(n))),{isPledgeNowLogged:r,updatedPledges:o}=h.togglePledge(i,d);y(o,d),b(),m(h.getReasonsForCurrentPledge())})(0,e.id)))})),y(h.getLoggedPledges(),h.getCurrentPledge())};P();const b=()=>{const e=f.map((e=>`<li>\n                        <button id="${e.id}" class="btn btnReason">${e.text}</button>\n                    </li>`));i.innerHTML=e.join(""),i.querySelectorAll(".btn").forEach((e=>{e.addEventListener("click",(t=>((e,t)=>{const s=f.find((e=>parseInt(e.id)===parseInt(t))),{isReasonNowLogged:n,updatedReasons:i}=h.toggleReason(s);m(i),P()})(0,e.id)))})),m(h.getReasonsForCurrentPledge())};b();document.getElementById("submit").addEventListener("click",(async e=>{if(!t)return;const s=h.getLog();await p.set(l,a,g,s);const n=await p.get(l,a,g);return console.log("returned save object: ",n),await p.notifyParent("done"),p.closeModal()}))})();
//# sourceMappingURL=challenge.2e560cdc.js.map
