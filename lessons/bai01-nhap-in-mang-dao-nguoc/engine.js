"use strict";
const L=window.LESSON,$=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let unlocked=0,stage=0,frames=[],position=-1,interval=null,expl=[],chosen=[],revealAllowed=false;
try{unlocked=Math.min(4,Math.max(0,Number(localStorage.getItem(L.id+"-progress")||0)));}catch(e){}
function unlock(n){if(unlocked<n){unlocked=n;try{localStorage.setItem(L.id+"-progress",String(n))}catch(e){}}nav();}
function nav(){$("nav").innerHTML=["Đọc hiểu","Khám phá","Thuật toán","Mô phỏng","Lập trình"].map((x,i)=>'<button data-id="'+i+'" '+(i>unlocked?'disabled':'')+' class="'+(stage===i?'on':'')+'">'+(i+1)+". "+x+(i>unlocked?" 🔒":"")+"</button>").join("");document.querySelectorAll("#nav [data-id]").forEach(b=>b.onclick=()=>show(Number(b.dataset.id)));}
function show(n){if(n>unlocked)return;pause();stage=n;for(let i=0;i<5;i++)$("s"+i).classList.toggle("hidden",i!==n);nav();window.scrollTo(0,0);}
function quiz(n){const q=L.questions[n],el=$("quiz"+n);el.className="quiz";el.innerHTML='<h3>Kiểm tra hiểu bài</h3><p>'+esc(q.q)+'</p>'+q.opts.map((op,i)=>'<button class="choice" data-answer="'+i+'">'+String.fromCharCode(65+i)+". "+esc(op)+"</button>").join("")+'<p class="response" aria-live="polite"></p>'+(n<3?'<button class="continue hidden">Sang chặng '+(n+2)+' →</button>':'');
el.querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>{const ok=Number(b.dataset.answer)===q.correct;el.querySelectorAll("[data-answer]").forEach(o=>{o.classList.toggle("correct",Number(o.dataset.answer)===q.correct);o.classList.toggle("incorrect",o===b&&!ok)});el.querySelector(".response").textContent=(ok?"✓ Chính xác. ":"✕ Chưa đúng. ")+q.reason;if(ok){if(n<3){unlock(n+1);el.querySelector(".continue").classList.remove("hidden");}else{revealAllowed=true;$("reveal").disabled=false;$("copy").disabled=false;$("zoom").disabled=false;}}});if(n<3)el.querySelector(".continue").onclick=()=>show(n+1);}
for(let i=0;i<4;i++)quiz(i);
function parseSeq(str,min,max){const t=str.trim().split(/\s+/);if(t.length<min||t.length>max)throw Error("Số phần tử phải từ "+min+" đến "+max+".");if(!t.every(x=>/^-?\d+$/.test(x)))throw Error("Chỉ nhập các số nguyên cách nhau bằng khoảng trắng.");if(!t.every(x=>Number.isSafeInteger(Number(x))))throw Error("Mỗi phần tử phải là số nguyên trong phạm vi chính xác của JavaScript.");return t.map(Number);}
function arrayHTML(vals,active,done=[]) {return vals.map((v,i)=>'<div class="cell '+(i===active?'current':done.includes(i)?'done':'')+'"><small>a['+i+']</small><b>'+esc(v)+'</b></div>').join("");}
$("introArray").innerHTML=arrayHTML([3,8,1,9,4],4);
function exploreInit(){try{expl=parseSeq($("explInput").value,2,10);chosen=[];drawExplore();}catch(e){$("explHint").textContent=e.message;}}
function drawExplore(){$("explArray").innerHTML=expl.map((x,i)=>'<button class="cell '+(chosen.includes(i)?'done':'')+'" data-expl="'+i+'" '+(chosen.includes(i)?'disabled':'')+'><small>a['+i+']</small><b>'+esc(x)+'</b></button>').join("");$("explArray").querySelectorAll("[data-expl]").forEach(b=>b.onclick=()=>choose(Number(b.dataset.expl)));$("explOut").textContent=chosen.length?chosen.map(i=>expl[i]).join(" "):"Chưa in";$("explHint").textContent=chosen.length===expl.length?"✓ Hoàn thành! Em vừa in ngược mà không hề đổi vị trí các ô.":"Ô cần chọn tiếp là a["+(expl.length-1-chosen.length)+"].";}
function choose(i){const target=expl.length-1-chosen.length;if(i!==target){$("explHint").textContent="✕ Chưa đúng: hãy tìm ô a[" + target + "] rồi thử lại.";return;}chosen.push(i);drawExplore();}
$("explSet").onclick=exploreInit;$("explReset").onclick=()=>{chosen=[];drawExplore();};exploreInit();
$("hintBtn").onclick=()=>$("hint").classList.toggle("hidden");
function syntaxCode(el,hl){el.innerHTML=L.source.map((v,i)=>'<span class="line '+(hl===i?'hilite':'')+'"><span class="line-no">'+String(i+1).padStart(2,"0")+' │ </span>'+esc(v||" ")+'</span>').join("");if(hl>=0&&el.children[hl])el.children[hl].scrollIntoView({block:"nearest"});}
function makeFrames(arr){let f=[],out=[],n=arr.length,history=[];const add=(line,i,msg)=>f.push({line,i,out:[...out],history:[...history],msg});
add(7,null,"Nhập n = "+n+".");
for(let j=0;j<n;j++){add(8,j,"Kiểm tra điều kiện nhập: "+j+" < "+n+" đúng.");history.push("Nhập a["+j+"] = "+arr[j]);add(9,j,"Lưu số "+arr[j]+" vào a["+j+"].");}
add(8,n,"Điều kiện nhập: "+n+" < "+n+" sai. Đã nhập đủ.");
for(let i=n-1;i>=0;i--){add(12,i,"Điều kiện in: "+i+" >= 0 đúng.");out.push(arr[i]);history.push("In a["+i+"] = "+arr[i]);add(13,i,"In giá trị a["+i+"] = "+arr[i]+".");add(14,i,i>0?"i > 0 đúng: thêm dấu cách.":"i > 0 sai: không thêm dấu cách.");}
add(12,-1,"i = -1, điều kiện i >= 0 sai. Dừng vòng lặp.");add(16,-1,"In xuống dòng. Output hoàn chỉnh.");return f;}
let simArray=[];
function pause(){if(interval!==null){clearInterval(interval);interval=null;}}
function render(){let fr=frames[position];syntaxCode($("simCode"),fr?fr.line:-1);$("state").innerHTML=fr?'<span>n = '+simArray.length+'</span><span>i = '+(fr.i===null?"—":fr.i)+'</span><span>a[i] = '+(fr.i!==null&&fr.i>=0?simArray[fr.i]:"—")+'</span><span>Bước '+(position+1)+'/'+frames.length+'</span>':'';$("simArray").innerHTML=arrayHTML(simArray,fr?fr.i:-1,fr?Array.from({length:fr.out.length},(_,j)=>simArray.length-1-j):[]);$("message").textContent=fr?fr.msg:"Bấm Bắt đầu để mô phỏng.";$("history").innerHTML=fr?fr.history.slice(-8).map(x=>'<li>'+esc(x)+'</li>').join(""):"";$("simOut").textContent=fr&&fr.out.length?fr.out.join(" "):"Chưa có kết quả";if(fr&&position===frames.length-1){unlock(4);$("simComplete").innerHTML='<div class="info"><b>✓ Hoàn thành mô phỏng</b><p>Chỉ số đã xuống -1 nhưng không đọc a[-1].</p><button id="go5">Sang chặng 5 →</button></div>';$("go5").onclick=()=>show(4);}else $("simComplete").innerHTML="";}
function begin(){pause();try{simArray=parseSeq($("simInput").value,1,20);frames=makeFrames(simArray);position=0;render();}catch(e){$("message").textContent=e.message;}}
$("begin").onclick=begin;$("next").onclick=()=>{pause();if(!frames.length)begin();else if(position<frames.length-1){position++;render();}};$("prev").onclick=()=>{pause();if(position>0){position--;render();}};$("auto").onclick=()=>{if(!frames.length)begin();if(interval!==null)return;interval=setInterval(()=>{if(position<frames.length-1){position++;render();}else pause();},650);};$("pause").onclick=pause;$("reset").onclick=()=>{pause();frames=[];position=-1;simArray=[];render();};render();
$("solution").textContent=L.source.join("\n");
$("explain").innerHTML=L.explain.map((s,i)=>s?'<div class="exrow"><b>'+(i+1)+'</b><span>'+esc(s)+'</span></div>':"").join("");
$("reveal").onclick=()=>{if(revealAllowed)$("solutionWrap").classList.toggle("hidden");};
$("copy").onclick=()=>{if(!revealAllowed)return;let content=L.source.join("\n");if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(content).then(()=>{$("copy").textContent="✓ Đã sao chép";}).catch(()=>window.prompt("Sao chép code:",content));}else window.prompt("Sao chép code:",content);};
$("zoom").onclick=()=>{if(!revealAllowed)return;$("solutionWrap").classList.remove("hidden");$("solution").classList.toggle("zoomed");$("zoom").textContent=$("solution").classList.contains("zoomed")?"Thu nhỏ (Esc)":"Phóng to code";};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){$("solution").classList.remove("zoomed");$("zoom").textContent="Phóng to code";}});
function parseInput(s){let t=s.trim().split(/\s+/);let n=Number(t[0]);if(!Number.isInteger(n)||n<1||n>1000)throw Error("n phải từ 1 đến 1000.");if(t.length!==n+1)throw Error("Cần đúng "+n+" phần tử sau n; hiện có "+(t.length-1)+".");let a=parseSeq(t.slice(1).join(" "),n,n);return a;}
function output(s){return parseInput(s).reverse().join(" ");}
$("runCustom").onclick=()=>{try{$("customOut").textContent=output($("customInput").value);}catch(e){$("customOut").textContent="Lỗi dữ liệu: "+e.message;}};
$("runTests").onclick=()=>{$("testResults").innerHTML=L.tests.map((x,i)=>{let actual=output(x.input),ok=actual===x.output;return '<p class="'+(ok?'pass':'fail')+'">'+(ok?"✓ PASS":"✕ FAIL")+' — Test '+(i+1)+': '+esc(actual)+'</p>';}).join("")};
if(L.source.length!==L.explain.length)console.error("Số dòng lời giải và giải thích không khớp.");
show(0);