function e(e,t,l,o){Object.defineProperty(e,t,{get:l,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},o={},s=t.parcelRequire0e29;null==s&&((s=function(e){if(e in l)return l[e].exports;if(e in o){var t=o[e];delete o[e];var s={id:e,exports:{}};return l[e]=s,t.call(s.exports,s,s.exports),s.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},t.parcelRequire0e29=s),s.register("bXuNP",(function(t,l){var o,s;e(t.exports,"register",(()=>o),(e=>o=e)),e(t.exports,"resolve",(()=>s),(e=>s=e));var n={};o=function(e){for(var t=Object.keys(e),l=0;l<t.length;l++)n[t[l]]=e[t[l]]},s=function(e){var t=n[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s("bXuNP").register(JSON.parse('{"2JFQr":"index.8e02c208.js","bJmGX":"rtw.db725a81.js","7WKo9":"rtw-trello.edaa1442.js","cX2tx":"spotify.1e0f0708.js","irEM1":"spotify-trello.00774160.js","2Ywgl":"swm.415b8913.js","cHbDk":"princeton.82973572.js","dkzSf":"index.ab1d9c77.js"}'));var n=s("LdkDU");const r=(e,t)=>(async e=>[{text:"Challenge Toolbox",callback:e=>(async e=>e.popup({title:"Toolbox preferences",url:"./board-buttons-popup-authors.html",height:225}))(e),condition:n.default.Condition.Always}])();n=s("LdkDU"),n=s("LdkDU");var i=class{constructor(e=n.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){return console.log("addPledgeToLog"),this.log.push({type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}}),{isPledgeNowLogged:!0,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))}}removePledgeFromLog(){return console.log("removePledgeFromLog"),this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){this.currentPledge=t,this.context=e,console.log("togglePledge this.log ",this.log),console.log("togglePledge this.type ",this.type),console.log("togglePledge this.log ",this.log),console.log("this.isLogEmpty() ",this.isLogEmpty()),console.log("this.log.find(entry => entry.pledge.id === pledge.id) ",this.log.find((e=>e.pledge.id===t.id))),console.log("this.log.find(entry => entry.pledge.id === pledge.id && entry.type === this.type) ",this.log.find((e=>e.pledge.id===t.id&&e.type===this.type)));const l=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>e.pledge.id===t.id&&e.type===this.type)));console.log("togglePledge isPledgeLogged ",l);const{isPledgeNowLogged:o,updatedPledges:s}=l?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:o,updatedPledges:s}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:l,updatedReasons:o}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:l,updatedReasons:o}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],l=t.length>0?t.length:0;return 0===l?"":l.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),l=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],o=l.length>0?l.length:0;return 0===o?"":o.toString()}static getButtonText(e,t){let l="";switch(e){case n.default.Type.Challenge:l=t>0?`Challenges (${t})`:"Challenge";break;case n.default.Type.Celebrate:l=t>0?`Celebrations (${t})`:"Celebrate"}return l}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const l=e.card;return{challenges:[...new Set(t.filter((e=>e.type===n.default.Type.Challenge&&e.card===l)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===n.default.Type.Celebrate&&e.card===l)).map((e=>e.member)))].length}}static getLabelVoteCount(e,t,l={}){if(void 0===t)return 0;const o=e.card;return[...new Set(t.filter((e=>e.pledge.id===l.id&&e.card===o)).map((e=>e.member)))].length}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const l=e.card;return{challenges:t.filter((e=>e.type===n.default.Type.Challenge&&e.card===l)).length,celebrations:t.filter((e=>e.type===n.default.Type.Celebrate&&e.card===l)).length}}};const a=(e,t)=>(async e=>{const t=n.default.Scope.Card,l=n.default.Visibility.Shared,o=n.default.Key.LogEntries,s=(n.default.Capability.CardBadges,await e.get(t,l,o)),r=e.getContext(),{challenges:a,celebrations:d}=i.getChallengeBadgeCounts(r,s),g=i.getButtonText(n.default.Type.Challenge,a),c=i.getButtonText(n.default.Type.Celebrate,d);if(0===a&&0===d)return[];const u=[{text:g,color:"red"},{text:c,color:"green"}],p=[];return 0!==a&&p.push(u[0]),0!==a&&p.push(u[1]),e.card("id","name").then((function(e){return p}))})(e);n=s("LdkDU");const d=(e,t)=>(async e=>{const t=n.default.Scope.Card,l=n.default.Visibility.Shared,o=n.default.Key.LogEntries,s=(n.default.Capability.CardButtons,await e.get(t,l,o)),r=e.getContext(),{challenges:a,celebrations:d}=i.getChallengeBadgeCounts(r,s),g=i.getButtonText(n.default.Type.Challenge,a),c=i.getButtonText(n.default.Type.Celebrate,d),u=e=>{console.log("onCloseChallengToolbox")};return[{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:g,condition:n.default.Condition.Always,callback:function(e){return e.modal({title:"Challenge",args:{type:n.default.Type.Challenge},url:"./challenge.html",fullscreen:!1,height:500,callback:u})}},{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:c,condition:n.default.Condition.Always,callback:function(e){return e.modal({title:"Celebrate",args:{type:n.default.Type.Celebrate},url:"./modals/celebrate.html",fullscreen:!1,height:500})}}]})(e);n=s("LdkDU");s("bDs4w");n=s("LdkDU");var g={Authors:Object.freeze({RTW:"rtw",Spotify:"spotify",SWM:"swm",PrinciplesGreen:"pg",Princeton:"princeton"}),Environments:Object.freeze({Trello:"Trello"})};s.register("1L4ef",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("bJmGX")).then((()=>s("b6NUa")))})),s.register("aL8Qr",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("7WKo9")).then((()=>s("bEksa")))})),s.register("aHNJm",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("cX2tx")).then((()=>s("bmO0s")))})),s.register("hL96R",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("irEM1")).then((()=>s("f1e8W")))})),s.register("4Fu9l",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("2Ywgl")).then((()=>s("ffvez")))})),s.register("MsWMT",(function(e,t){e.exports=import("./"+s("bXuNP").resolve("cHbDk")).then((()=>s("epFvb")))}));const c=async e=>{let t,l;return(async()=>{switch(e){case g.Authors.RTW:return t=await s("1L4ef"),l=await s("aL8Qr"),{...t,...l};case g.Authors.Spotify:return t=await s("aHNJm"),l=await s("hL96R"),{...t,...l};case g.Authors.SWM:return t=await s("4Fu9l"),{...t,...l};case g.Authors.Princeton:return t=await s("MsWMT"),{...t,...l}}})()};var u={getTrelloData:async e=>{const t=e.id;return await c(t)},getAuthorDataById:c};var p={getData:async e=>await u.getAuthorDataById(e.id),getCapabilityPreferences:(e,t)=>{const l=e.capabilities.find((e=>e.capability===t));return l&&l.enabled?l.labels:[]},getTrelloLabels:async({t:e,challengeLog:t,pledges:l,log:o,context:s,popup:r=null,modal:a=null,mode:d=n.default.Mode.Label})=>{const g=e=>{const t=i.getLabelVoteCount(s,o,e);return console.log("count ",t),t.toString()||""};switch(d){case n.default.Mode.Label:return l.map((l=>({text:`${l.text} ${g(l)}`,condition:n.default.Condition.Always,callback:()=>(async(e,t,l,o)=>{const{isPledgeNowLogged:s,updatedPledges:n}=t.togglePledge(l,o);return console.log("updatedPledges ",n),await e.set(scope,visibility,key,n),await e.get(scope,visibility,key)})(e,t,s,l)})));case n.default.Mode.Popup:return l.map((t=>({text:`${t.text} ${g(t)}`,condition:n.default.Condition.Always,callback:()=>((e,t,l)=>e.popup({title:l.prompt,items:l.effects}))(e,0,r)})));case n.default.Mode.Modal:return l.map((t=>({text:`${t.text} ${g(t)}`,condition:n.default.Condition.Always,callback:()=>((e,t,l)=>e.modal({title:l.prompt,items:l.effects}))(e,0,r)})))}},getPopup:async e=>{const t=e.popup;return!t||t&&!t.enabled?null:t}};const h=(e,t)=>(async e=>{const t=e.getContext(),l=await e.get(n.default.Scope.Card,n.default.Visibility.Shared,n.default.Key.LogEntries),o=new i(n.default.Type.Challenge);let s;l&&void 0!==l&&(s=o.setLog(l));const r=await e.get(n.default.Scope.Board,n.default.Visibility.Shared,n.default.Key.ChallengePreferences),a=await p.getData(r),d=await p.getCapabilityPreferences(a,n.default.Capability.CardDetailBadges);console.log("card-detail-badges pledges ",d);const g=await p.getTrelloLabels({t:e,challengeLog:o,pledges:d,log:s,context:{board:t.board,card:t.card,member:t.member},mode:n.default.Mode.Label});return console.log("card-detail-badges labels ",g),g})(e);n=s("LdkDU");const f=(e,t)=>(async e=>(await e.get(n.default.Scope.Card,n.default.Visibility.Shared,n.default.Key.LogEntries),{title:"My Card Back Section",icon:GRAY_ICON,content:{type:"iframe",url:e.signUrl("./section.html"),height:230,action:{text:"My Action",callback:e=>(async e=>e.popup)(e)}}}))(e);window.TrelloPowerUp.initialize({"board-buttons":(e,t)=>r(),"card-badges":(e,t)=>a(e),"card-buttons":(e,t)=>d(e),"card-detail-badges":(e,t)=>h(e),"card-back-section":(e,t)=>f(e)});
//# sourceMappingURL=index.8e02c208.js.map
