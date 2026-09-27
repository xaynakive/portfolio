/* left face · archive → the bookshelf
   a starlight, pearl-white shelf with grey shadows. every project is a modern
   book with its own colour, typeface and thickness. pull one out and a
   perforated stamp card appears, a ribbon slips out from the lower left, and
   the details drop in from the top. */
(function(){
  "use strict";
  var XK=window.XK, esc=XK.esc, reduce=XK.reduce, CDN=XK.CDN;
  XK.objects=XK.objects||{};
  var BY={}; XK.BOOKS.forEach(function(b,i){ b.n=i+1; BY[b.id]=b; });

  /* composed like a real shelf in golden hour: packed rows, a matching series,
     a cat asleep in the gap, and a stack of big-title books beside her */
  var ROWS=[
    { items:['~','~','shimmerwhere','~','echoura','catgloss','~','meow','~','~','3am','~','~'] },
    { series:['techpolaroids','glasstapes','purrsona','breeze','mythirium'], cat:1, stack:['bubbles','codeneko','portal','meowtm'] },
    { items:['~','~','screenshots','~','~','@vase','~','~','~','@candle','~'] }
  ];
  var FILL=['#e9e2d6','#d6dde8','#e1d9ea','#efe6da','#c8d3e0','#eadde0','#d9ded5','#f3eee6','#cfc8d9','#e4dcd0','#bfccdb','#efe2e6'];
  var ROW_W=92.2, GAP=.45;
  var CAT='<svg viewBox="0 0 140 84" aria-hidden="true"><defs>'
    +'<linearGradient id="catG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4c089"/><stop offset="1" stop-color="#d98c4c"/></linearGradient>'
    +'<radialGradient id="catH" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#f6c794"/><stop offset="1" stop-color="#df9453"/></radialGradient></defs>'
    +'<path d="M14 58C8 40 26 22 58 20c30-2 52 10 56 28 2 8-2 14-10 16H22c-5 0-7-2-8-6z" fill="url(#catG)"/>'
    +'<path d="M34 26c4 6 4 14 0 20M48 22c5 7 5 17 0 24M62 21c5 7 5 18 0 26M76 23c4 7 4 17 0 24" stroke="#c97a3e" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".55"/>'
    +'<path d="M18 60c-6 2-6 9 2 10 14 2 40 1 56-1" stroke="#e39a58" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M18 60c-6 2-6 9 2 10" stroke="#c97a3e" stroke-width="8" fill="none" stroke-linecap="round" opacity=".6"/>'
    +'<path d="M92 60c1 8 1 14 0 20" stroke="#f0b477" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M88 81h8" stroke="#f7d9bc" stroke-width="2.4" stroke-linecap="round"/>'
    +'<ellipse cx="104" cy="44" rx="19" ry="16.5" fill="url(#catH)"/>'
    +'<path d="M89 36l1-16 12 10z" fill="#e3985a"/><path d="M113 30l10-11 1 17z" fill="#e3985a"/><path d="M92 32l1-8 5 4.4z M116 29l5-5 .6 7.6z" fill="#f4c3b0"/>'
    +'<path d="M96 40c3 3 6 3 9 1M111 40c3 2 6 2 8-1" stroke="#c97a3e" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>'
    +'<ellipse cx="106" cy="52" rx="10" ry="6.5" fill="#fbe3c8"/>'
    +'<path d="M96 46q3.4 2.6 6.8 0M109 46q3.4 2.6 6.8 0" stroke="#6b3f22" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
    +'<path d="M104.8 50.6l1.6 1.4 1.6-1.4z" fill="#d97a7a"/><path d="M92 51l-8 .6M92 54l-8 2.6M120 51l8 .6M120 54l8 2.6" stroke="#fff6ea" stroke-width=".8" stroke-linecap="round"/></svg>';
  function flower(tulip,x,y,rot){ var g=tulip
      ?'<path d="M20 36C19 54 21 66 20 79" stroke="#7fa77a" stroke-width="2.2" fill="none"/><path d="M10 19C10 8 16 4 20 11C24 4 30 8 30 19C30 31 25 37 20 37C15 37 10 31 10 19z" fill="#7d9be0"/><path d="M20 11C17 19 17 29 20 37C23 29 23 19 20 11z" fill="#5c7cc9"/>'
      :'<path d="M20 34C19 52 21 66 20 79" stroke="#5f7d5a" stroke-width="2.2" fill="none"/><path d="M20 58C29 55 33 47 31 40C25 45 22 51 20 58z" fill="#6d8f67"/><circle cx="20" cy="21" r="12" fill="#2a2233"/><path d="M20 21m-3 0a3 3 0 1 1 6 0a6 6 0 1 1-12 0a9 9 0 1 1 18 0" stroke="#55466b" stroke-width="1.3" fill="none"/>';
    return '<g transform="translate('+x+' '+y+') rotate('+rot+' 20 80) scale(.55)">'+g+'</g>'; }
  var VASE='<svg viewBox="0 0 60 120" aria-hidden="true">'+flower(1,4,4,-16)+flower(0,15,-2,2)+flower(1,24,6,16)+flower(0,9,8,-6)
    +'<defs><linearGradient id="vaseG" x1="0" x2="1"><stop offset="0" stop-color="#dfe1e7"/><stop offset=".42" stop-color="#fbfbfd"/><stop offset="1" stop-color="#cfd2da"/></linearGradient></defs>'
    +'<path d="M21 46h18c0 8 11 15 11 34 0 21-9 36-20 36S10 101 10 80c0-19 11-26 11-34z" fill="url(#vaseG)"/><ellipse cx="30" cy="46" rx="9" ry="2.2" fill="#c9ccd5"/>'
    +'<path d="M17 70c-2 10-2 20 2 30" stroke="rgba(255,255,255,.9)" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  var CANDLE='<svg viewBox="0 0 70 58" aria-hidden="true"><path class="flame" d="M35 2c3 6 5 9 5 13a5 5 0 0 1-10 0c0-4 2-7 5-13z" fill="#f7c46a"/><path d="M35 17v6" stroke="#6b6360" stroke-width="1.4"/>'
    +'<g fill="#fbfaf7"><circle cx="20" cy="40" r="14"/><circle cx="50" cy="40" r="14"/><circle cx="35" cy="31" r="14"/><circle cx="35" cy="44" r="13"/></g>'
    +'<path d="M8 46a14 14 0 0 0 12 8h30a14 14 0 0 0 12-8" stroke="rgba(120,126,145,.3)" stroke-width="1.5" fill="none"/></svg>';

  var seed=17; function rnd(){ seed=(seed*9301+49297)%233280; return seed/233280; }
  function filler(){ var w=+(2.4+rnd()*2.8).toFixed(2), h=(13+rnd()*6).toFixed(2), c=FILL[Math.floor(rnd()*FILL.length)], lab=rnd()>.5;
    return { w:w, html:'<span class="bk bk-f'+(lab?' lab':'')+'" style="--w:'+w+';--h:'+h+';--c:'+c+'" aria-hidden="true"></span>' }; }
  function vars(b){ return '--w:'+b.w+';--h:'+(b.h||4)+';--c:'+b.c+';--t:'+b.t+';--ff:'+b.ff+';--fs:'+b.fs+';--fw:'+(b.wt||400); }
  function spine(b,cls){ return { w:b.w, html:'<button type="button" class="bk'+(cls||'')+(b.foil?' foil':'')+(b.up?' up':'')+(b.w>=9?' wide':'')+'" data-book="'+b.id+'" style="'+vars(b)+'" aria-label="pull out '+esc(b.title)+'">'
      +'<span class="bk-band" aria-hidden="true"></span><span class="bk-t">'+esc(b.title)+'</span>'+(b.noa?'':'<span class="bk-a" aria-hidden="true">xayna</span>')+'<span class="bk-mark" aria-hidden="true"></span>'
      +(b.tag?'<span class="bk-tag" aria-hidden="true">'+esc(b.tag)+'</span>':'')+'</button>' }; }
  function series(b){ return { w:Math.max(b.w,3.2), html:'<button type="button" class="bk series" data-book="'+b.id+'" style="--w:'+Math.max(b.w,3.2)+';--h:15.8" aria-label="pull out '+esc(b.title)+'"><span class="sr-band"><span class="bk-t">'+esc(b.title)+'</span></span><span class="sr-mark" aria-hidden="true"></span></button>' }; }
  function seriesFill(){ var w=+(3.4+rnd()*1.4).toFixed(2); return { w:w, html:'<span class="bk series bk-f" style="--w:'+w+';--h:15.8" aria-hidden="true"><span class="sr-band"></span><span class="sr-mark"></span></span>' }; }
  function flat(b,x){ return '<button type="button" class="hbk'+(b.up?' up':'')+'" data-book="'+b.id+'" style="'+vars(b)+';--x:'+x+'" aria-label="pull out '+esc(b.title)+'"><span class="hbk-t">'+esc(b.title)+'</span><em aria-hidden="true">'+esc(b.sub||'xayna')+'</em></button>'; }
  function deco(t){ if(t==='@vase') return { w:9, html:'<span class="deco vase" aria-hidden="true">'+VASE+'</span>' };
    return { w:9, html:'<span class="deco candle" aria-hidden="true">'+CANDLE+'</span>' }; }
  function packed(items){ var parts=items.map(function(t){ if(t==='~') return {slot:1,list:[]}; if(t.charAt(0)==='@') return deco(t); return spine(BY[t]); });
    var used=function(){ return parts.reduce(function(a,p){ return a+(p.slot?p.list.reduce(function(x,f){ return x+f.w+GAP; },0):p.w+GAP); },0); };
    var slots=parts.filter(function(p){ return p.slot; }), k=0;
    parts.forEach(function(p){ if(p.slot) p.list.push(filler()); });
    while(used()<ROW_W-.8&&k<120){ var f=filler(), room=ROW_W-used()-GAP; if(f.w>room){ if(room<2.2) break; f=filler(); f.w=+room.toFixed(2); f.html=f.html.replace(/--w:[0-9.]+/,'--w:'+f.w); } slots[(k*7)%slots.length].list.push(f); k++; }
    return parts.map(function(p){ return p.slot?p.list.map(function(f){ return f.html; }).join(''):p.html; }).join(''); }
  function middle(r){ var s=r.series.map(function(id){ return series(BY[id]); }); s.splice(2,0,seriesFill()); s.push(seriesFill()); s.unshift(seriesFill());
    var stack=r.stack.map(function(id,i){ return flat(BY[id],[.2,-.6,.5,-.2][i%4]); }).join('');
    return s.map(function(x){ return x.html; }).join('')+'<span class="shelf-cat" aria-hidden="true">'+CAT+'<span class="zz">z<i>z</i></span></span><span class="gap" aria-hidden="true"></span><span class="bk-stack">'+stack+'</span>'; }

  function build(){
    seed=17;
    var rows=ROWS.map(function(r,i){ return '<div class="shelf-row r'+(i+1)+'">'+(r.series?middle(r):packed(r.items))+'</div><div class="shelf-board" aria-hidden="true"></div>'; }).join('');
    var el=document.createElement('div'); el.className='shelf';
    el.innerHTML='<button class="metal s-close" type="button" aria-label="close the archive"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>'
      +'<div class="cabinet"><div class="cab-plaque"><span>the archive</span></div><div class="cab-inner"><div class="cab-rows">'+rows+'</div><span class="cab-light" aria-hidden="true"></span></div></div>'
      +'<p class="shelf-hint">every project has a place here</p>';
    return el;
  }

  function art(b){ return '<div class="bc-art" style="--c:'+b.c+';--t:'+b.t+';--ff:'+b.ff+'"><span>'+esc(b.title)+'</span></div>'; }
  function card(b){
    var row=function(l,v){ return '<div class="bc-row"><span>'+l+'</span><p>'+esc(v)+'</p></div>'; };
    var body=b.does?row('what it does',b.does)+row('why i made it',b.from)+row('where it is now',b.happened)
                   :row('what it was',b.was)+row('where it came from',b.from)+row('what i imagined',b.imagined)+row('what happened',b.happened);
    var links=(b.links||[]).map(function(l){ var ext=l[1].charAt(0)!=='#'; return '<a href="'+l[1]+'"'+(ext?' target="_blank" rel="noopener"':' data-inpage')+'>'+esc(l[0])+(ext?' ↗':'')+'</a>'; }).join('');
    var pic=b.shot?'<img src="'+CDN+b.shot+'" alt="" loading="lazy" onerror="this.classList.add(\'gone\')"/>':'';
    return '<div class="bcard" role="group" aria-label="'+esc(b.title)+'">'
      +'<div class="bc-left"><div class="bc-ribbon" style="--c:'+b.c+';--t:'+b.t+'"><span style="font-family:'+b.ff+'">'+esc(b.title)+'</span></div>'
      +'<div class="bc-stamp-wrap"><div class="bc-stamp"><div class="bc-pic">'+art(b)+pic+'</div><span class="bc-post">xayna · archive · no. '+('0'+b.n).slice(-2)+'</span></div></div></div>'
      +'<div class="bc-text"><p class="bc-kind">'+(b.does?'a real project':'a story, still breathing')+'</p><h3 class="bc-title">'+esc(b.title)+'</h3>'+body
      +(links?'<p class="bc-links">'+links+'</p>':'')+'<div class="bc-foot"><span class="bc-status">'+esc(b.status)+'</span><button type="button" class="metal bc-back">back to the shelf</button></div></div></div>'; }

  var st={};
  function fit(){ if(!st.el) return;
    st.el.querySelectorAll('.bk-t').forEach(function(t){ t.style.fontSize=''; var i=0; while((t.scrollHeight>t.clientHeight+1||t.scrollWidth>t.clientWidth+1)&&i<18){ t.style.fontSize=(parseFloat(getComputedStyle(t).fontSize)*.92)+'px'; i++; } });
    st.el.querySelectorAll('button.hbk').forEach(function(b){ var s=b.querySelector('.hbk-t'); s.style.fontSize=''; var i=0; while(b.scrollWidth>b.clientWidth+1&&i<18){ s.style.fontSize=(parseFloat(getComputedStyle(s).fontSize)*.92)+'px'; i++; } }); }
  function openCard(id,from){ var b=BY[id]; if(!b) return; closeCard(true);
    st.el.querySelector('.cabinet').insertAdjacentHTML('beforeend',card(b)); st.card=st.el.querySelector('.bcard'); st.from=from; st.el.classList.add('reading');
    var bk=st.card.querySelector('.bc-back'); setTimeout(function(){ bk.focus({preventScroll:true}); }, reduce?0:500);
    st.api.announce(b.title+'. '+(b.does||b.was)); }
  function closeCard(instant){ var c=st.card; if(!c) return false; st.card=null; st.el.classList.remove('reading');
    if(instant||reduce) c.remove(); else { c.classList.add('out'); setTimeout(function(){ c.remove(); },260); }
    if(!instant&&st.from) st.from.focus({preventScroll:true}); return true; }

  XK.objects.archive={
    label:'the archive, a bookshelf',
    size:function(vw,vh){ var narrow=vw<640, W=narrow?vw*.94:Math.min(vw*.9,(vh-120)/.8,920), u=narrow?W/60:W/100; st.u=u; return { w:W, h:u*80 }; },
    build:build,
    mount:function(el,api){ st={ el:el, api:api, u:st.u };
      if(!document.getElementById('bookFonts')){ var l=document.createElement('link'); l.id='bookFonts'; l.rel='stylesheet'; l.href=XK.BOOK_FONTS; document.head.appendChild(l); }
      el.addEventListener('click',function(e){
        if(e.target.closest('.s-close')){ api.close(); return; }
        if(e.target.closest('.bc-back')){ closeCard(); return; }
        var ip=e.target.closest('[data-inpage]'); if(ip){ e.preventDefault(); var h=ip.getAttribute('href'); api.close(); setTimeout(function(){ var t=document.querySelector(h); if(t) t.scrollIntoView({behavior:reduce?'auto':'smooth'}); },2400); return; }
        var b=e.target.closest('[data-book]'); if(b&&!st.card) openCard(b.dataset.book,b); });
      if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
      setTimeout(fit,900); },
    resize:function(W,H){ if(!st.el) return; st.el.style.width=W+'px'; st.el.style.height=H+'px'; st.el.style.setProperty('--u',st.u+'px'); st.el.classList.toggle('narrow',W/st.u<90); fit(); },
    initialFocus:function(){ return st.el&&st.el.querySelector('button.bk'); },
    back:function(){ return closeCard(); },
    unmount:function(){ st={}; }
  };
})();
