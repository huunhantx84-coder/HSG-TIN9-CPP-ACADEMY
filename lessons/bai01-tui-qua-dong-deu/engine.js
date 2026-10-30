"use strict";
const L=window.LESSON;
const $=id=>document.getElementById(id);
const htmlEscape=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let current=0, unlocked=0, frames=[],pos=-1,timer=null;
try{unlocked=Math.max(0,Math.min(4,Number(localStorage.getItem("tuiqua-progress")||0)));}catch(e){}
const stageNames=["Đọc hiểu đề","Khám phá","Thuật toán","Mô phỏng","Lập trình"];
function nav(){ $("nav").innerHTML=stageNames.map((n,i)=>'<button '+(i>unlocked?'disabled ':'')+'class="'+(i===current?'active':'')+'" data-stage="'+i+'">'+(i+1)+'. '+n+(i>unlocked?' 🔒':'')+'</button>').join("");$("nav").className="nav"; document.querySelectorAll("[data-stage]").forEach(b=>b.onclick=()=>show(Number(b.dataset.stage)));}
function show(i){if(i>unlocked)return;pause();current=i;for(let j=0;j<5;j++)$("stage"+j).classList.toggle("hidden",j!==i);nav();window.scrollTo(0,0);}
function advance(i){if(unlocked<i+1){unlocked=i+1;try{localStorage.setItem("tuiqua-progress",String(unlocked))}catch(e){}}nav();}
function quiz(i){let q=L.questions[i],el=$("quiz"+i);el.className="quiz";el.innerHTML='<h3>Câu hỏi mở khóa</h3><p>'+htmlEscape(q.q)+'</p>'+q.options.map((s,j)=>'<button data-choice="'+j+'">'+String.fromCharCode(65+j)+'. '+htmlEscape(s)+'</button>').join('')+'<p class="feedback" aria-live="polite"></p><button class="continue hidden">Tiếp tục chặng '+(i+2)+' →</button>';
el.querySelectorAll("[data-choice]").forEach(btn=>btn.onclick=()=>{let ok=Number(btn.dataset.choice)===q.correct;el.querySelectorAll("[data-choice]").forEach(b=>{b.classList.toggle("correct",Number(b.dataset.choice)===q.correct);b.classList.toggle("wrong",b===btn&&!ok);});el.querySelector(".feedback").textContent=(ok?"✓ Chính xác. ":"✕ Chưa đúng. ")+q.why;if(ok){advance(i);el.querySelector(".continue").classList.remove("hidden");}});
el.querySelector(".continue").onclick=()=>show(i+1);
}
[0,1,2].forEach(quiz);
function gcd(a,b){while(b!==0n){let r=a%b;a=b;b=r;}return a;}
function positive(s){if(!/^[0-9]+$/.test(String(s).trim()))throw Error("Chỉ nhập số nguyên dương.");let x=BigInt(String(s).trim());if(x<1n||x>1000000000000000000n)throw Error("Giới hạn: 1 ≤ A, B ≤ 10^18.");return x;}
$("explore").onclick=()=>{let e=$("explResult");try{let a=BigInt($("explA").value),b=BigInt($("explB").value),k=BigInt($("explK").value);if(a<1n||b<1n||k<1n||a>10000n||b>10000n||k>10000n)throw Error("Ở phần khám phá, hãy nhập các số từ 1 đến 10000.");let ra=a%k,rb=b%k,ok=ra===0n&&rb===0n;e.innerHTML='<strong>'+(ok?'✓ Chia đều và dùng hết!':'✕ Chưa chia đều được')+'</strong><p>Vở: '+a+'/'+k+' = '+(a/k)+' dư '+ra+'; Bút: '+b+'/'+k+' = '+(b/k)+' dư '+rb+'.</p><p>Số túi lớn nhất thật sự: '+gcd(a,b)+'.</p>';}catch(err){e.textContent=err.message;}};
$("explore").click();
$("hint").onclick=()=>$("hintText").classList.toggle("hidden");
function makeFrames(A,B){let a=A,b=B,F=[],log=[];let push=(line,msg,out="")=>F.push({line,a:String(a),b:String(b),msg,log:[...log],out});
push(8,"Đọc A = "+A+", B = "+B);push(10,"Giữ lại A, B ban đầu; gán a = A, b = B.");
let count=0;while(b!==0n){push(11,"Điều kiện b != 0 là ĐÚNG, tiếp tục.");let r=a%b;push(12,"Tính r = "+a+" % "+b+" = "+r+".");let oldB=b;a=b;push(13,"Gán a = b cũ = "+oldB+".");b=r;log.push("Lần "+(++count)+": dư "+r+" → a="+a+", b="+b);push(14,"Gán b = r = "+r+".");}
push(11,"b == 0, điều kiện vòng lặp SAI. Dừng.");push(16,"UCLN = a = "+a+".");push(17,"In số túi: "+a+".");push(18,"In số vở và bút mỗi túi.",a+"\n"+A/a+" "+B/a);return F;}
function codeRender(el,active){el.innerHTML=L.source.map((s,i)=>'<span class="line '+(i===active?'on':'')+'"><span style="color:#7e9aaf;user-select:none">'+String(i+1).padStart(2,"0")+' │ </span>'+htmlEscape(s||' ')+'</span>').join("");if(active>=0){let line=el.children[active];if(line)line.scrollIntoView({block:"nearest"});}}
function render(){let f=frames[pos];codeRender($("simCode"),f?f.line:-1);$("vars").innerHTML=f?['a','b'].map(k=>'<span>'+k+' = '+htmlEscape(f[k])+'</span>').join('')+'<span>Bước '+(pos+1)+'/'+frames.length+'</span>':'';$("message").textContent=f?f.msg:"Bấm “Bắt đầu” để tạo mô phỏng.";$("history").innerHTML=f?f.log.slice(-8).map(x=>'<li>'+htmlEscape(x)+'</li>').join(""):'';$("simOut").textContent=f&&f.out?f.out:"Chưa hoàn thành";if(f&&f.out){advance(3);$("quiz3").innerHTML='<p class="success"><strong>✓ Đã mô phỏng xong!</strong></p><button id="toLast">Sang chặng 5 →</button>';$("toLast").onclick=()=>show(4);}else $("quiz3").innerHTML="";}
function pause(){if(timer!==null){clearInterval(timer);timer=null;}}
function begin(){pause();try{let a=positive($("simA").value),b=positive($("simB").value);frames=makeFrames(a,b);pos=0;render();}catch(e){$("message").textContent=e.message;}}
$("begin").onclick=begin;$("next").onclick=()=>{pause();if(!frames.length)begin();else if(pos<frames.length-1){pos++;render();}};$("prev").onclick=()=>{pause();if(pos>0){pos--;render();}};$("auto").onclick=()=>{if(!frames.length)begin();if(timer!==null)return;timer=setInterval(()=>{if(pos<frames.length-1){pos++;render();}else pause();},850);};$("pause").onclick=pause;$("reset").onclick=()=>{pause();frames=[];pos=-1;render();};render();
$("showSolution").onclick=()=>$("solutionWrap").classList.toggle("hidden");
$("solution").textContent=L.source.join("\n");$("explain").innerHTML=L.explain.map((v,i)=>v?'<div class="exrow"><strong>'+(i+1)+'</strong><span>'+htmlEscape(v)+'</span></div>':'').join("");
$("copy").onclick=()=>{let s=L.source.join("\n");if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(s).then(()=>{$("copy").textContent="✓ Đã sao chép";}).catch(()=>{window.prompt("Sao chép mã:",s);});}else window.prompt("Sao chép mã:",s);};
$("zoom").onclick=()=>{$("solutionWrap").classList.remove("hidden");$("solution").classList.toggle("zoomed");$("zoom").textContent=$("solution").classList.contains("zoomed")?"Thu nhỏ (Esc)":"Phóng to mã";};document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("solution").classList.remove("zoomed");$("zoom").textContent="Phóng to mã";}});
function solve(a,b){let k=gcd(a,b);return k+"\n"+a/k+" "+b/k;}
$("runTest").onclick=()=>{try{$("testOut").textContent=solve(positive($("testA").value),positive($("testB").value));}catch(e){$("testOut").textContent=e.message;}};
$("allTests").onclick=()=>{$("testResults").innerHTML=L.tests.map((t,i)=>{let actual=solve(BigInt(t[0]),BigInt(t[1])),expected=t[2]+"\n"+t[3]+" "+t[4],pass=actual===expected;return '<p class="'+(pass?'success':'error')+'">'+(pass?'✓ PASS':'✕ FAIL')+' · Test '+(i+1)+' · A='+t[0]+', B='+t[1]+' → '+htmlEscape(actual.replace("\n"," | "))+'</p>';}).join("");};
if(L.source.length!==L.explain.length)console.error("Không khớp số dòng code và giải thích");
show(0);