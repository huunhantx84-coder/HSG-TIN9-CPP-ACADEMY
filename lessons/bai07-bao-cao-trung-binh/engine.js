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
function buildFrames(B){let list=[],old=0n,out=[],hist=[],n=B.length;const add=(line,i,avg,newSum,rev,msg)=>list.push({line,i,avg:String(avg),old:String(old),newSum:String(newSum),rev:String(rev),out:out.map(String),hist:[...hist],msg});
add(8,0,0n,0n,0n,"Đọc N = "+n+".");add(10,0,0n,0n,0n,"Khởi tạo tongTruoc = 0.");
for(let j=0;j<n;j++){let i=j+1,b=B[j],sum=b*BigInt(i),r=sum-old;
add(11,i,0n,0n,0n,"Điều kiện i <= N đúng: vào ngày "+i+".");
add(12,i,b,0n,0n,"Đọc trung bình B = "+b+".");
add(13,i,b,sum,0n,"Tổng đến ngày "+i+" = "+i+" × "+b+" = "+sum+".");
add(14,i,b,sum,r,"Doanh thu riêng ngày "+i+" = "+sum+" − "+old+" = "+r+".");
out.push(r);hist.push("Ngày "+i+": B="+b+", tổng="+sum+", doanh thu="+r);
add(15,i,b,sum,r,"In doanh thu ngày "+i+" = "+r+".");
add(16,i,b,sum,r,i<n?"i < N đúng: thêm khoảng trắng.":"Ngày cuối: không thêm khoảng trắng.");
add(17,i,b,sum,r,"Cập nhật tongTruoc = "+sum+".");old=sum;}
add(11,n+1,0n,old,0n,"i = N+1: điều kiện i <= N sai. Dừng vòng lặp.");
add(19,n+1,0n,old,0n,"In xuống dòng; Output hoàn tất.");return list;}
function pause(){if(clock!==null){clearInterval(clock);clock=null;}}
function render(){const f=frames[step];highlight($("simCode"),f?f.line:-1);$("stats").innerHTML=f?["i","avg","old","newSum","rev"].map((k,j)=>'<span>'+["i","B","tongTruoc","tongHienTai","doanhThu"][j]+' = '+esc(f[k])+'</span>').join("")+'<span>Bước '+(step+1)+'/'+frames.length+'</span>':"";$("simValues").innerHTML=valuesHTML(simValues,f?f.i-1:-1,f?f.out.length:0);$("message").textContent=f?f.msg:"Bấm Bắt đầu để mô phỏng.";$("history").innerHTML=f?f.hist.slice(-8).map(x=>'<li>'+esc(x)+'</li>').join(""):"";$("simOut").textContent=f&&f.out.length?f.out.join(" "):"Chưa có kết quả";if(f&&step===frames.length-1){unlock(4);$("finish").innerHTML='<div class="minibox"><b>✓ Hoàn thành mô phỏng.</b><p>Đã khôi phục '+simValues.length+' ngày mà không cần mảng trong C++.</p><button id="toLast">Sang chặng 5 →</button></div>';$("toLast").onclick=()=>show(4);}else $("finish").innerHTML="";}
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