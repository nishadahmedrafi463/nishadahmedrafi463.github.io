let xp=Number(localStorage.getItem("rafi_xp")||0), level=Number(localStorage.getItem("rafi_level")||1);
let secret=Math.floor(Math.random()*10)+1, reactionStart=0, reactionTimer=null, swTimer=null, swStart=0, swElapsed=0;
function saveProgress(){localStorage.setItem("rafi_xp",xp);localStorage.setItem("rafi_level",level);updateXP()}
function updateXP(){document.querySelectorAll("#xpText,#profileXP").forEach(e=>e.textContent=xp+" XP");document.querySelectorAll("#levelText,#profileLevel").forEach(e=>e.textContent="Lv "+level);document.getElementById("leaderScore").textContent=xp+" XP";if(document.getElementById("gameXP"))document.getElementById("gameXP").textContent=xp+" XP";document.getElementById("xpBar").style.width=(xp%100)+"%"}
function addXP(n){xp+=n;while(xp>=level*100){xp-=level*100;level++;}saveProgress();alert("+"+n+" XP! Level "+level)}
function toggleMenu(){let n=document.getElementById("nav");n.style.display=n.style.display==="flex"?"none":"flex"}
function rps(p){let a=["rock","paper","scissors"],c=a[Math.floor(Math.random()*3)],win=p===c?"Draw!":(p==="rock"&&c==="scissors")||(p==="paper"&&c==="rock")||(p==="scissors"&&c==="paper")?"You win! +10 XP":"Computer wins.";document.getElementById("rpsResult").textContent="You: "+p+" • Computer: "+c+" • "+win;if(win.includes("win"))addXP(10)}
function rollDice(){let n=Math.floor(Math.random()*6)+1;document.getElementById("diceResult").textContent=["⚀","⚁","⚂","⚃","⚄","⚅"][n-1];addXP(5)}
function coinToss(){let x=Math.random()<.5?"HEADS":"TAILS";document.getElementById("coinResult").textContent=x==="HEADS"?"🙂 HEADS":"🙂 TAILS";addXP(5)}
function guessNumber(){let g=Number(document.getElementById("guessInput").value),r=document.getElementById("guessResult");if(g===secret){r.textContent="Correct! +20 XP 🎉";addXP(20);secret=Math.floor(Math.random()*10)+1}else r.textContent=g>secret?"Too high!":"Too low!"}
function reactionClick(){let b=document.getElementById("reaction"),r=document.getElementById("reactionResult");if(b.dataset.ready==="1"){let ms=Date.now()-reactionStart;r.textContent=ms+" ms!";addXP(10);b.dataset.ready="0";b.textContent="Wait...";clearTimeout(reactionTimer);reactionTimer=setTimeout(reactionStartGame,1000+Math.random()*2500)}}
function reactionStartGame(){let b=document.getElementById("reaction");b.dataset.ready="1";b.textContent="GO!";reactionStart=Date.now()}
setTimeout(reactionStartGame,1800)
function quizAnswer(a){let r=document.getElementById("quizResult");if(a==="Python"){r.textContent="Correct! +10 XP";addXP(10)}else r.textContent="Not this time."}
function calculate(){try{let s=document.getElementById("calc").value.replace(/[^0-9+\-*/().% ]/g,"");document.getElementById("calcOut").textContent=String(Function("return "+s)())}catch(e){document.getElementById("calcOut").textContent="Invalid calculation"}}
function ageCalc(){let d=new Date(document.getElementById("birth").value);if(!isNaN(d)){let n=new Date(),a=n.getFullYear()-d.getFullYear();if(n<new Date(n.getFullYear(),d.getMonth(),d.getDate()))a--;document.getElementById("ageOut").textContent=a+" years old"}}
document.getElementById("wordText").addEventListener("input",e=>{let t=e.target.value.trim();document.getElementById("wordOut").textContent=(t?t.split(/\s+/).length:0)+" words • "+e.target.value.length+" characters"})
function bmiCalc(){let h=Number(document.getElementById("height").value)/100,w=Number(document.getElementById("weight").value);if(h>0&&w>0)document.getElementById("bmiOut").textContent="BMI: "+(w/(h*h)).toFixed(1)}
function convertKm(){let n=Number(document.getElementById("km").value);document.getElementById("kmOut").textContent=isFinite(n)?(n*.621371).toFixed(3)+" miles":"—"}
document.getElementById("charText").addEventListener("input",e=>document.getElementById("charOut").textContent=e.target.value.length+" characters")
function colorPick(){document.getElementById("colorOut").textContent=document.getElementById("color").value}
function makePassword(){let chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";let s="";for(let i=0;i<14;i++)s+=chars[Math.floor(Math.random()*chars.length)];document.getElementById("passOut").textContent=s}
function formatJSON(){try{let o=JSON.parse(document.getElementById("jsonText").value);document.getElementById("jsonOut").textContent=JSON.stringify(o,null,2)}catch(e){document.getElementById("jsonOut").textContent="Invalid JSON"}}
document.getElementById("mdText").addEventListener("input",e=>{let s=e.target.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/^# (.*)$/gm,"<h3>$1</h3>").replace(/\*\*(.*?)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>");document.getElementById("mdOut").innerHTML=s})
function makeQR(){let t=encodeURIComponent(document.getElementById("qrText").value);if(t)document.getElementById("qrImg").src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data="+t}
let swRunning=false;
function renderSW(){let x=swElapsed+(swRunning?Date.now()-swStart:0),m=Math.floor(x/60000),s=Math.floor(x/1000)%60,ms=Math.floor(x%1000/100);document.getElementById("stopwatch").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")+"."+ms}
function startStopwatch(){if(!swRunning){swRunning=true;swStart=Date.now();swTimer=setInterval(renderSW,100)}}
function stopStopwatch(){if(swRunning){swElapsed+=Date.now()-swStart;swRunning=false;clearInterval(swTimer);renderSW()}}
function resetStopwatch(){swRunning=false;swElapsed=0;clearInterval(swTimer);renderSW()}
function saveName(){let n=document.getElementById("nameInput").value.trim();if(n){localStorage.setItem("rafi_name",n);document.getElementById("profileName").textContent=n}}
function addGuest(){let t=document.getElementById("guestText").value.trim();if(!t)return;let arr=JSON.parse(localStorage.getItem("rafi_guest")||"[]");arr.unshift({text:t,date:new Date().toLocaleString()});localStorage.setItem("rafi_guest",JSON.stringify(arr));document.getElementById("guestText").value="";renderGuests()}
function renderGuests(){let arr=JSON.parse(localStorage.getItem("rafi_guest")||"[]"),box=document.getElementById("guestList");box.innerHTML=arr.map(x=>"<div class='guest'><b>Guest</b><small> • "+x.date+"</small><p>"+String(x.text).replace(/[&<>]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[m]))+"</p></div>").join("")}
function sendMail(e){e.preventDefault();let n=encodeURIComponent(document.getElementById("contactName").value),m=encodeURIComponent(document.getElementById("contactMsg").value);location.href="mailto:nishadahmedrafi740@gmail.com?subject=Rafi Zone message from "+n+"&body="+m}

/* === FULL PLAYABLE GAMES === */
let ttt=["","","","","","","","",""],tttOver=false;
const tttWins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function drawTTT(){document.getElementById("tttBoard").innerHTML=ttt.map((v,i)=>`<button class="ttt-cell" onclick="playTTT(${i})">${v}</button>`).join("")}
function tttWinner(a){for(const w of tttWins)if(a[w[0]]&&a[w[0]]===a[w[1]]&&a[w[1]]===a[w[2]])return a[w[0]];return a.every(Boolean)?"draw":null}
function playTTT(i){if(ttt[i]||tttOver)return;ttt[i]="X";drawTTT();let r=tttWinner(ttt);if(r){finishTTT(r);return}document.getElementById("tttStatus").textContent="Computer is thinking...";setTimeout(()=>{let c=[];for(let n=0;n<9;n++)if(!ttt[n])c.push(n);if(c.length)ttt[c[Math.floor(Math.random()*c.length)]]="O";drawTTT();r=tttWinner(ttt);if(r)finishTTT(r);else document.getElementById("tttStatus").textContent="Your turn: X"},300)}
function finishTTT(r){tttOver=true;document.getElementById("tttStatus").textContent=r==="draw"?"Draw!":r==="X"?"You win! +20 XP":"Computer wins.";if(r==="X")addXP(20)}
function resetTTT(){ttt=["","","","","","","","",""];tttOver=false;document.getElementById("tttStatus").textContent="Your turn: X";drawTTT()}

let snake=[],snakeDir={x:1,y:0},snakeFood={},snakeRun=false,snakeLoop=null,snakeScore=0;const snakeCanvas=document.getElementById("snakeCanvas"),snakeCtx=snakeCanvas.getContext("2d");
function snakeFoodNew(){do{snakeFood={x:Math.floor(Math.random()*15),y:Math.floor(Math.random()*15)}}while(snake.some(s=>s.x===snakeFood.x&&s.y===snakeFood.y))}
function drawSnake(){snakeCtx.clearRect(0,0,300,300);snakeCtx.fillStyle="#9b5cff";snakeCtx.fillRect(snakeFood.x*20,snakeFood.y*20,18,18);snake.forEach((s,i)=>{snakeCtx.fillStyle=i?"#8b54d8":"#d7a7ff";snakeCtx.fillRect(s.x*20,s.y*20,18,18)})}
function startSnake(){clearInterval(snakeLoop);snake=[{x:7,y:7},{x:6,y:7},{x:5,y:7}];snakeDir={x:1,y:0};snakeScore=0;snakeRun=true;snakeFoodNew();drawSnake();document.getElementById("snakeStatus").textContent="Score: 0";snakeLoop=setInterval(stepSnake,110)}
function stepSnake(){let h={x:snake[0].x+snakeDir.x,y:snake[0].y+snakeDir.y};if(h.x<0||h.x>=15||h.y<0||h.y>=15||snake.some(s=>s.x===h.x&&s.y===h.y)){snakeRun=false;clearInterval(snakeLoop);document.getElementById("snakeStatus").textContent="Game over! Score: "+snakeScore;return}snake.unshift(h);if(h.x===snakeFood.x&&h.y===snakeFood.y){snakeScore++;snakeFoodNew();if(snakeScore%3===0)addXP(5)}else snake.pop();document.getElementById("snakeStatus").textContent="Score: "+snakeScore;drawSnake()}
document.addEventListener("keydown",e=>{let d={ArrowUp:{x:0,y:-1},w:{x:0,y:-1},ArrowDown:{x:0,y:1},s:{x:0,y:1},ArrowLeft:{x:-1,y:0},a:{x:-1,y:0},ArrowRight:{x:1,y:0},d:{x:1,y:0}}[e.key];if(d&&snakeRun&&!(d.x===-snakeDir.x&&d.y===-snakeDir.y))snakeDir=d});

let mem=[],openMem=[],memLock=false,memMatches=0;
function resetMemory(){mem=["🍎","🍎","🚀","🚀","🐱","🐱","⚽","⚽","🎵","🎵","🌙","🌙","🔥","🔥","💻","💻"].sort(()=>Math.random()-.5);openMem=[];memLock=false;memMatches=0;renderMemory()}
function renderMemory(){document.getElementById("memoryBoard").innerHTML=mem.map((v,i)=>`<button class="memory-card ${openMem.includes(i)?"flipped":""}" onclick="flipMemory(${i})">${openMem.includes(i)?v:"?"}</button>`).join("");document.getElementById("memoryStatus").textContent=`Matches: ${memMatches}/8`}
function flipMemory(i){if(memLock||openMem.includes(i))return;openMem.push(i);renderMemory();if(openMem.length===2){memLock=true;let[a,b]=openMem;if(mem[a]===mem[b]){memMatches++;openMem=[];memLock=false;addXP(10);renderMemory();if(memMatches===8)document.getElementById("memoryStatus").textContent="You found all pairs! 🎉"}else setTimeout(()=>{openMem=[];memLock=false;renderMemory()},650)}}

let typingWords=["python","rafi","coding","github","website","programmer","nature","football","javascript","computer"],typingRunning=false,typingTime=30,typingScore=0,typingTimer,typingCurrent="";
function startTyping(){clearInterval(typingTimer);typingRunning=true;typingTime=30;typingScore=0;nextTyping();let i=document.getElementById("typingInput");i.disabled=false;i.value="";i.focus();typingTimer=setInterval(()=>{typingTime--;document.getElementById("typingStatus").textContent=`Time: ${typingTime}s • Score: ${typingScore}`;if(typingTime<=0)endTyping()},1000)}
function nextTyping(){typingCurrent=typingWords[Math.floor(Math.random()*typingWords.length)];document.getElementById("typingWord").textContent=typingCurrent}
document.getElementById("typingInput").addEventListener("keydown",e=>{if(e.key==="Enter"&&typingRunning&&e.target.value.trim().toLowerCase()===typingCurrent){typingScore++;if(typingScore%5===0)addXP(10);e.target.value="";nextTyping()}})
function endTyping(){typingRunning=false;clearInterval(typingTimer);document.getElementById("typingInput").disabled=true;document.getElementById("typingStatus").textContent=`Time up! Score: ${typingScore}`}

let b2048=[];
function tile2048(){let e=b2048.map((v,i)=>v?null:i).filter(v=>v!==null);if(e.length)b2048[e[Math.floor(Math.random()*e.length)]]=Math.random()<.9?2:4}
function draw2048(){document.getElementById("game2048").innerHTML=b2048.map(v=>`<div class="tile2048">${v||""}</div>`).join("")}
function slide2048(a){a=a.filter(Boolean);for(let i=0;i<a.length-1;i++)if(a[i]===a[i+1]){a[i]*=2;a.splice(i+1,1);addXP(1)}while(a.length<4)a.push(0);return a}
function move2048(d){let old=b2048.join(),n=Array(16).fill(0);if(d==="left"||d==="right")for(let r=0;r<4;r++){let a=b2048.slice(r*4,r*4+4);if(d==="right")a.reverse();a=slide2048(a);if(d==="right")a.reverse();for(let c=0;c<4;c++)n[r*4+c]=a[c]}else for(let c=0;c<4;c++){let a=[b2048[c],b2048[c+4],b2048[c+8],b2048[c+12]];if(d==="down")a.reverse();a=slide2048(a);if(d==="down")a.reverse();for(let r=0;r<4;r++)n[r*4+c]=a[r]}b2048=n;if(old!==b2048.join())tile2048();draw2048()}
function reset2048(){b2048=Array(16).fill(0);tile2048();tile2048();draw2048()}
document.addEventListener("keydown",e=>{if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName))return;let d={ArrowLeft:"left",a:"left",ArrowRight:"right",d:"right",ArrowUp:"up",w:"up",ArrowDown:"down",s:"down"}[e.key];if(d)move2048(d)})
resetTTT();resetMemory();reset2048();drawSnake();
let saved=localStorage.getItem("rafi_name");if(saved)document.getElementById("profileName").textContent=saved;
updateXP();renderGuests();
