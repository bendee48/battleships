(()=>{"use strict";const e=class{constructor(e,t){this._name=e,this._length=t,this._hits=0}static shipInfo(){return[["carrier",5],["battleship",4],["destroyer",3],["submarine",3],["patrol",2]]}get name(){return this._name}get length(){return this._length}get hits(){return this._hits}hit(){this._hits++}isSunk(){return this.hits>=this.length}},t=(()=>{const e=new Map;function t(t,a){return e.get(t).some((e=>e.func==a))}return{subscribe:(a,r,...s)=>{const n={func:r,savedArgs:s};if(e.has(a)?e.get(a).push(n):e.set(a,[n]),t(a,r))return"Subscribed!"},unsubscribe:function(a,r){let s=e.get(a).filter((e=>e.func!==r));if(e.set(a,s),!t(a,r))return"Unsubscribed."},run:(t,...a)=>{e.has(t)&&e.get(t).forEach((e=>{e.savedArgs.length>0?e.func.call(null,...e.savedArgs):e.func.call(null,...a)}))},subscriptions:e}})(),a=class{constructor(e){this.name=e,this.board=this.#e(),this.cells=this.#t(),this.ships={},this.misses=[]}placeShip(e,a){if(!this.validPlacement(e,a))return!1;for(let t=0;t<a.length;t++){this.cells[e].classList.add(a.name,"taken"),this.cells[e].dataset.shipName=a.name;let[t,r]=this.#a(e);e=String.fromCharCode(t.charCodeAt()+1)+r}return this.ships[a.name]=a,this.#r()&&t.run("game ready"),!0}placeShipsRandomly(){const t=[new e("carrier",5),new e("battleship",4),new e("destroyer",3),new e("submarine",3),new e("patrol",2)];for(let e=0;e<t.length;e++){let a=Math.floor(Math.random()*this.cellCoordinates().length),r=this.cellCoordinates()[a];this.validPlacement(r,t[e])?this.placeShip(r,t[e]):e--}}receiveAttack(e){const t=this.cells[e];if(t.className.includes("taken")){let a=t.dataset.shipName;return this.ships[a].hit(),this.cells[e].classList.add("hit"),!0}return this.misses.push(e),this.cells[e].classList.add("miss"),!1}allSunk(){return Object.entries(this.ships).every((([e,t])=>t.isSunk()))}cellCoordinates(){return Object.keys(this.cells)}validPlacement(e,t){return this.#s(e,t)&&this.#n(e,t)&&this.#i(t)}#e(){const e=document.createElement("div");e.classList.add(this.name,"board");for(let t=1;t<11;t++)for(let a=0;a<10;a++){const r=this.#l(t,a);e.appendChild(this.#d(r))}return e}#s(e,t){const a=e[0];return"ABCDEFGHIJ".indexOf(a)+t.length<=10}#i(e){return!this.ships[e.name]}#n(e,t){for(let a=0;a<t.length;a++){if(this.cells[e].className.includes("taken"))return!1;let[t,a]=this.#a(e);e=String.fromCharCode(t.charCodeAt()+1)+a}return!0}#a(e){const[t,a,r]=e.match(/([A-J])(\d+)/);return[a,r]}#l(e,t){return"ABCDEFGHIJ"[t]+e}#d(e){const t=document.createElement("div");return t.classList.add("cell"),t.dataset.coordinate=e,t}#t(){return[...this.board.children].reduce(((e,t)=>(e[t.dataset.coordinate]=t,e)),{})}#r(){return Object.keys(this.ships).length>=e.shipInfo().length&&"player-board"===this.name}},r=class{constructor(e){this.type=e,this.availableMoves=this.#o()}convertPlayerMove(e){return e.target.dataset.coordinate}getMove(){const e=this.#c(),t=this.availableMoves[e];return this.#u(t),t}#u(e){const t=this.availableMoves.indexOf(e);this.availableMoves.splice(t,1)}#c(){return Math.floor(Math.random()*this.availableMoves.length)}#o(){return(new a).cellCoordinates()}},s=(()=>{const e=(e,...t)=>{const a=document.createElement(e);return a.classList.add(...t),a},t=t=>e("div","cell",t);return{buildDraggable:(a,r)=>{const s=e("div","draggable");return s.setAttribute("id",`${a}-draggable`),s.draggable=!0,s.dataset.name=a,s.dataset.length=r,((e,a,r)=>{for(let s=0;s<r;s++)e.appendChild(t(a))})(s,a,r),s},buildStandardElement:e,buildMenu:t=>{let a=e("div","menu"),r=e("button","menu-btn"),s=e("p","menu-text");return r.innerText="Play Again?",s.innerText=t,a.append(s,r),a}}})(),n=(()=>{const a=document.querySelector(".boards-container"),r=document.querySelector(".draggables-container"),n=document.querySelector(".page-container");return{displayBoard:e=>{a.appendChild(e.board)},displayDraggables:()=>{for(let[t,a]of e.shipInfo()){const e=s.buildDraggable(t,a);r.appendChild(e)}},activateAIBoard:(e,a)=>{Array.from(e.board.childNodes).forEach((e=>{e.addEventListener("click",(e=>{a(e)}))})),t.run("board active",e.board)},activeBoard:e=>{e.classList.add("active-board")},inertBoard:e=>{e.classList.remove("active-board")},displayGameOver:e=>{const t=s.buildStandardElement("div","end-screen"),a=s.buildMenu(e);t.appendChild(a),n.appendChild(t)},clearPage:()=>{a.innerHTML="",r.innerHTML=""},removeGameOver:()=>{document.querySelector(".end-screen").remove()}}})(),i=(()=>{let t,a,r,s,n,i,l;const d=e=>{e.dataTransfer.effectAllowed="move",t={name:e.target.dataset.name,length:Number(e.target.dataset.length)}},o=r=>{r.preventDefault(),r.target.classList.remove("valid-place"),r.target.classList.remove("invalid-place");const s=new e(t.name,t.length),n=r.target.dataset.coordinate;a.placeShip(n,s)},c=r=>{r.preventDefault();const s=new e(t.name,t.length),n=r.target.dataset.coordinate;a.validPlacement(n,s)?r.target.classList.add("valid-place"):r.target.classList.add("invalid-place")},u=e=>{e.preventDefault()},h=e=>{e.preventDefault(),e.target.classList.remove("valid-place"),e.target.classList.remove("invalid-place")},m=e=>{e.preventDefault(),"move"===e.dataTransfer.dropEffect&&a.ships[t.name]&&e.target.classList.add("clear")};return{setup:e=>{a=e,r=document.getElementById("destroyer-draggable"),s=document.getElementById("carrier-draggable"),n=document.getElementById("battleship-draggable"),i=document.getElementById("patrol-draggable"),l=document.getElementById("submarine-draggable"),Object.values(a.cells).forEach((e=>{e.addEventListener("dragover",u),e.addEventListener("dragenter",c),e.addEventListener("dragleave",h),e.addEventListener("drop",o)})),[r,s,n,i,l].forEach((e=>{e.addEventListener("dragstart",d),e.addEventListener("dragend",m)}))}}})();(()=>{let e,s,l,d,o;const c=()=>{e=new r("human"),s=new r("ai"),l="human",d=new a("player-board"),o=new a("ai-board")},u=()=>{n.displayBoard(d),n.displayBoard(o),n.displayDraggables()},h=()=>{t.subscribe("game ready",n.activateAIBoard,o,p),t.subscribe("board active",n.activeBoard),t.subscribe("board inert",n.inertBoard)},m=()=>{o.placeShipsRandomly()},g=()=>{i.setup(d)},p=t=>{if(t&&"human"===l){const a=e.convertPlayerMove(t),r=o.receiveAttack(a);b(o),r||(l="ai",v())}},v=()=>{t.run("board inert",o.board),setTimeout((()=>{if("ai"===l){const e=s.getMove(),a=d.receiveAttack(e);if(b(d))return;if(!a)return l="human",void t.run("board active",o.board);v()}}),0)},b=e=>{if("ai-board"===e.name&&e.allSunk()){const e="Player won!";return n.displayGameOver(e),f(),!0}if("player-board"===e.name&&e.allSunk()){const e="Computer won!";return n.displayGameOver(e),f(),!0}},f=()=>{document.querySelector(".menu-btn").addEventListener("click",y)},y=()=>{n.removeGameOver(),n.clearPage(),c(),u(),t.unsubscribe("game ready",n.activateAIBoard),t.subscribe("game ready",n.activateAIBoard,o,p),m(),g()};return{run:()=>{c(),u(),h(),m(),g()}}})().run()})();