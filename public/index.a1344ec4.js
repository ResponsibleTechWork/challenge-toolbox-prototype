function e(e,t,o,l){Object.defineProperty(e,t,{get:o,set:l,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},l={},n=t.parcelRequire0e29;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in l){var t=l[e];delete l[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){l[e]=t},t.parcelRequire0e29=n),n.register("bXuNP",(function(t,o){var l,n;e(t.exports,"register",(()=>l),(e=>l=e)),e(t.exports,"resolve",(()=>n),(e=>n=e));var s={};l=function(e){for(var t=Object.keys(e),o=0;o<t.length;o++)s[t[o]]=e[t[o]]},n=function(e){var t=s[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),n("bXuNP").register(JSON.parse('{"2JFQr":"index.a1344ec4.js","bJmGX":"rtw.db725a81.js","7WKo9":"rtw-trello.edaa1442.js","cX2tx":"spotify.1e0f0708.js","irEM1":"spotify-trello.00774160.js","2Ywgl":"swm.415b8913.js","cHbDk":"princeton.82973572.js","dkzSf":"index.ab1d9c77.js"}'));var s=n("LdkDU");const r=(e,t)=>(async e=>[{text:"Challenge Toolbox",callback:e=>(async e=>e.popup({title:"Toolbox preferences",url:"./board-buttons-popup-authors.html",height:225}))(e),condition:s.default.Condition.Always}])();s=n("LdkDU"),s=n("LdkDU");var i=class{constructor(e=s.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){return console.log("addPledgeToLog"),this.log.push({type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}}),{isPledgeNowLogged:!0,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))}}removePledgeFromLog(){return console.log("removePledgeFromLog"),this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){this.currentPledge=t,this.context=e,console.log("togglePledge this.log ",this.log),console.log("togglePledge this.type ",this.type),console.log("togglePledge this.log ",this.log),console.log("this.isLogEmpty() ",this.isLogEmpty()),console.log("this.log.find(entry => entry.pledge.id === pledge.id) ",this.log.find((e=>e.pledge.id===t.id))),console.log("this.log.find(entry => entry.pledge.id === pledge.id && entry.type === this.type) ",this.log.find((e=>e.pledge.id===t.id&&e.type===this.type)));const o=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>e.pledge.id===t.id&&e.type===this.type)));console.log("togglePledge isPledgeLogged ",o);const{isPledgeNowLogged:l,updatedPledges:n}=o?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:l,updatedPledges:n}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:o,updatedReasons:l}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:o,updatedReasons:l}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],o=t.length>0?t.length:0;return 0===o?"":o.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),o=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],l=o.length>0?o.length:0;return 0===l?"":l.toString()}static getButtonText(e,t){let o="";switch(e){case s.default.Type.Challenge:o=t>0?`Challenges (${t})`:"Challenge";break;case s.default.Type.Celebrate:o=t>0?`Celebrations (${t})`:"Celebrate"}return o}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const o=e.card;return{challenges:[...new Set(t.filter((e=>e.type===s.default.Type.Challenge&&e.card===o)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===s.default.Type.Celebrate&&e.card===o)).map((e=>e.member)))].length}}static getLabelVoteCount(e,t,o={}){if(void 0===t)return 0;const l=e.card;if(null==l)return console.log("no card"),0;t.pledge&&"Emotional harm"===t.pledge&&(this.log=[{...e,pledge:{id:"2",text:"Emotional harm"}}]);return[...new Set(t.filter((e=>e.pledge.id===o.id&&e.card===l)).map((e=>e.member)))].length}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const o=e.card;return{challenges:t.filter((e=>e.type===s.default.Type.Challenge&&e.card===o)).length,celebrations:t.filter((e=>e.type===s.default.Type.Celebrate&&e.card===o)).length}}};const a=(e,t)=>(async e=>{const t=s.default.Scope.Card,o=s.default.Visibility.Shared,l=s.default.Key.LogEntries,n=(s.default.Capability.CardBadges,await e.get(t,o,l)),r=e.getContext(),{challenges:a,celebrations:d}=i.getChallengeBadgeCounts(r,n),g=i.getButtonText(s.default.Type.Challenge,a),c=i.getButtonText(s.default.Type.Celebrate,d);if(0===a&&0===d)return[];const u=[{text:g,color:"red"},{text:c,color:"green"}],p=[];return 0!==a&&p.push(u[0]),0!==a&&p.push(u[1]),e.card("id","name").then((function(e){return p}))})(e);s=n("LdkDU");const d=(e,t)=>(async e=>{const t=s.default.Scope.Card,o=s.default.Visibility.Shared,l=s.default.Key.LogEntries,n=(s.default.Capability.CardButtons,await e.get(t,o,l)),r=e.getContext(),{challenges:a,celebrations:d}=i.getChallengeBadgeCounts(r,n),g=i.getButtonText(s.default.Type.Challenge,a),c=i.getButtonText(s.default.Type.Celebrate,d),u=e=>{console.log("onCloseChallengToolbox")};return[{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:g,condition:s.default.Condition.Always,callback:function(e){return e.modal({title:"Challenge",args:{type:s.default.Type.Challenge},url:"./challenge.html",fullscreen:!1,height:500,callback:u})}},{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:c,condition:s.default.Condition.Always,callback:function(e){return e.modal({title:"Celebrate",args:{type:s.default.Type.Celebrate},url:"./modals/celebrate.html",fullscreen:!1,height:500})}}]})(e);s=n("LdkDU");n("bDs4w");s=n("LdkDU");var g={Authors:Object.freeze({RTW:"rtw",Spotify:"spotify",SWM:"swm",PrinciplesGreen:"pg",Princeton:"princeton"}),Environments:Object.freeze({Trello:"Trello"})};n.register("1L4ef",(function(e,t){e.exports=import("./"+n("bXuNP").resolve("bJmGX")).then((()=>n("b6NUa")))})),n.register("aL8Qr",(function(e,t){e.exports=import("./"+n("bXuNP").resolve("7WKo9")).then((()=>n("bEksa")))})),n.register("aHNJm",(function(e,t){e.exports=import("./"+n("bXuNP").resolve("cX2tx")).then((()=>n("bmO0s")))})),n.register("hL96R",(function(e,t){e.exports=import("./"+n("bXuNP").resolve("irEM1")).then((()=>n("f1e8W")))})),n.register("4Fu9l",(function(e,t){e.exports=import("./"+n("bXuNP").resolve("2Ywgl")).then((()=>n("ffvez")))})),n.register("MsWMT",(function(e,t){e.exports=import("./"+n("bXuNP").resolve("cHbDk")).then((()=>n("epFvb")))}));const c=async e=>{let t,o;return(async()=>{switch(e){case g.Authors.RTW:return t=await n("1L4ef"),o=await n("aL8Qr"),{...t,...o};case g.Authors.Spotify:return t=await n("aHNJm"),o=await n("hL96R"),{...t,...o};case g.Authors.SWM:return t=await n("4Fu9l"),{...t,...o};case g.Authors.Princeton:return t=await n("MsWMT"),{...t,...o}}})()};var u={getTrelloData:async e=>{const t=e.id;return await c(t)},getAuthorDataById:c};var p={getData:async e=>await u.getAuthorDataById(e.id),getCapabilityPreferences:(e,t)=>{const o=e.capabilities.find((e=>e.capability===t));return o&&o.enabled?o.labels:[]},getTrelloLabels:async({t:e,challengeLog:t,pledges:o,log:l,context:n,popup:r=null,modal:a=null,mode:d=s.default.Mode.Label})=>{console.log("context ",n),console.log("log ",l),console.log("pledges ",o);const g=e=>{const t=i.getLabelVoteCount(n,l,e);return console.log("count ",t),t&&t.toString()||""};switch(d){case s.default.Mode.Label:return console.log("mode ",s.default.Mode.Label),o.map((o=>({text:`${o.text} ${g(o)}`,condition:s.default.Condition.Always,callback:()=>(async(e,t,o,l)=>{const{isPledgeNowLogged:n,updatedPledges:s}=t.togglePledge(o,l);return console.log("updatedPledges ",s),await e.set(scope,visibility,key,s),await e.get(scope,visibility,key)})(e,t,n,o)})));case s.default.Mode.Popup:return console.log("mode ",s.default.Mode.Popup),o.map((t=>({text:`${t.text} ${g(t)}`,condition:s.default.Condition.Always,callback:()=>((e,t,o)=>e.popup({title:o.prompt,items:o.effects}))(e,0,r)})));case s.default.Mode.Modal:return console.log("mode ",s.default.Mode.Modal),o.map((t=>({text:`${t.text} ${g(t)}`,condition:s.default.Condition.Always,callback:()=>((e,t,o)=>e.modal({title:o.prompt,items:o.effects}))(e,0,a)})))}},getPopup:async e=>{const t=e.popup;return!t||t&&!t.enabled?null:t}};const h=(e,t)=>(async e=>{const t=e.getContext(),o=await e.get(s.default.Scope.Card,s.default.Visibility.Shared,s.default.Key.LogEntries),l=new i(s.default.Type.Challenge);let n;o&&void 0!==o&&(n=l.setLog(o));const r=await e.get(s.default.Scope.Board,s.default.Visibility.Shared,s.default.Key.ChallengePreferences),a=await p.getData(r),d=await p.getCapabilityPreferences(a,s.default.Capability.CardDetailBadges);console.log("card-detail-badges pledges ",d);const g=await p.getTrelloLabels({t:e,challengeLog:l,pledges:d,log:n,context:{board:t.board,card:t.card,member:t.member},mode:s.default.Mode.Label});return console.log("card-detail-badges labels ",g),g})(e);s=n("LdkDU");const f=(e,t)=>(async e=>(await e.get(s.default.Scope.Card,s.default.Visibility.Shared,s.default.Key.LogEntries),{title:"My Card Back Section",icon:GRAY_ICON,content:{type:"iframe",url:e.signUrl("./section.html"),height:230,action:{text:"My Action",callback:e=>(async e=>e.popup)(e)}}}))(e);window.TrelloPowerUp.initialize({"board-buttons":(e,t)=>r(),"card-badges":(e,t)=>a(e),"card-buttons":(e,t)=>d(e),"card-detail-badges":(e,t)=>h(e),"card-back-section":(e,t)=>f(e)});
//# sourceMappingURL=index.a1344ec4.js.map
