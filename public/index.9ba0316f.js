function e(e,t,l,o){Object.defineProperty(e,t,{get:l,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},o={},r=t.parcelRequire0e29;null==r&&((r=function(e){if(e in l)return l[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return l[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},t.parcelRequire0e29=r),r.register("bXuNP",(function(t,l){var o,r;e(t.exports,"register",(()=>o),(e=>o=e)),e(t.exports,"resolve",(()=>r),(e=>r=e));var s={};o=function(e){for(var t=Object.keys(e),l=0;l<t.length;l++)s[t[l]]=e[t[l]]},r=function(e){var t=s[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),r("bXuNP").register(JSON.parse('{"2JFQr":"index.9ba0316f.js","bJmGX":"rtw.db725a81.js","7WKo9":"rtw-trello.edaa1442.js","cX2tx":"spotify.1e0f0708.js","irEM1":"spotify-trello.00774160.js","2Ywgl":"swm.415b8913.js","cHbDk":"princeton.82973572.js","dkzSf":"index.62952a18.js"}'));var s=r("LdkDU");const n=(e,t)=>(async e=>[{text:"Challenge Toolbox",callback:e=>(async e=>e.popup({title:"Toolbox preferences",url:"./board-buttons-popup-authors.html",height:225}))(e),condition:s.default.Condition.Always}])();s=r("LdkDU"),s=r("LdkDU");var i=class{constructor(e=s.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){return this.log.push({type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}}),{isPledgeNowLogged:!0,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))}}removePledgeFromLog(){return this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){console.log("togglePledge context ",e),console.log("togglePledge pledge ",t),console.log("togglePledge this.log ",this.log),this.currentPledge=t,this.context=e,this.log.pledge="Emotional harm",this.log.pledge.id="2";const l=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>e.pledge.id===t.id&&e.type===this.type)));console.log("togglePledge isPledgeLogged ",l);const{isPledgeNowLogged:o,updatedPledges:r}=l?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:o,updatedPledges:r}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:l,updatedReasons:o}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:l,updatedReasons:o}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],l=t.length>0?t.length:0;return 0===l?"":l.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),l=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],o=l.length>0?l.length:0;return 0===o?"":o.toString()}static getButtonText(e,t){let l="";switch(e){case s.default.Type.Challenge:l=t>0?`Challenges (${t})`:"Challenge";break;case s.default.Type.Celebrate:l=t>0?`Celebrations (${t})`:"Celebrate"}return l}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const l=e.card;return{challenges:[...new Set(t.filter((e=>e.type===s.default.Type.Challenge&&e.card===l)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===s.default.Type.Celebrate&&e.card===l)).map((e=>e.member)))].length}}static getCustomBadgeCounts(e,t,l={}){if(void 0===t)return l.count=0,l;const o=e.card,r=[...new Set(t.filter((e=>e.pledge.id===l.id&&e.card===o)).map((e=>e.member)))].length;return l.count=r,l}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const l=e.card;return{challenges:t.filter((e=>e.type===s.default.Type.Challenge&&e.card===l)).length,celebrations:t.filter((e=>e.type===s.default.Type.Celebrate&&e.card===l)).length}}};const a=(e,t)=>(async e=>{const t=s.default.Scope.Card,l=s.default.Visibility.Shared,o=s.default.Key.LogEntries,r=(s.default.Capability.CardBadges,await e.get(t,l,o)),n=e.getContext(),{challenges:a,celebrations:d}=i.getChallengeBadgeCounts(n,r),g=i.getButtonText(s.default.Type.Challenge,a),c=i.getButtonText(s.default.Type.Celebrate,d);if(0===a&&0===d)return[];const u=[{text:g,color:"red"},{text:c,color:"green"}],p=[];return 0!==a&&p.push(u[0]),0!==a&&p.push(u[1]),e.card("id","name").then((function(e){return p}))})(e);s=r("LdkDU");const d=(e,t)=>(async e=>{const t=s.default.Scope.Card,l=s.default.Visibility.Shared,o=s.default.Key.LogEntries,r=(s.default.Capability.CardButtons,await e.get(t,l,o)),n=e.getContext(),{challenges:a,celebrations:d}=i.getChallengeBadgeCounts(n,r),g=i.getButtonText(s.default.Type.Challenge,a),c=i.getButtonText(s.default.Type.Celebrate,d),u=e=>{console.log("onCloseChallengToolbox")},p=await e.card("name").get("name");return console.log("card: ",JSON.stringify(p,null,2)),[{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:g,condition:s.default.Condition.Always,callback:function(e){return e.modal({title:"Challenge",args:{type:s.default.Type.Challenge},url:"./challenge.html",fullscreen:!1,height:500,callback:u})}},{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:c,condition:s.default.Condition.Always,callback:function(e){return e.modal({title:"Celebrate",args:{type:s.default.Type.Celebrate},url:"./modals/celebrate.html",fullscreen:!1,height:500})}}]})(e);s=r("LdkDU");r("bDs4w");s=r("LdkDU");var g={Authors:Object.freeze({RTW:"rtw",Spotify:"spotify",SWM:"swm",PrinciplesGreen:"pg",Princeton:"princeton"}),Environments:Object.freeze({Trello:"Trello"})};r.register("1L4ef",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("bJmGX")).then((()=>r("b6NUa")))})),r.register("aL8Qr",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("7WKo9")).then((()=>r("bEksa")))})),r.register("aHNJm",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("cX2tx")).then((()=>r("bmO0s")))})),r.register("hL96R",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("irEM1")).then((()=>r("f1e8W")))})),r.register("4Fu9l",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("2Ywgl")).then((()=>r("ffvez")))})),r.register("MsWMT",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("cHbDk")).then((()=>r("epFvb")))}));const c=async e=>{let t,l;return(async()=>{switch(e){case g.Authors.RTW:return t=await r("1L4ef"),l=await r("aL8Qr"),{...t,...l};case g.Authors.Spotify:return t=await r("aHNJm"),l=await r("hL96R"),{...t,...l};case g.Authors.SWM:return t=await r("4Fu9l"),{...t,...l};case g.Authors.Princeton:return t=await r("MsWMT"),{...t,...l}}})()};var u={getTrelloData:async e=>{const t=e.id;return await c(t)},getAuthorDataById:c};var p={getData:async e=>await u.getAuthorDataById(e.id),getCapabilityPreferences:(e,t)=>{const l=e.capabilities.find((e=>e.capability===t));return l&&l.enabled?l.labels:[]},getTrelloLabels:async({t:e,challengeLog:t,pledges:l,log:o,context:r,popup:n=null})=>(console.log("getTrelloLabels log: ",o),n?l.map((t=>({text:`${t.text} ${i.getCustomBadgeCounts(r,o,t)}`,condition:s.default.Condition.Always,callback:()=>((e,t,l)=>e.popup({title:l.prompt,items:l.effects}))(e,0,n)}))):l.map((l=>({text:l.text,condition:s.default.Condition.Always,callback:()=>(async(e,t,l,o)=>{const{isPledgeNowLogged:r,updatedPledges:s}=t.togglePledge(l,o);return console.log("updatedPledges ",s),await e.set(scope,visibility,key,s),await e.get(scope,visibility,key)})(e,t,r,l)})))),getPopup:async e=>{const t=e.popup;return!t||t&&!t.enabled?null:t}};const h=(e,t)=>(async e=>{const t=e.getContext();console.log("card-detail-badges context ",t);const l=await e.get(s.default.Scope.Card,s.default.Visibility.Shared,s.default.Key.LogEntries),o=new i;let r;l&&void 0!==l&&(r=o.setLog(l));const n=await e.get(s.default.Scope.Board,s.default.Visibility.Shared,s.default.Key.ChallengePreferences),a=await p.getData(n),d=await p.getCapabilityPreferences(a,s.default.Capability.CardDetailBadges);return await p.getTrelloLabels({t:e,challengeLog:o,pledges:d,log:r,context:{board:t.board,card:t.card,member:t.member}})})(e);window.TrelloPowerUp.initialize({"board-buttons":(e,t)=>n(),"card-badges":(e,t)=>a(e),"card-buttons":(e,t)=>d(e),"card-detail-badges":(e,t)=>h(e)});
//# sourceMappingURL=index.9ba0316f.js.map
