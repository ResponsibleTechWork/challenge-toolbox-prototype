function e(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},s=t.parcelRequire0e29;null==s&&((s=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return r[e]=s,t.call(s.exports,s,s.exports),s.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},t.parcelRequire0e29=s),s.register("bXuNP",(function(t,r){var o,s;e(t.exports,"register",(()=>o),(e=>o=e)),e(t.exports,"resolve",(()=>s),(e=>s=e));var l={};o=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)l[t[r]]=e[t[r]]},s=function(e){var t=l[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s("bXuNP").register(JSON.parse('{"2JFQr":"index.9086faa7.js","bJmGX":"rtw.db725a81.js","7WKo9":"rtw-trello.edaa1442.js","cX2tx":"spotify.1e0f0708.js","irEM1":"spotify-trello.00774160.js","2Ywgl":"swm.415b8913.js","cHbDk":"princeton.82973572.js","kcacr":"index.fcb4871a.js"}'));var l=s("LdkDU");const n=async e=>[{text:"Challenge Toolbox",callback:e=>(async e=>{const t=await e.get(l.default.Scope.Board,l.default.Visibility.Shared,l.default.Key.ChallengePreferences);return e.popup({title:"Toolbox preferences",url:"capabilities/board-buttons-popup-authors.html",args:{myArgs:t}})})(e),condition:l.default.Condition.Always}];l=s("LdkDU"),l=s("LdkDU");var a=class{constructor(e=l.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){return this.log.push({type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}}),{isPledgeNowLogged:!0,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))}}removePledgeFromLog(){return this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){this.currentPledge=t,this.context=e;const r=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>e.pledge.id===t.id&&e.type===this.type))),{isPledgeNowLogged:o,updatedPledges:s}=r?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:o,updatedPledges:s}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:r,updatedReasons:o}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:r,updatedReasons:o}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],r=t.length>0?t.length:0;return 0===r?"":r.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),r=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],o=r.length>0?r.length:0;return 0===o?"":o.toString()}static getButtonText(e,t){let r="";switch(e){case l.default.Type.Challenge:r=t>0?`Challenges (${t})`:"Challenge";break;case l.default.Type.Celebrate:r=t>0?`Celebrations (${t})`:"Celebrate"}return r}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const r=e.card;return{challenges:[...new Set(t.filter((e=>e.type===l.default.Type.Challenge&&e.card===r)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===l.default.Type.Celebrate&&e.card===r)).map((e=>e.member)))].length}}static getCustomBadgeCounts(e,t,r={}){if(void 0===t)return r.count=0,r;const o=e.card,s=[...new Set(t.filter((e=>e.pledge.id===r.id&&e.card===o)).map((e=>e.member)))].length;return r.count=s,r}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const r=e.card;return{challenges:t.filter((e=>e.type===l.default.Type.Challenge&&e.card===r)).length,celebrations:t.filter((e=>e.type===l.default.Type.Celebrate&&e.card===r)).length}}};const i=(e,t)=>(async e=>{const t=l.default.Scope.Card,r=l.default.Visibility.Shared,o=l.default.Key.LogEntries,s=l.default.Capability.CardBadges,n=await e.get(t,r,o);console.log(`Data stored for ${o} against ${t} with ${r} access for ${s}  : `,n);const i=e.getContext();console.log("Context for card badges: ",i);const{challenges:d,celebrations:g}=a.getChallengeBadgeCounts(i,n),c=a.getButtonText(l.default.Type.Challenge,d),u=a.getButtonText(l.default.Type.Celebrate,g);if(console.log(`Current value for ${o} for card-badges`,n),0===d&&0===g)return[];const p=[{text:c,color:"red"},{text:u,color:"green"}],h=[];return 0!==d&&h.push(p[0]),0!==d&&h.push(p[1]),e.card("id","name").then((function(e){return h}))})(e);l=s("LdkDU");const d=(e,t)=>(async e=>{const t=l.default.Scope.Card,r=l.default.Visibility.Shared,o=l.default.Key.LogEntries,s=l.default.Capability.CardButtons,n=await e.get(t,r,o);console.log(`Data stored for ${o} against ${t} with ${r} access for ${s}  : `,n);const i=e.getContext();console.log("Context for card badges: ",i);const{challenges:d,celebrations:g}=a.getChallengeBadgeCounts(i,n),c=a.getButtonText(l.default.Type.Challenge,d),u=a.getButtonText(l.default.Type.Celebrate,g),p=e=>{console.log("onCloseChallengToolbox")},h=await e.card("name").get("name");return console.log("card: ",JSON.stringify(h,null,2)),[{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:c,condition:l.default.Condition.Always,callback:function(e){return e.modal({title:"Challenge",args:{type:l.default.Type.Challenge},url:"./modals/challenge.html",fullscreen:!1,height:500,callback:p})}},{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:u,condition:l.default.Condition.Always,callback:function(e){return e.modal({title:"Celebrate",args:{type:l.default.Type.Celebrate},url:"./modals/celebrate.html",fullscreen:!1,height:500})}}]})(e);l=s("LdkDU");s("bDs4w");l=s("LdkDU");var g={Authors:Object.freeze({RTW:"rtw",Spotify:"spotify",SWM:"swm",PrinciplesGreen:"pg",Princeton:"princeton"}),Environments:Object.freeze({Trello:"Trello"})};s.register("1L4ef",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("bJmGX")).then((()=>s("b6NUa")))})),s.register("aL8Qr",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("7WKo9")).then((()=>s("bEksa")))})),s.register("aHNJm",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("cX2tx")).then((()=>s("bmO0s")))})),s.register("hL96R",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("irEM1")).then((()=>s("f1e8W")))})),s.register("4Fu9l",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("2Ywgl")).then((()=>s("ffvez")))})),s.register("MsWMT",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("cHbDk")).then((()=>s("epFvb")))}));const c=async e=>{let t,r;return(async()=>{switch(e){case g.Authors.RTW:return t=await s("1L4ef"),r=await s("aL8Qr"),{...t,...r};case g.Authors.Spotify:return t=await s("aHNJm"),r=await s("hL96R"),{...t,...r};case g.Authors.SWM:return t=await s("4Fu9l"),{...t,...r};case g.Authors.Princeton:return t=await s("MsWMT"),{...t,...r}}})()};var u={getTrelloData:async e=>{const t=e.id;return await c(t)},getAuthorDataById:c};var p={getData:async e=>await u.getAuthorDataById(e.id),getCapabilityPreferences:(e,t)=>{const r=e.capabilities.find((e=>e.capability===t));return r&&r.enabled?r.labels:[]},getTrelloLabels:async({pledges:e,log:t,context:r,popup:o=null})=>(console.log("getTrelloLabels log: ",t),o?e.map((e=>({text:`${e.text} ${a.getCustomBadgeCounts(r,t,e)}`,condition:l.default.Condition.Always,callback:e=>((e,t,r)=>e.popup({title:r.prompt,items:r.effects}))(e,0,o)}))):e.map((e=>({text:e.text,condition:l.default.Condition.Always,callback:t=>(async(e,t,r)=>{const o=new a,{isPledgeNowLogged:s,updatedPledges:l}=o.togglePledge(t,r);return await e.set(scope,visibility,key,l),await e.get(scope,visibility,key)})(t,r,e)})))),getPopup:async e=>{const t=e.popup;return!t||t&&!t.enabled?null:t}};const h=(e,t)=>(async e=>{const t=e.getContext(),r=await e.get(l.default.Scope.Card,l.default.Visibility.Shared,l.default.Key.LogEntries);let o;r&&void 0!==r&&(o=challengeLog.setLog(r));const s=await e.get(l.default.Scope.Board,l.default.Visibility.Shared,l.default.Key.ChallengePreferences),n=await p.getData(s),a=await p.getCapabilityPreferences(n,l.default.Capability.CardDetailBadges);return await p.getTrelloLabels({pledges:a,log:o,context:{board:t.board,card:t.card,member:t.member}})})(e);window.TrelloPowerUp.initialize({"board-buttons":(e,t)=>n(),"card-badges":(e,t)=>i(e),"card-buttons":(e,t)=>d(e),"card-detail-badges":(e,t)=>h(e)});
//# sourceMappingURL=index.9086faa7.js.map
