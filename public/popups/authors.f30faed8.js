function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=t.parcelRequire0e29;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},t.parcelRequire0e29=r),r("bDs4w");var o;o=JSON.parse('{"authors":[{"id":"rtw","name":"ResponsibleTech.Work","title":"ResponsibleTech.Work Pledges"},{"id":"spotify","name":"Spotify","title":"Spotify Ethics Assessment"},{"id":"swm","name":"Sustainable Web Manifesto","title":"Sustainable Web Manifesto"},{"id":"pg","name":"Principles.Green","title":"Principles of Green Software Engineering"},{"id":"princeton","name":"Princeton web transparency","title":"Dark Patterns at Scale"}]}');var s=r("LdkDU");(async()=>{const t="https://trello.com/"===document.referrer;let n,i;t?(n=window.TrelloPowerUp.iframe(),i=n.arg("prefs")):i={id:"spotify",name:"Spotify",title:"Spotify Ethics Assessment"};const r=document.getElementById("authors"),l=e(o).authors.find((e=>e.id===i.id)),d=e(o).authors.map((e=>`<li>\n                    <button id="${e.id}" class="btn"><span>${e.id===l.id?"*":"-"}</span> <span>${e.title}</span></button>\n                </li>`));r.innerHTML=d.join(""),r.querySelectorAll(".btn").forEach((e=>{e.addEventListener("click",(i=>(async(e,i)=>{if(!t)return console.log(i);const r=s.default.Scope.Board,o=s.default.Visibility.Shared,l=s.default.Key.ChallengePreferences;await n.set(r,o,l,a);const d=await n.get(r,o,l);console.log("return saved author: ",d)})(0,e.id)))}))})();
//# sourceMappingURL=authors.f30faed8.js.map
