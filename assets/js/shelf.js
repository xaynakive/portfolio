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

  var ROWS=[
    ['~','shimmerwhere','echoura','catgloss','meow','mythirium','~','_','@vase'],
    ['techpolaroids','glasstapes','purrsona','breeze','~','@cat','_','@stack'],
    ['~','codeneko','bubbles','3am','screenshots','_','@candle','~']
  ];
  var FILL=['#efe8dc','#f3dde2','#e4e1ef','#dde7f0','#efe3d3','#e6ece2','#f1e7ea','#e9e5df'];

  var CAT='<svg viewBox="0 0 120 72" aria-hidden="true">'
    +'<path d="M100 44c14 2 16 14 2 18-8 2-18 0-24-2" stroke="#b7bac8" stroke-width="7" fill="none" stroke-linecap="round"/>'
    +'<ellipse cx="66" cy="40" rx="40" ry="16" fill="#cdd0dc"/>'
    +'<path d="M52 26c5 5 5 20 0 28M66 25c5 6 5 22 0 30M80 27c4 5 4 19 0 26" stroke="#b3b7c7" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>'
    +'<path d="M36 50c2 6 2 12 1 19" stroke="#cdd0dc" stroke-width="8.5" stroke-linecap="round" fill="none"/>'
    +'<path d="M33.5 70h7" stroke="#e9c8d0" stroke-width="2" stroke-linecap="round"/>'
    +'<circle cx="30" cy="40" r="16" fill="#d6d9e3"/>'
    +'<path d="M17 32l2-15 11 9z M34 25l9-11 3 15z" fill="#d0d3de"/><path d="M20 29l1.2-8 5.5 4.8z M36 25l5-6 1.6 8z" fill="#f1c6d2"/>'
    +'<path d="M20 41q3.5 2.6 7 0M33 41q3.5 2.6 7 0" stroke="#5c6275" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
    +'<path d="M28.5 46.5l1.5 1.4 1.5-1.4z" fill="#e39aac"/><path d="M14 45l-7 1M14 48l-7 3M46 45l7 1M46 48l7 3" stroke="#f3f4f8" stroke-width=".9" stroke-linecap="round"/></svg>';
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
  function filler(i){ var w=(3+rnd()*1.6).toFixed(2), h=(13.5+rnd()*4).toFixed(2); return '<span class="bk bk-f" style="--w:'+w+';--h:'+h+';--c:'+FILL[i%FILL.length]+'" aria-hidden="true"></span>'; }
  function vars(b){ return '--w:'+b.w+';--h:'+(b.h||4)+';--c:'+b.c+';--t:'+b.t+';--ff:'+b.ff+';--fs:'+b.fs+';--fw:'+(b.wt||400); }
  function spine(b){ return '<button type="button" class="bk'+(b.foil?' foil':'')+(b.up?' up':'')+(b.w>=9?' wide':'')+'" data-book="'+b.id+'" style="'+vars(b)+'" aria-label="pull out '+esc(b.title)+'">'
      +'<span class="bk-band" aria-hidden="true"></span><span class="bk-t">'+esc(b.title)+'</span>'+(b.noa?'':'<span class="bk-a" aria-hidden="true">xayna</span>')+'<span class="bk-mark" aria-hidden="true"></span>'
      +(b.tag?'<span class="bk-tag" aria-hidden="true">'+esc(b.tag)+'</span>':'')+'</button>'; }
  function flat(b,x){ return '<button type="button" class="hbk'+(b.up?' up':'')+'" data-book="'+b.id+'" style="'+vars(b)+';--x:'+x+'" aria-label="pull out '+esc(b.title)+'"><span class="hbk-t">'+esc(b.title)+'</span><em aria-hidden="true">xayna</em></button>'; }

  function build(){
    seed=17; var fi=0;
    var rows=ROWS.map(function(r){ return '<div class="shelf-row">'+r.map(function(t){
      if(t==='~') return filler(fi++);
      if(t==='_') return '<span class="gap" aria-hidden="true"></span>';
      if(t==='@vase') return '<span class="deco vase" aria-hidden="true">'+VASE+'</span>';
      if(t==='@candle') return '<span class="deco candle" aria-hidden="true">'+CANDLE+'</span>';
      if(t==='@cat') return '<span class="shelf-cat" aria-hidden="true">'+CAT+'<span class="zz">z<i>z</i></span></span>';
      if(t==='@stack') return '<span class="bk-stack"><span class="hbk hbk-f" style="--w:19;--c:#e9e4ee;--x:.6" aria-hidden="true"></span>'+flat(BY.portal,-.4)+flat(BY.meowtm,.3)+'</span>';
      return spine(BY[t]); }).join('')+'</div><div class="shelf-board" aria-hidden="true"></div>'; }).join('');
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
