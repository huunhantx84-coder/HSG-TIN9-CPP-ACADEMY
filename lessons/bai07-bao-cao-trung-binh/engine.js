"use strict";
const L=window.LESSON,$=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let unlocked=0,current=0,frames=[],step=-1,clock=null,simValues=[],explValues=[20n,30n,25n,35n,40n],solutionAllowed=false;
try{unlocked=Math.min(4,Math.max(0,Number(localStorage.getItem(L.id+"-progress")||0)));}catch(e){}
function nav(){$("nav").innerHTML=["Đọc hiểu","Khám phá","Thuật toán","Mô phỏng","Lập trình"].map((s,i)=>'<button data-stage="'+i+'" '+(i>unlocked?'disabled':'')+' class="'+(i===current?'active':'')+'">'+(i+1)+". "+s+(i>unlocked?' 🔒':'')+'</button>').join("");document.querySelectorAll("#nav [data-stage]").forEach(b=>b.onclick=()=>show(Number(b.dataset.stage)));}
function unlock(n){if(n>unlocked){unlocked=n;try{localStorage.setItem(L.id+"-progress",String(n))}catch(e){}}nav();}
function show(n){if(n>unlocked)return;pause();current=n;for(let i=0;i<5;i++)$("s"+i).classList.toggle("hidden",i!==n);nav();window.scrollTo(0,0);}
function question(i){const q=L.questions[i],el=$("quiz"+i);el.className="quiz";el.innerHTML='<h3>Kiểm tra hiểu bài</h3><p>'+esc(q.q)+'</p>'+q.opts.map((op,j)=>'<button class="choice" data-answer="'+j+'">'+String.fromCharCode(65+j)+". "+esc(op)+'</button>').join("")+'<p class="feedback" aria-live="polite"></p>'+(i<3?'<button class="continue hidden">Sang chặng '+(i+2)+' →</button>':'');
el.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{const ok=Number(b.dataset.answer)===q.correct;el.querySelectorAll("[data-answer]").forEach(x=>{x.classList.toggle("correct",Number(x.dataset.answer)===q.correct);x.classList.toggle("wrong",x===b&&!ok);});el.querySelector(".feedback").textContent=(ok?"✓ Chính xác. ":"✕ Chưa chính xác. ")+q.reason;if(ok){if(i<3){unlock(i+1);el.querySelector(".continue").classList.remove("hidden");}else{solutionAllowed=true;["reveal","copy","zoom"].forEach(id=>$(id).disabled=false);}}});
if(i<3)el.querySelector(".continue").onclick=()=>show(i+1);}
for(let i=0;i<4;i++)question(i);
function tokens(text){return text.trim().split(/\s+/).filter(Boolean);}
function numberToken(s){if(!/^(0|[1-9]\d*)$/.test(s))throw Error("Giá trị phải là số nguyên không âm (không ghi dấu hay thập phân).");const b=BigInt(s);if(b>1000000000n)throw Error("Mỗi Bᵢ không vượt quá 10^9.");return b;}
function readAverages(raw,max){const t=tokens(raw);if(!t.length||t.length>max)throw Error("Cần từ 1 đến "+max+" số trung bình.");const arr=t.map(numberToken);let old=0n;arr.forEach((b,j)=>{let newSum=b*BigInt(j+1),v=newSum-old;if(v<0n)throw Error("Dữ liệu không hợp lệ: doanh thu ngày "+(j+1)+" âm.");old=newSum;});return arr;}
function reconstruct(B){let old=0n,out=[];for(let i=0;i<B.length;i++){const current=B[i]*BigInt(i+1);out.push(current-old);old=current;}return out;}
function valuesHTML(B,active=-1,done=0){return B.map((b,i)=>'<div class="value '+(i===active?'on':i<done?'done':'')+'"><small>B'+(i+1)+'</small><b>'+esc(b)+'</b></div>').join("");}
function calculateExplore(){try{let d=Number($("explDay").value),now=explValues[d-1]*BigInt(d),old=d===1?0n:explValues[d-2]*BigInt(d-1),answer=now-old;let guess=$("guess").value.trim();let feedback=guess===""?"Hãy thử dự đoán trước khi xem.":(/^\d+$/.test(guess)&&BigInt(guess)===answer?"✓ Dự đoán đúng!":"✕ Dự đoán chưa đúng; đối chiếu phép tính.");$("explResult").innerHTML='<b>Ngày '+d+'</b><p>Tổng đến ngày '+d+' = '+now+'. Tổng đến ngày '+(d-1)+' = '+old+'.</p><p>Doanh thu ngày '+d+' = <strong>'+now+' − '+old+' = '+answer+'</strong>.</p><p>'+esc(feedback)+'</p>';$("explGrid").innerHTML=valuesHTML(explValues,d-1,d-1);}catch(e){$("explResult").textContent=e.message;}}
$("explSet").onclick=()=>{try{let arr=readAverages($("explInput").value,5);if(arr.length!==5)throw Error("Phần khám phá dùng đúng 5 ngày.");explValues=arr;calculateExplore();}catch(e){$("explResult").textContent=e.message;}};$("explCalc").onclick=calculateExplore;$("explDay").onchange=calculateExplore;$("explGrid").innerHTML=valuesHTML(explValues);
$("showHint").onclick=()=>$("hint").classList.toggle("hidden");
function highlight(el,line){el.innerHTML=L.source.map((s,i)=>'<span class="line '+(i===line?'on':'')+'"><span class="lineno">'+String(i+1).padStart(2,"0")+' │ </span>'+esc(s||" ")+'</span>').join("");}
function buildFrames(B){
let frames=[],N=B.length,A=Array(N).fill(null),loaded=Array(N).fill(null),out=[],hist=[];
const add=(line,i,phase,msg)=>frames.push({line,i,phase,msg,out:out.map(String),hist:[...hist],loaded:loaded.map(v=>v===null?null:String(v)),calc:A.map(v=>v===null?null:String(v)),avg:i>=1&&i<=N?String(B[i-1]):"—",revenue:i>=1&&i<=N&&A[i-1]!==null?String(A[i-1]):"—"});
add(8,0,"Nhập","Đọc N = "+N+".");
add(9,0,"Khai báo","Tạo mảng B lưu trung bình và mảng A lưu doanh thu.");
for(let j=0;j<N;j++){let i=j+1;add(11,i,"Nhập","Điều kiện i <= N đúng. Đọc ngày "+i+".");loaded[j]=B[j];hist.push("B["+i+"] = "+B[j]);add(12,i,"Nhập","Nhập B["+i+"] = "+B[j]+".");}
add(11,N+1,"Nhập","i = N+1, dừng vòng nhập.");
for(let j=0;j<N;j++){let i=j+1;add(15,i,"Tính toán","Xét ngày i = "+i+".");add(16,i,"Tính toán",i===1?"i == 1 đúng.":"i == 1 sai.");
if(i===1){A[j]=B[j];hist.push("A[1] = "+A[j]);add(17,i,"Tính toán","Lưu A[1] = B[1] = "+A[j]+".");}
else{add(18,i,"Tính toán","Chuyển sang nhánh else.");A[j]=BigInt(i)*B[j]-BigInt(i-1)*B[j-1];hist.push("A["+i+"] = "+A[j]);add(19,i,"Tính toán","A["+i+"] = "+i+" × "+B[j]+" − "+(i-1)+" × "+B[j-1]+" = "+A[j]+".");}}
add(15,N+1,"Tính toán","Đã khôi phục đủ mảng A.");
for(let j=0;j<N;j++){let i=j+1;add(22,i,"Xuất","Đọc A["+i+"] để in.");out.push(A[j]);hist.push("In A["+i+"] = "+A[j]);add(23,i,"Xuất","In A["+i+"] = "+A[j]+".");add(24,i,"Xuất",i<N?"In khoảng trắng ngăn cách.":"Không in khoảng trắng ở cuối.");}
add(22,N+1,"Xuất","i = N+1, dừng vòng xuất.");add(26,N+1,"Hoàn thành","Output đã hoàn thành.");return frames;
}
function pause(){if(clock!==null){clearInterval(clock);clock=null;}}
function render(){
const f=frames[step];highlight($("simCode"),f?f.line:-1);
$("stats").innerHTML=f?'<span>Pha: '+esc(f.phase)+'</span><span>i = '+f.i+'</span><span>B[i] = '+esc(f.avg)+'</span><span>A[i] = '+esc(f.revenue)+'</span><span>Bước '+(step+1)+'/'+frames.length+'</span>':"";
$("simValues").innerHTML=f?'<strong>Mảng B — trung bình</strong><div class="values">'+valuesHTML(f.loaded.map(v=>v===null?"·":v),f.i-1)+'</div><strong>Mảng A — doanh thu</strong><div class="values">'+valuesHTML(f.calc.map(v=>v===null?"·":v),f.i-1,f.out.length)+'</div>':"";
$("message").textContent=f?f.msg:"Bấm Bắt đầu để mô phỏng.";
$("history").innerHTML=f?f.hist.slice(-8).map(v=>'<li>'+esc(v)+'</li>').join(""):"";
$("simOut").textContent=f&&f.out.length?f.out.join(" "):"Chưa có kết quả";
if(f&&step===frames.length-1){unlock(4);$("finish").innerHTML='<div class="minibox"><b>✓ Hoàn thành mô phỏng.</b><p>Đã tính mảng A từ mảng B.</p><button id="toLast">Sang chặng 5 →</button></div>';$("toLast").onclick=()=>show(4);}else $("finish").innerHTML="";
}
function begin(){pause();try{simValues=readAverages($("simInput").value,12);frames=buildFrames(simValues);step=0;render();}catch(e){$("message").textContent=e.message;}}
$("begin").onclick=begin;$("next").onclick=()=>{pause();if(!frames.length)begin();else if(step<frames.length-1){step++;render();}};$("prev").onclick=()=>{pause();if(step>0){step--;render();}};$("auto").onclick=()=>{if(!frames.length)begin();if(!frames.length||clock!==null)return;clock=setInterval(()=>{if(step<frames.length-1){step++;render();}else pause();},550);};$("pause").onclick=pause;$("reset").onclick=()=>{pause();frames=[];simValues=[];step=-1;render();};render();
$("solution").textContent=L.source.join("\n");$("explain").innerHTML=L.explain.map((s,i)=>s?'<div class="explain-row"><strong>'+(i+1)+'</strong><span>'+esc(s)+'</span></div>':"").join("");
$("reveal").onclick=()=>{if(solutionAllowed)$("solutionWrap").classList.toggle("hidden");};
$("copy").onclick=()=>{if(!solutionAllowed)return;let s=L.source.join("\n");if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(s).then(()=>{$("copy").textContent="✓ Đã sao chép";}).catch(()=>window.prompt("Sao chép:",s));}else window.prompt("Sao chép:",s);};
$("zoom").onclick=()=>{if(!solutionAllowed)return;$("solutionWrap").classList.remove("hidden");$("solution").classList.toggle("zoomed");$("zoom").textContent=$("solution").classList.contains("zoomed")?"Thu nhỏ (Esc)":"Phóng to code";};document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("solution").classList.remove("zoomed");$("zoom").textContent="Phóng to code";}});
function solveInput(raw){let t=tokens(raw);if(!t.length||!/^\d+$/.test(t[0]))throw Error("Dòng đầu phải là số ngày N.");let n=Number(t[0]);if(!Number.isInteger(n)||n<1||n>100000)throw Error("1 ≤ N ≤ 100000.");if(t.length!==n+1)throw Error("Cần đúng "+n+" giá trị trung bình; thực tế có "+(t.length-1)+".");return reconstruct(readAverages(t.slice(1).join(" "),100000)).join(" ");}
$("customRun").onclick=()=>{try{$("customOut").textContent=solveInput($("customInput").value);}catch(e){$("customOut").textContent="Lỗi dữ liệu: "+e.message;}};
$("allTests").onclick=()=>{$("testReport").innerHTML=L.tests.map((t,i)=>{let actual=solveInput(t.input),pass=actual===t.output;return '<p class="'+(pass?'ok':'bad')+'">'+(pass?'✓ PASS':'✕ FAIL')+' · Test '+(i+1)+': '+esc(actual)+'</p>';}).join("");};
if(L.source.length!==L.explain.length)console.error("Lời giải và giải thích không khớp số dòng.");
show(0);