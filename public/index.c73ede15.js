function e(e,t,o,l){Object.defineProperty(e,t,{get:o,set:l,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},l={},r=t.parcelRequire0e29;null==r&&((r=function(e){if(e in o)return o[e].exports;if(e in l){var t=l[e];delete l[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){l[e]=t},t.parcelRequire0e29=r),r.register("bXuNP",(function(t,o){var l,r;e(t.exports,"register",(()=>l),(e=>l=e)),e(t.exports,"resolve",(()=>r),(e=>r=e));var n={};l=function(e){for(var t=Object.keys(e),o=0;o<t.length;o++)n[t[o]]=e[t[o]]},r=function(e){var t=n[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),r("bXuNP").register(JSON.parse('{"2JFQr":"index.c73ede15.js","bJmGX":"rtw.db725a81.js","7WKo9":"rtw-trello.edaa1442.js","cX2tx":"spotify.1e0f0708.js","irEM1":"spotify-trello.00774160.js","2Ywgl":"swm.415b8913.js","cHbDk":"princeton.82973572.js","dkzSf":"index.ab1d9c77.js"}'));var n=r("LdkDU");const s=(e,t)=>(async e=>[{text:"Challenge Toolbox",callback:e=>(async e=>e.popup({title:"Toolbox preferences",url:"./board-buttons-popup-authors.html",height:225}))(e),condition:n.default.Condition.Always}])();n=r("LdkDU"),n=r("LdkDU");var a=class{constructor(e=n.default.Type.Challenge){this.type=e,this.log=[],this.currentPledge={},this.context={},this.currentReason={}}islogTruthy(e){return null!=e&&e!==[]&&Object.entries(e).length>0||"number"==typeof e}islogFalsy(e){return!this.islogTruthy(e)}isLogEmpty(){return this.log===[]}getLog(){return this.log}setLog(e){return this.log=e,this.log}setType(e){return this.type=e,this.type}getCurrentPledge(){return this.currentPledge}addPledgeToLog(){const e={type:this.type,board:this.context.board,member:this.context.member,card:this.context.card,pledge:{id:this.currentPledge.id,text:this.currentPledge.text,reasons:[]}};this.log.push(e),console.log("log ",this.log),console.log("this.currentPledge ",this.currentPledge);const t=this.log.filter((e=>e.type===this.type&&e.card===this.context.card));return console.log("matchingEntries ",t),{isPledgeNowLogged:!0,updatedPledges:t}}removePledgeFromLog(){return console.log("removePledgeFromLog"),this.isLogEmpty()?{isPledgeNowLogged:!1,updatedPledges:[]}:this.getReasonsForCurrentPledge(this.currentPledge).length>0?{isPledgeNowLogged:!1,updatedPledges:this.log.map((e=>e.pledge))}:(this.log=this.log.filter((e=>e.pledge.id!==this.currentPledge.id&&e.type===this.type)),{isPledgeNowLogged:!1,updatedPledges:this.log.filter((e=>e.pledge)).filter((e=>e.type===this.type))})}togglePledge(e,t){this.currentPledge=t,this.context=e;const o=!this.isLogEmpty()&&this.islogTruthy(this.log.find((e=>parseInt(e.pledge.id)===parseInt(t.id)&&e.type===this.type))),{isPledgeNowLogged:l,updatedPledges:r}=o?this.removePledgeFromLog():this.addPledgeToLog();return{isPledgeNowLogged:l,updatedPledges:r}}getLoggedPledges(){return this.log.map((e=>e.pledge))}getReasonsForCurrentPledge(){if(this.islogFalsy(this.currentPledge)||this.isLogEmpty())return[];const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons;return void 0===e?[]:e}addReasonToPledge(){const e=[...this.getReasonsForCurrentPledge(),this.currentReason],t=[...this.getReasonsForCurrentPledge(),this.currentReason];return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=e,{isReasonNowLogged:!0,updatedReasons:t}}removeReasonFromPledge(){return this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons.filter((e=>e.id!==this.currentReason.id)),{isReasonNowLogged:!1,updatedReasons:this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)).pledge.reasons}}toggleReason(e){if(this.currentPledge==={})return;this.currentReason=e;const t=!!this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type))&&!!this.log.find((t=>t.pledge.id===this.currentPledge.id&&t.type===this.type&&t.pledge.reasons.find((t=>t.id===e.id)))),{isReasonNowLogged:o,updatedReasons:l}=t?this.removeReasonFromPledge():this.addReasonToPledge();return{isReasonNowLogged:o,updatedReasons:l}}getReasonsCount(){const e=this.log.find((e=>e.pledge.id===this.currentPledge.id&&e.type===this.type)),t=void 0!==e&&e.pledge.reasons?e.pledge.reasons:[],o=t.length>0?t.length:0;return 0===o?"":o.toString()}getReasonsCountByPledge(e){const t=this.log.find((t=>t.pledge.id===e&&t.type===this.type)),o=void 0!==t&&t.pledge.reasons?t.pledge.reasons:[],l=o.length>0?o.length:0;return 0===l?"":l.toString()}static getButtonText(e,t){let o="";switch(e){case n.default.Type.Challenge:o=t>0?`Challenges (${t})`:"Challenge";break;case n.default.Type.Celebrate:o=t>0?`Celebrations (${t})`:"Celebrate"}return o}static getChallengeBadgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const o=e.card;return{challenges:[...new Set(t.filter((e=>e.type===n.default.Type.Challenge&&e.card===o)).map((e=>e.member)))].length,celebrations:[...new Set(t.filter((e=>e.type===n.default.Type.Celebrate&&e.card===o)).map((e=>e.member)))].length}}static getLabelVoteCount(e,t,o={}){if(void 0===t)return 0;const l=e.card;return[...new Set(t.filter((e=>e.pledge.id===o.id&&e.card===l)).map((e=>e.member)))].length}static getChallengePledgeCounts(e,t){if(void 0===t)return{challenges:0,celebrations:0};const o=e.card;return{challenges:t.filter((e=>e.type===n.default.Type.Challenge&&e.card===o)).length,celebrations:t.filter((e=>e.type===n.default.Type.Celebrate&&e.card===o)).length}}};const i=(e,t)=>(async e=>{const t=n.default.Scope.Card,o=n.default.Visibility.Shared,l=n.default.Key.LogEntries,r=(n.default.Capability.CardBadges,await e.get(t,o,l)),s=e.getContext(),{challenges:i,celebrations:d}=a.getChallengeBadgeCounts(s,r),g=a.getButtonText(n.default.Type.Challenge,i),c=a.getButtonText(n.default.Type.Celebrate,d);if(0===i&&0===d)return[];const u=[{text:g,color:"red"},{text:c,color:"green"}],p=[];return 0!==i&&p.push(u[0]),0!==i&&p.push(u[1]),e.card("id","name").then((function(e){return p}))})(e);n=r("LdkDU");const d=(e,t)=>(async e=>{const t=n.default.Scope.Card,o=n.default.Visibility.Shared,l=n.default.Key.LogEntries,r=await e.get(t,o,l),s=e.getContext(),{challenges:i,celebrations:d}=a.getChallengeBadgeCounts(s,r),g=a.getButtonText(n.default.Type.Challenge,i),c=a.getButtonText(n.default.Type.Celebrate,d),u=e=>{console.log("onCloseChallengToolbox")};return[{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:g,condition:n.default.Condition.Always,callback:function(e){return e.modal({title:"Challenge",args:{type:n.default.Type.Challenge},url:"./challenge.html",fullscreen:!1,height:500,callback:u})}},{icon:"https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg",text:c,condition:n.default.Condition.Always,callback:function(e){return e.modal({title:"Celebrate",args:{type:n.default.Type.Celebrate},url:"./modals/celebrate.html",fullscreen:!1,height:500})}}]})(e);n=r("LdkDU");r("bDs4w");n=r("LdkDU");var g={Authors:Object.freeze({RTW:"rtw",Spotify:"spotify",SWM:"swm",PrinciplesGreen:"pg",Princeton:"princeton"}),Environments:Object.freeze({Trello:"Trello"})};r.register("1L4ef",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("bJmGX")).then((()=>r("b6NUa")))})),r.register("aL8Qr",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("7WKo9")).then((()=>r("bEksa")))})),r.register("aHNJm",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("cX2tx")).then((()=>r("bmO0s")))})),r.register("hL96R",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("irEM1")).then((()=>r("f1e8W")))})),r.register("4Fu9l",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("2Ywgl")).then((()=>r("ffvez")))})),r.register("MsWMT",(function(e,t){e.exports=import("./"+r("bXuNP").resolve("cHbDk")).then((()=>r("epFvb")))}));const c=async e=>{let t,o;return(async()=>{switch(e){case g.Authors.RTW:return t=await r("1L4ef"),o=await r("aL8Qr"),{...t,...o};case g.Authors.Spotify:return t=await r("aHNJm"),o=await r("hL96R"),{...t,...o};case g.Authors.SWM:return t=await r("4Fu9l"),{...t,...o};case g.Authors.Princeton:return t=await r("MsWMT"),{...t,...o}}})()};var u={getTrelloData:async e=>{const t=e.id;return await c(t)},getAuthorDataById:c};var p={getData:async e=>await u.getAuthorDataById(e.id),getCapabilityPreferences:(e,t)=>{const o=e.capabilities.find((e=>e.capability===t));return o&&o.enabled?o.labels:[]},getTrelloLabels:async({t:e,challengeLog:t,pledges:o,log:l,context:r,popup:s=null,modal:i=null,mode:d=n.default.Mode.Label},g,c,u)=>{const p=(e,t,o)=>{const l=a.getLabelVoteCount(e,t,o);return l&&l.toString()||""};switch(d){case n.default.Mode.Label:return o.map((o=>({text:`${o.text} ${p(r,l,o)}`,condition:n.default.Condition.Always,callback:()=>(async({t:e,challengeLog:t,context:o,pledge:l,scope:r,visibility:n,key:s})=>{const{isPledgeNowLogged:a,updatedPledges:i}=t.togglePledge(o,l);console.log("updatedPledges ",i),console.log("scope ",r),console.log("visibility ",n),console.log("key ",s),await e.set(r,n,s,i);const d=await e.get(r,n,s);return console.log("rtnValue ",d),d})({t:e,challengeLog:t,context:r,pledge:o,scope:g,visibility:c,key:u})})));case n.default.Mode.Popup:return console.log("mode ",n.default.Mode.Popup),o.map((t=>({text:`${t.text} ${p(r,l,t)}`,condition:n.default.Condition.Always,callback:()=>((e,t,o)=>e.popup({title:o.prompt,items:o.effects}))(e,0,s)})));case n.default.Mode.Modal:return console.log("mode ",n.default.Mode.Modal),o.map((t=>({text:`${t.text} ${p(r,l,t)}`,condition:n.default.Condition.Always,callback:()=>((e,t,o)=>e.modal({title:o.prompt,items:o.effects}))(e,0,i)})))}},getPopup:async e=>{const t=e.popup;return!t||t&&!t.enabled?null:t}};const h=(e,t)=>(async e=>{const t=n.default.Scope.Card,o=n.default.Visibility.Shared,l=n.default.Key.LogEntries,r=e.getContext(),s=await e.get(n.default.Scope.Card,n.default.Visibility.Shared,n.default.Key.LogEntries),i=new a(n.default.Type.Challenge);let d;s&&void 0!==s&&(d=i.setLog(s));const g=await e.get(n.default.Scope.Board,n.default.Visibility.Shared,n.default.Key.ChallengePreferences),c=await p.getData(g),u=await p.getCapabilityPreferences(c,n.default.Capability.CardDetailBadges);return await p.getTrelloLabels({t:e,challengeLog:i,pledges:u,log:d,context:{board:r.board,card:r.card,member:r.member},mode:n.default.Mode.Label,scope:t,visibility:o,key:l})})(e);n=r("LdkDU");const f=(e,t)=>(async e=>(await e.get(n.default.Scope.Card,n.default.Visibility.Shared,n.default.Key.LogEntries),{title:"My Card Back Section",icon:GRAY_ICON,content:{type:"iframe",url:e.signUrl("./section.html"),height:230,action:{text:"My Action",callback:e=>(async e=>e.popup)(e)}}}))(e);window.TrelloPowerUp.initialize({"board-buttons":(e,t)=>s(),"card-badges":(e,t)=>i(e),"card-buttons":(e,t)=>d(e),"card-detail-badges":(e,t)=>h(e),"card-back-section":(e,t)=>f(e)});
//# sourceMappingURL=index.c73ede15.js.map
