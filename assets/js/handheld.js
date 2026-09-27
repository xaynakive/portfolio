/* back face · toolkit → a pearl-white clamshell handheld
   it powers on when the face opens. the square bottom screen is a launcher:
   every skill is a cartridge tile. the wide top screen shows the project
   that proves it. */
(function(){
  "use strict";
  var XK=window.XK, esc=XK.esc, reduce=XK.reduce;
  XK.objects=XK.objects||{};
  var SK=XK.SKILLS, PR=XK.PROOF, COLS=3;
  var ICON={
    interface:'<rect x="4" y="6" width="24" height="18" rx="3"/><path d="M4 11h24M9 17h9"/>',
    product:'<path d="M6 26l4-12 12-8 4 4-8 12z"/><circle cx="16" cy="16" r="2.4"/>',
    aiml:'<circle cx="16" cy="16" r="4"/><path d="M16 4v6M16 22v6M4 16h6M22 16h6M8 8l4 4M20 20l4 4M24 8l-4 4M12 20l-4 4"/>',
    cyber:'<path d="M16 4l10 4v7c0 7-4 11-10 13C10 26 6 22 6 15V8z"/><path d="M12 16l3 3 5-6"/>',
    systems:'<rect x="8" y="8" width="16" height="16" rx="2"/><path d="M12 4v4M20 4v4M12 24v4M20 24v4M4 12h4M4 20h4M24 12h4M24 20h4"/>',
    creative:'<path d="M16 5c6 0 11 4 11 10 0 4-3 5-5 5h-2c-2 0-3 2-2 4 1 3-1 4-3 4C9 28 5 22 5 16S10 5 16 5z"/><circle cx="11" cy="13" r="1.6"/><circle cx="17" cy="10" r="1.6"/><circle cx="22" cy="14" r="1.6"/>',
    human:'<circle cx="11" cy="11" r="4"/><circle cx="22" cy="12" r="3.4"/><path d="M4 26c0-5 3-8 7-8s7 3 7 8M18 25c0-4 2-7 5-7s5 3 5 7"/>'
  };
  function icon(id){ return '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+ICON[id]+'</svg>'; }
  var GRID='<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><circle cx="3" cy="3" r="1.4"/><circle cx="8" cy="3" r="1.4"/><circle cx="13" cy="3" r="1.4"/><circle cx="3" cy="8" r="1.4"/><circle cx="8" cy="8" r="1.4"/><circle cx="13" cy="8" r="1.4"/><circle cx="3" cy="13" r="1.4"/><circle cx="8" cy="13" r="1.4"/><circle cx="13" cy="13" r="1.4"/></svg>';

  function build(){
    var el=document.createElement('div'); el.className='handheld off';
    el.innerHTML=
      '<div class="hh-top">'
        +'<div class="hh-screen top"><div class="scr" id="hhTop" aria-live="polite"></div><span class="glare" aria-hidden="true"></span></div>'
      +'</div>'
      +'<div class="hh-hinge" aria-hidden="true"><i></i><i></i></div>'
      +'<div class="hh-bot">'
        +'<span class="stick l" aria-hidden="true"><i></i></span><span class="stick r" aria-hidden="true"><i></i></span>'
        +'<div class="hh-dpad" role="group" aria-label="direction pad">'
          +'<button type="button" class="pad up" data-k="ArrowUp" aria-label="up"></button><button type="button" class="pad rt" data-k="ArrowRight" aria-label="right"></button>'
          +'<button type="button" class="pad dn" data-k="ArrowDown" aria-label="down"></button><button type="button" class="pad lt" data-k="ArrowLeft" aria-label="left"></button><span class="pad-c" aria-hidden="true"></span></div>'
        +'<div class="hh-screen bot"><div class="scr" id="hhBot"></div><span class="glare" aria-hidden="true"></span></div>'
        +'<div class="hh-abxy" role="group" aria-label="buttons">'
          +'<button type="button" class="metal ab x" data-k="x" aria-label="previous shelf"><span>X</span></button><button type="button" class="metal ab a" data-k="a" aria-label="open the proof"><span>A</span></button>'
          +'<button type="button" class="metal ab b" data-k="b" aria-label="power off"><span>B</span></button><button type="button" class="metal ab y" data-k="y" aria-label="next shelf"><span>Y</span></button></div>'
        +'<button type="button" class="metal mini sel" data-k="select" aria-label="previous shelf"></button><button type="button" class="metal mini sta" data-k="start" aria-label="next shelf"></button>'
        +'<span class="hh-spk" aria-hidden="true"></span>'
        +'<button type="button" class="metal hh-home" data-k="b" aria-label="power off"></button>'
        +'<span class="hh-led" aria-hidden="true"></span>'
      +'</div>';
    return el;
  }

  var st={};
  function clock(){ var d=new Date(); return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2); }
  var STATUS=function(){ return '<span class="t-status" aria-hidden="true"><i class="wifi"></i><i class="bat"><i></i></i>98% · '+clock()+'</span>'; };
  function proofOf(){ var c=SK[st.c], it=c.items[st.i]; return { c:c, it:it, p:PR[it[2]]||{title:it[2],kind:'',line:''} }; }
  function renderTop(){ var o=proofOf(), p=o.p;
    st.top.innerHTML=STATUS()
      +'<div class="t-stage" data-cat="'+o.c.id+'"><p class="t-proves">proves · <b>'+esc(o.it[0])+'</b></p>'
      +'<h3 class="t-title">'+esc(p.title)+'</h3><p class="t-kind">'+esc(p.kind)+'</p><p class="t-line">'+esc(p.line)+'</p></div>'
      +'<span class="t-chip l" aria-hidden="true"><i>X</i> / <i>Y</i> shelves</span>'
      +(p.url?'<a href="'+p.url+'" target="_blank" rel="noopener" class="t-chip r t-open"><i>A</i> open ↗</a>':'<span class="t-chip r" aria-hidden="true">on this page</span>'); }
  function renderBot(focusSel){ var c=SK[st.c];
    st.bot.innerHTML='<div class="lw"><div class="lw-head"><span class="lw-grid">'+GRID+'</span><b>'+esc(c.name)+'</b>'
      +'<button type="button" class="lw-nav" data-k="x" aria-label="previous shelf"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
      +'<button type="button" class="lw-nav" data-k="y" aria-label="next shelf"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>'
      +'<ul class="lw-tiles" role="listbox" aria-label="'+esc(c.name)+' skills">'+c.items.map(function(it,i){
        return '<li><button type="button" role="option" class="cart'+(i===st.i?' on':'')+'" aria-selected="'+(i===st.i)+'" data-i="'+i+'" data-cat="'+c.id+'" style="--k:'+i+'"><span class="cart-art">'+icon(c.id)+'<em>'+esc(it[0])+'</em></span></button></li>'; }).join('')+'</ul>'
      +'<p class="lw-desc">'+esc(c.items[st.i][1])+'</p></div>';
    if(focusSel){ var b=st.bot.querySelector('.cart.on'); if(b) b.focus({preventScroll:true}); } }
  function sel(i,focus){ var n=SK[st.c].items.length; st.i=(i+n)%n; renderBot(focus); renderTop(); }
  function cat(d,focus){ st.c=(st.c+d+SK.length)%SK.length; st.i=0; renderBot(focus); renderTop(); XK.announce(SK[st.c].name+' shelf'); }
  function press(k){ var b=st.el.querySelector('.hh-bot > [data-k="'+k+'"], .hh-bot .hh-dpad [data-k="'+k+'"], .hh-bot .hh-abxy [data-k="'+k+'"]'); if(b){ b.classList.add('pressed'); setTimeout(function(){ b.classList.remove('pressed'); },140); } }
  function act(k,fromKey){
    if(!st.on) return;
    var inGrid=st.bot.contains(document.activeElement)||fromKey, n=SK[st.c].items.length;
    if(fromKey) press(k);
    if(k==='ArrowLeft') sel(st.i-1,inGrid); else if(k==='ArrowRight') sel(st.i+1,inGrid);
    else if(k==='ArrowUp') sel(st.i-COLS<0?st.i:st.i-COLS,inGrid); else if(k==='ArrowDown') sel(st.i+COLS>=n?st.i:st.i+COLS,inGrid);
    else if(k==='x'||k==='select') cat(-1,inGrid); else if(k==='y'||k==='start') cat(1,inGrid);
    else if(k==='a'){ var a=st.top.querySelector('.t-open'); if(a) a.click(); }
    else if(k==='b'){ st.api.close(); }
  }
  function boot(){ var el=st.el;
    if(reduce){ el.classList.remove('off'); st.on=true; renderBot(); renderTop(); return; }
    el.classList.remove('off'); el.classList.add('booting');
    st.top.innerHTML=STATUS()+'<div class="boot"><b>mythirium</b><span>toolkit · with evidence</span></div>'; st.bot.innerHTML='<div class="boot sm"><span>loading shelves…</span></div>';
    st.t=setTimeout(function(){ el.classList.remove('booting'); st.on=true; renderBot(); renderTop(); var b=st.bot.querySelector('.cart.on'); if(b&&st.el.contains(document.activeElement)) b.focus({preventScroll:true}); },1300); }

  XK.objects.toolkit={
    label:'the toolkit, a handheld',
    size:function(vw,vh){ var W=Math.min(vw*.94,(vh-60)/1.34,560); return { w:W, h:W*1.34 }; },
    build:build,
    mount:function(el,api){ st={ el:el, api:api, top:el.querySelector('#hhTop'), bot:el.querySelector('#hhBot'), c:0, i:0, on:false };
      el.addEventListener('click',function(e){ var it=e.target.closest('.cart'); if(it){ sel(+it.dataset.i,true); return; }
        var k=e.target.closest('[data-k]'); if(k){ act(k.dataset.k); } }); },
    resize:function(W,H){ if(st.el){ st.el.style.width=W+'px'; st.el.style.height=H+'px'; } },
    onGrown:boot,
    initialFocus:function(){ return st.el&&st.el.querySelector('.ab.a'); },
    keydown:function(e){ var m={ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1};
      if(m[e.key]){ e.preventDefault(); act(e.key,true); return true; }
      if(e.key==='['||e.key==='q'||e.key==='x'){ act('x',true); return true; } if(e.key===']'||e.key==='e'||e.key==='y'){ act('y',true); return true; }
      if(e.target.tagName!=='BUTTON'&&e.target.tagName!=='A'&&(e.key==='Enter'||e.key==='a')){ act('a',true); return true; }
      if(e.key==='b'){ act('b',true); return true; }
      return false; },
    unmount:function(){ clearTimeout(st.t); st={}; }
  };
})();
