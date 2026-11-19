(function(){
'use strict';
const D=window.LESSON, $=id=>document.getElementById(id), key='academy-bai15-v1';
let progress=0;try{progress=Math.max(0,Math.min(4,Number(localStorage.getItem(key))||0));}catch{}
let index=-1,timer=null,epoch=0;
const frames=D.segments.flatMap(s=>s.frames), correct=[1,2,1];
function unlock(n){progress=Math.max(progress,n);try{localStorage.setItem(key,String(progress));}catch{}updateTabs();}
function updateTabs(){document.querySelectorAll('[data-tab]').forEach(b=>b.disabled=Number(b.dataset.tab)>progress);document.querySelectorAll('[data-next]').forEach(b=>b.disabled=Number(b.dataset.next)>progress);}
function show(n){stop();document.querySelectorAll('[data-stage]').forEach(s=>s.hidden=Number(s.dataset.stage)!==n);document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.tab)===n)));}
function text(parent,tag,value,cls){const e=document.createElement(tag);if(cls)e.className=cls;e.textContent=value;parent.append(e);return e;}
function tokens(parent,arr,active=[]){parent.replaceChildren();arr.values.forEach((v,i)=>{const e=text(parent,'div','','digit'+(v===1&&arr.name==='daCo'?' used':'')+(active.includes(i)?' active':''));text(e,'small',String(i));text(e,'strong',String(v));});}
function render(){const f=index<0?D.initial:frames[index];
 $('vars').replaceChildren();for(const [k,v]of Object.entries(f.variables)){let box=text($('vars'),'div','','var');text(box,'small',k);text(box,'b',v===null?'—':String(v));}
 const c=f.condition;$('condition').textContent=c?c.expression+' → '+(c.result===null?'Chưa kiểm tra':c.result?'✓ ĐÚNG':'✕ SAI'):'Chưa có điều kiện đang kiểm tra';
 $('ma-digits').replaceChildren();$('used-digits').replaceChildren();for(const a of f.arrays)tokens(a.name==='n'?$('ma-digits'):$('used-digits'),a,a.active||[]);
 $('caption').textContent=f.phase+' · '+f.caption;$('history').replaceChildren();for(const h of f.history)text($('history'),'li',h.label+': '+h.text);
 $('output').textContent=f.output||'Chưa xuất';$('counter').textContent=index<0?'Chưa bắt đầu':`Trạng thái ${index+1} / ${frames.length}`;
 document.querySelectorAll('#sim-code .line').forEach(e=>e.classList.toggle('active',f.lines.includes(Number(e.dataset.line))));
 const active=document.querySelector('#sim-code .active');if(active){const box=$('sim-code');if(active.offsetTop<box.scrollTop||active.offsetTop+active.offsetHeight>box.scrollTop+box.clientHeight)box.scrollTop=active.offsetTop-box.offsetTop-70;}
 $('prev').disabled=index<0;$('next').disabled=index>=frames.length-1;$('start').disabled=index>=0;$('auto').disabled=index>=frames.length-1||timer!==null;$('pause').disabled=timer===null;
 if(f.done)unlock(4);
}
function stop(){epoch++;if(timer!==null)clearTimeout(timer);timer=null;if($('pause'))$('pause').disabled=true;if($('auto'))$('auto').disabled=index>=frames.length-1;}
function step(delta){stop();index=Math.max(-1,Math.min(frames.length-1,index+delta));render();}
function play(){if(timer!==null||index>=frames.length-1)return;const token=++epoch;
 function tick(){if(token!==epoch)return;timer=null;if(index<frames.length-1){index++;render();}if(index<frames.length-1){timer=setTimeout(tick,Math.max(350,frames[index].duration||450));$('auto').disabled=true;$('pause').disabled=false;}else stop();}
 tick();
}
$('start').addEventListener('click',()=>step(1));$('prev').addEventListener('click',()=>step(-1));$('next').addEventListener('click',()=>step(1));$('auto').addEventListener('click',play);$('pause').addEventListener('click',stop);$('reset').addEventListener('click',()=>{stop();index=-1;render();$('sim-code').scrollTop=0;});
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.tab))));document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.next))));
const explanations=[['2023 lặp chữ số 2 nên chưa hợp lệ.','Đúng: 2031 hợp lệ và nhỏ nhất lớn hơn 2022.','2034 hợp lệ nhưng lớn hơn 2031.'],['Y không hợp lệ thì chưa được xuất.','Giảm Y sẽ đi sai chiều tìm số lớn hơn X.','Đúng: tăng Y và gọi hopLe cho số mới.'],['Giữ dấu cũ sẽ nhầm chữ số của hai số khác nhau.','Đúng: mỗi lần gọi hàm tạo lại cả 10 ô false.','Đánh dấu tất cả true sẽ khiến mọi số bị coi là trùng.']];
document.querySelectorAll('[data-quiz]').forEach(group=>group.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{const q=Number(group.dataset.quiz),a=Number(b.dataset.answer),ok=a===correct[q];$('q'+q).textContent=explanations[q][a];$('q'+q).className='feedback '+(ok?'good':'bad');if(ok)unlock(q+1);}))); 
function inspect(){const s=$('candidate').value.trim(),target=$('candidate-digits');target.replaceChildren();if(!/^[1-9][0-9]{0,9}$/.test(s)){$('candidate-feedback').textContent='Nhập số nguyên dương tối đa 10 chữ số, không có số 0 ở đầu.';return;}
 const count={};for(const d of s)count[d]=(count[d]||0)+1;for(const d of s){const e=text(target,'div','','digit');text(e,'strong',d);if(count[d]>1)e.style.borderColor='#ff9dab';}
 const valid=Object.values(count).every(n=>n===1);$('candidate-feedback').textContent=(valid?'Các chữ số khác nhau.':'Có chữ số trùng: '+Object.keys(count).filter(d=>count[d]>1).join(', ')+'.')+(Number(s)<=2022?' Mã còn phải lớn hơn X = 2022.':valid?' Mã > 2022; điều này chưa chứng minh mã nhỏ nhất.':'');
}
$('inspect').addEventListener('click',inspect);inspect();
$('unlock').addEventListener('click',()=>{const ok=$('answer98').value.trim()==='102';$('unlock-feedback').textContent=ok?'Đúng: 99 và 100, 101 đều trùng chữ số; mã kế là 102.':'Chưa đúng. Hãy kiểm tra lần lượt 99, 100, 101, 102.';$('solution').hidden=!ok;});
D.explain.forEach((s,i)=>{const row=text($('explanation'),'div','','explain-row');text(row,'b',String(i+1));text(row,'span',s);});
$('zoom').addEventListener('click',()=>{const large=$('fullcode').classList.toggle('large');$('zoom').textContent=large?'Thu nhỏ code':'Phóng to code';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('fullcode').classList.remove('large');$('zoom').textContent='Phóng to code';}});
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(D.code.join('\n'));$('copy').textContent='Đã sao chép';}catch{$('copy').textContent='Hãy chọn code và nhấn Ctrl+C';}});
D.tests.forEach(t=>{const row=text($('tests'),'div','','card');text(row,'label','X = '+t.x+' → ');const input=document.createElement('input');input.inputMode='numeric';input.setAttribute('aria-label','Output khi X = '+t.x);row.append(input);const b=text(row,'button','Đối chiếu');const result=text(row,'div','','feedback');b.addEventListener('click',()=>{const ok=input.value.trim()===String(t.y);result.textContent=ok?'✓ Đúng.':'✕ Chưa đúng. Đáp án: '+t.y;result.className='feedback '+(ok?'good':'bad');});});
updateTabs();render();
})();
