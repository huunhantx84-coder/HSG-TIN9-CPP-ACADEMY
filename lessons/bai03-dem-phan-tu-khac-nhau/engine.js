
(function(){
"use strict";
var d=window.HSG_LESSON;
if(!d){document.getElementById("content").textContent="Thiếu dữ liệu bài học.";return;}
var $=function(id){return document.getElementById(id)};
var names=["Đọc hiểu đề","Khám phá","Hình thành thuật toán","Mô phỏng","Lập trình"];
var key="hsg-progress-"+d.id, max=0, current=0, observed={}, step=0, frames=[], timer=null, explaining=false, selectedLine=0, caseIndex=0;
try{max=Math.min(4,Math.max(0,Number(localStorage.getItem(key))||0))}catch(e){}
current=max;
function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function tint(x){
  var p=/"(?:\\.|[^"\\])*"|\/\/.*|#include|\b(?:for|if|int|return|using|namespace|sort|cin|cout)\b|\b\d+\b/g;
  var out="",last=0,m;
  while((m=p.exec(x))!==null){
    out+=esc(x.slice(last,m.index));
    var t=m[0],cls=t[0]==='"'?"tok-str":t.startsWith("//")?"tok-comment":t==="#include"?"tok-directive":/^\d+$/.test(t)?"tok-number":t==="int"?"tok-type":"tok-key";
    out+='<span class="'+cls+'">'+esc(t)+"</span>";
    last=p.lastIndex;
  }
  return out+esc(x.slice(last));
}
function editor(id,file){
  var rows=d.source.map(function(line,i){return '<div class="source-line" data-source-line="'+i+'"><span class="num">'+(i+1)+'</span><span class="text">'+(tint(line)||"&nbsp;")+"</span></div>"}).join("");
  return '<div class="code-panel" id="'+id+'"><div class="code-head"><span>'+file+'</span><button type="button" data-zoom="'+id+'">⛶ Phóng to</button></div><div class="code-content">'+rows+"</div></div>";
}
function highlight(id,n){var e=$(id);if(e)e.querySelectorAll("[data-source-line]").forEach(function(x){x.classList.toggle("active",Number(x.dataset.sourceLine)===n)})}
function quiz(which){
 return d.questions[which].map(function(q,i){
  return '<fieldset><legend>'+esc(q[0])+'</legend>'+q[1].map(function(v,j){return '<label class="choice"><input type="radio" name="'+which+"-"+i+'" value="'+j+'"> '+esc(v)+"</label>"}).join("")+"</fieldset>";
 }).join("");
}
function passes(which){
 return d.questions[which].every(function(q,i){var e=document.querySelector('input[name="'+which+"-"+i+'"]:checked');return e&&Number(e.value)===q[2]})
}
function feedback(s,bad){var e=$("feedback");if(e){e.textContent=s;e.className="message"+(bad?" error":"")}}
function controls(t){return '<div class="buttons"><button type="button" id="validate">'+t+'</button></div><p id="feedback" class="message" role="status"></p>'}
function stop(){if(timer!==null){clearInterval(timer);timer=null}if($("auto"))$("auto").textContent="Chạy tự động"}
function advance(){max=Math.max(max,current+1);try{localStorage.setItem(key,String(max))}catch(e){}show(Math.min(4,current+1))}
function cells(arr,active,previous){
 return '<div class="array">'+arr.map(function(v,i){return '<div class="cell'+(i===active?" active":"")+(i===previous?" previous":"")+'"><span class="cell-index">['+i+']</span>'+v+"</div>"}).join("")+"</div>";
}
function show(n){
 if(n>max)return;stop();current=n;
 $("progress-fill").style.width=((max+1)*20)+"%";
 $("progress-text").textContent="Đã mở "+(max+1)+"/5 chặng · Đang ở chặng "+(n+1);
 $("tabs").innerHTML=names.map(function(v,i){return '<button type="button" data-tab="'+i+'" '+(i>max?"disabled":"")+' class="'+(i===n?"current":"")+'">'+(i+1)+". "+v+"</button>"}).join("");
 var h="";
 if(n===0){
  h='<p class="kicker">CHẶNG 1/5</p><h2>Đọc hiểu yêu cầu đề toán</h2><p>Cho mảng có <strong>n</strong> số nguyên. Hãy tìm có bao nhiêu <strong>giá trị khác nhau</strong> trong mảng (1 ≤ n ≤ 100000; 1 ≤ a[i] ≤ 10⁹).</p>';
  h+='<div class="example"><strong>Ví dụ:</strong><pre>Input: 6\n15 3 15 1000000000 3 15\nOutput: 3</pre><p>Các giá trị khác nhau là <b>3, 15, 1000000000</b>.</p></div><p class="note">Sáu phần tử nhưng chỉ có ba <em>giá trị</em> khác nhau. Số lặp lại bao nhiêu lần vẫn chỉ đếm một.</p>'+quiz("read")+controls("Kiểm tra và mở chặng 2 →");
 }
 if(n===1){
  h='<p class="kicker">CHẶNG 2/5</p><h2>Khám phá vì sao cần sắp xếp</h2><p>Trước khi sắp xếp, các giá trị bằng nhau nằm rải rác. Sau sắp xếp tăng dần, chúng đứng sát nhau.</p><div class="example"><b>Trước sắp xếp</b>'+cells(d.sample,-1,-1)+'<b>Sau sắp xếp</b><div id="sorted-array"></div></div>';
  h+='<label for="compare"><strong>Thay đổi vị trí i: <span id="compare-label">1</span></strong></label><input type="range" min="1" max="'+(d.sorted.length-1)+'" value="1" id="compare"><p id="compare-info" class="note"></p><p class="muted">Hãy thử ít nhất ba vị trí, trong đó có i = 2 và i = 5. Đã thử: <strong id="seen"></strong></p>'+quiz("explore")+controls("Kiểm tra và mở chặng 3 →");
 }
 if(n===2){
  h='<p class="kicker">CHẶNG 3/5</p><h2>Hình thành thuật toán</h2><p>Đưa các giá trị bằng nhau về cạnh nhau bằng <code>sort(a,a+n)</code>. Vì mảng không rỗng, đặt <code>dem=1</code>. Với mỗi i từ 1 đến n-1, nếu <code>a[i] != a[i-1]</code> thì tăng dem.</p>';
  h+='<p class="note">Mấu chốt: a[i] khác a[i-1] nghĩa là có thêm một giá trị chưa được đếm.</p><p class="note warning">Không dùng hai vòng lặp để so sánh mọi cặp khi n có thể lên tới 100000.</p>'+quiz("algorithm")+'<label for="reason"><b>Hãy giải thích bằng tiếng Việt vì sao cần sắp xếp trước:</b></label><textarea id="reason" rows="3"></textarea><p class="muted">Tối thiểu 10 từ; giáo viên vẫn cần đọc nội dung giải thích vì trang chỉ kiểm tra độ dài.</p>'+controls("Kiểm tra và mở chặng 4 →");
 }
 if(n===3){
  h='<p class="kicker">CHẶNG 4/5</p><h2>Mô phỏng code C++ từng bước</h2><p>Không có lưu đồ. Dòng được tô sáng phản ánh phần thuật toán đang chạy.</p>';
  h+='<div class="two-col"><div class="side"><h3>① Code C++</h3>'+editor("sim-code","BAI03.cpp")+'</div><div class="side"><h3>② Trạng thái và lịch sử</h3><div class="stats"><div>i<strong id="state-i">—</strong></div><div>a[i]<strong id="state-a">—</strong></div><div>dem<strong id="state-dem">0</strong></div></div><p class="note" id="state-note"></p><div id="state-array"></div><h3>Lịch sử</h3><ol id="history" class="step-history"></ol></div></div>';
  h+='<div class="buttons"><button type="button" id="prev" class="secondary">← Bước trước</button><button type="button" id="next">Bước tiếp →</button><button type="button" id="auto" class="secondary">Chạy tự động</button><button type="button" id="reset" class="secondary">Đặt lại</button></div>'+quiz("simulation")+controls("Kiểm tra và mở chặng 5 →");
 }
 if(n===4){
  h='<p class="kicker">CHẶNG 5/5</p><h2>Hoàn thiện chương trình và tự kiểm tra</h2>'+quiz("coding")+controls("Kiểm tra và mở lời giải");
  h+='<div id="solution" hidden><h3>Chương trình C++</h3>'+editor("full-code","BAI03.cpp")+'<div class="buttons"><button type="button" id="copy" class="secondary">Sao chép mã</button><button type="button" id="explain">Giải thích từng dòng bằng tiếng Việt</button><button type="button" id="line-prev" hidden class="secondary">← Dòng trước</button><button type="button" id="line-next" hidden class="secondary">Dòng tiếp →</button></div><p id="line-message" class="note" hidden></p><h3>Tự kiểm tra dữ liệu</h3><p class="muted">Nhập n rồi đúng n số nguyên trên các dòng tiếp theo (phép tính đối chiếu trên trình duyệt, không biên dịch C++).</p><textarea id="test-input" class="test-input" rows="3">6\n15 3 15 1000000000 3 15</textarea><div class="buttons"><button type="button" id="run">Tính kết quả</button><button type="button" id="sample" class="secondary">Nạp ví dụ khác</button></div><pre id="output" class="result" role="status">Chưa chạy.</pre><p class="note">Ghi nhớ: sort để đưa số giống nhau cạnh nhau; a[i] != a[i-1] phát hiện giá trị mới.</p></div>';
 }
 $("content").innerHTML=h;
 if(n===1)updateExplore();
 if(n===3){frames=makeFrames();step=0;render();}
}
function updateExplore(){
 var i=Number($("compare").value);observed[i]=true;
 $("compare-label").textContent=i;
 $("sorted-array").innerHTML=cells(d.sorted,i,i-1);
 var diff=d.sorted[i]!==d.sorted[i-1];
 $("compare-info").textContent="a["+i+"] = "+d.sorted[i]+(diff?" khác ":" bằng ")+"a["+(i-1)+"] = "+d.sorted[i-1]+(diff?" → Tăng số giá trị khác nhau.":" → Không tăng.");
 $("seen").textContent=Object.keys(observed).join(", ");
}
function makeFrames(){
 var arr=[],sorted=d.sorted;
 arr.push({line:15,i:"—",a:"—",dem:0,values:d.sample,why:"Dãy ban đầu trước sắp xếp."});
 arr.push({line:15,i:"—",a:"—",dem:0,values:sorted,why:"Dãy đã được sắp xếp tăng dần."});
 arr.push({line:17,i:0,a:sorted[0],dem:1,values:sorted,why:"dem = 1 vì phần tử đầu tiên là một giá trị khác nhau."});
 var count=1;
 for(var i=1;i<sorted.length;i++){
  var diff=sorted[i]!==sorted[i-1];
  if(diff)count++;
  arr.push({line:diff?20:19,i:i,a:sorted[i],dem:count,values:sorted,why:"i = "+i+": "+sorted[i]+(diff?" khác ":" bằng ")+sorted[i-1]+(diff?" → tăng dem = ":" → giữ dem = ")+count+"."});
 }
 arr.push({line:24,i:"—",a:"—",dem:count,values:sorted,why:"Kết thúc. In kết quả "+count+"."});
 return arr;
}
function render(){
 var s=frames[step];$("state-i").textContent=s.i;$("state-a").textContent=s.a;$("state-dem").textContent=s.dem;$("state-note").textContent=s.why;$("state-array").innerHTML=cells(s.values,typeof s.i==="number"?s.i:-1,typeof s.i==="number"?s.i-1:-1);
 $("history").innerHTML=frames.slice(0,step+1).map(function(f,i){return "<li>Bước "+(i+1)+": "+esc(f.why)+"</li>"}).join("");
 highlight("sim-code",s.line);$("prev").disabled=step===0;$("next").disabled=step===frames.length-1;
}
function explainLine(){
 highlight("full-code",selectedLine);
 $("line-message").textContent="Dòng "+(selectedLine+1)+": "+d.explain[selectedLine];
 $("line-prev").disabled=selectedLine===0;$("line-next").disabled=selectedLine===d.source.length-1;
}
function runTest(){
 var raw=$("test-input").value.trim().split(/\s+/),n=Number(raw[0]);
 if(!raw.every(function(x){return /^\d+$/.test(x)})){$("output").textContent="Lỗi: chỉ nhập số nguyên dương.";return}
 if(!Number.isInteger(n)||n<1||n>100000){$("output").textContent="Lỗi: n không thuộc [1,100000].";return}
 if(raw.length!==n+1){$("output").textContent="Lỗi: n = "+n+" nhưng đã nhập "+(raw.length-1)+" phần tử.";return}
 var a=raw.slice(1).map(Number);
 if(a.some(function(x){return !Number.isInteger(x)||x<1||x>1000000000})){$("output").textContent="Lỗi: phần tử không thuộc [1,10⁹].";return}
 a.sort(function(x,y){return x-y});var dem=1;for(var i=1;i<n;i++)if(a[i]!==a[i-1])dem++;
 $("output").textContent="Output: "+dem+"\nĐã kiểm tra "+n+" phần tử.";
}
function validate(){
 var which=["read","explore","algorithm","simulation","coding"][current];
 if(!passes(which)){feedback("Em cần kiểm tra lại câu trả lời.",true);return}
 if(current===1 && (Object.keys(observed).length<3 || !observed[2] || !observed[5])){feedback("Hãy thử ít nhất ba vị trí, bao gồm i = 2 và i = 5.",true);return}
 if(current===2 && $("reason").value.trim().split(/\s+/).length<10){feedback("Hãy viết lời giải thích ít nhất 10 từ.",true);return}
 if(current===3 && step!==frames.length-1){feedback("Hãy chạy mô phỏng tới bước xuất kết quả.",true);return}
 if(current===4){$("solution").hidden=false;feedback("Đã mở lời giải. Em hãy xem từng dòng và thử dữ liệu.");return}
 advance();
}
document.addEventListener("click",function(e){
 var tab=e.target.closest("[data-tab]");if(tab){show(Number(tab.dataset.tab));return}
 var zoom=e.target.closest("[data-zoom]");if(zoom){var box=$(zoom.dataset.zoom),state=box.classList.toggle("fullscreen");document.body.classList.toggle("lock-scroll",state);zoom.textContent=state?"✕ Thu nhỏ":"⛶ Phóng to";return}
 var id=e.target.id;
 if(id==="validate"){validate();return}
 if(current===3){
  if(id==="prev"){stop();step=Math.max(0,step-1);render()}
  if(id==="next"){stop();step=Math.min(frames.length-1,step+1);render()}
  if(id==="reset"){stop();step=0;render()}
  if(id==="auto"){if(timer!==null){stop();return}if(step===frames.length-1)step=0;render();$("auto").textContent="Tạm dừng";timer=setInterval(function(){step=Math.min(frames.length-1,step+1);render();if(step===frames.length-1)stop()},1300)}
 }
 if(current===4){
  if(id==="copy"){try{navigator.clipboard.writeText(d.source.join("\n"));e.target.textContent="Đã sao chép"}catch(err){e.target.textContent="Hãy sao chép thủ công"}}
  if(id==="explain"){explaining=!explaining;["line-prev","line-next","line-message"].forEach(function(x){$(x).hidden=!explaining});e.target.textContent=explaining?"Ẩn giải thích":"Giải thích từng dòng bằng tiếng Việt";if(explaining)explainLine();else highlight("full-code",-1)}
  if(id==="line-prev"){selectedLine=Math.max(0,selectedLine-1);explainLine()}
  if(id==="line-next"){selectedLine=Math.min(d.source.length-1,selectedLine+1);explainLine()}
  if(id==="run")runTest();
  if(id==="sample"){caseIndex=(caseIndex+1)%d.cases.length;var a=d.cases[caseIndex];$("test-input").value=a[0]+"\n"+a.slice(1).join(" ");$("output").textContent="Đã nạp ví dụ "+(caseIndex+1)+"."}
 }
});
document.addEventListener("input",function(e){if(e.target.id==="compare")updateExplore()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){document.querySelectorAll(".code-panel.fullscreen").forEach(function(x){x.classList.remove("fullscreen");var b=x.querySelector("[data-zoom]");if(b)b.textContent="⛶ Phóng to"});document.body.classList.remove("lock-scroll")}});
if(d.source.length!==d.explain.length)throw Error("Lời giải thích không khớp số dòng");
show(current);
})();
