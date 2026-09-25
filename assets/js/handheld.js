/* back face · toolkit → a dual-screen handheld
   powered on when the face opens. the bottom screen lists each skill,
   the top screen shows the project that proves it. */
(function(){
  "use strict";
  var XK=window.XK, esc=XK.esc, reduce=XK.reduce;
  XK.objects=XK.objects||{};
  var SK=XK.SKILLS, PR=XK.PROOF;
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

  function build(){
    var el=document.createElement('div'); el.className='handheld off';
    el.innerHTML=
      '<div class="hh-top">'
        +'<span class="hh-spk l" aria-hidden="true"></span><span class="hh-spk r" aria-hidden="true"></span>'
        +'<div class="hh-screen top"><div class="scr" id="hhTop" aria-live="polite"></div><span class="glare" aria-hidden="true"></span></div>'
        +'<span class="hh-cam" aria-hidden="true"></span>'
      +'</div>'
      +'<div class="hh-hinge" aria-hidden="true"><i></i><i></i></div>'
      +'<div class="hh-bot">'
        +'<div class="hh-dpad" role="group" aria-label="direction pad">'
          +'<button type="button" class="pad up" data-k="ArrowUp" aria-label="up"></button><button type="button" class="pad rt" data-k="ArrowRight" aria-label="next category"></button>'
          +'<button type="button" class="pad dn" data-k="ArrowDown" aria-label="down"></button><button type="button" class="pad lt" data-k="ArrowLeft" aria-label="previous category"></button><span class="pad-c" aria-hidden="true"></span></div>'
        +'<div class="hh-screen bot"><div class="scr" id="hhBot"></div><span class="glare" aria-hidden="true"></span></div>'
        +'<div class="hh-abxy" role="group" aria-label="buttons">'
          +'<button type="button" class="metal ab x" data-k="x" aria-label="previous category"><span>X</span></button><button type="button" class="metal ab a" data-k="a" aria-label="open the proof"><span>A</span></button>'
          +'<button type="button" class="metal ab b" data-k="b" aria-label="power off"><span>B</span></button><button type="button" class="metal ab y" data-k="y" aria-label="next category"><span>Y</span></button></div>'
        +'<div class="hh-mid"><button type="button" class="metal pill" data-k="select" aria-label="previous category">select</button><button type="button" class="metal pill" data-k="start" aria-label="next category">start</button></div>'
        +'<span class="hh-led" aria-hidden="true"></span><span class="hh-mark" aria-hidden="true">mythirium · B powers off</span>'
      +'</div>';
    return el;
  }

  var st={};
  function proofOf(){ var c=SK[st.c], it=c.items[st.i]; return { c:c, it:it, p:PR[it[2]]||{title:it[2],kind:'',line:''} }; }
  function renderTop(){ var o=proofOf(), p=o.p;
    st.top.innerHTML='<div class="t-head"><span>proves</span><b>'+esc(o.it[0])+'</b></div>'
      +'<div class="t-card"><div class="t-art" data-cat="'+o.c.id+'">'+icon(o.c.id)+'</div><div class="t-txt"><h3>'+esc(p.title)+'</h3><p class="t-kind">'+esc(p.kind)+'</p><p class="t-line">'+esc(p.line)+'</p></div></div>'
      +'<div class="t-foot">'+(p.url?'<a href="'+p.url+'" target="_blank" rel="noopener" class="t-open"><i class="kbd">A</i> open '+esc(p.title)+' ↗</a>':'<span class="t-none">the proof lives on this page</span>')+'</div>'; }
  function renderBot(focusSel){ var c=SK[st.c];
    st.bot.innerHTML='<div class="b-head"><button type="button" class="b-cat prev" data-k="ArrowLeft" aria-label="previous category"></button><span class="b-name">'+icon(c.id)+'<b>'+esc(c.name)+'</b></span><button type="button" class="b-cat next" data-k="ArrowRight" aria-label="next category"></button></div>'
      +'<div class="b-dots" aria-hidden="true">'+SK.map(function(x,i){ return '<i'+(i===st.c?' class="on"':'')+'></i>'; }).join('')+'</div>'
      +'<ul class="b-list" role="listbox" aria-label="'+esc(c.name)+' skills">'+c.items.map(function(it,i){ return '<li><button type="button" role="option" class="b-item'+(i===st.i?' on':'')+'" aria-selected="'+(i===st.i)+'" data-i="'+i+'"><b>'+esc(it[0])+'</b><span>'+esc(it[1])+'</span></button></li>'; }).join('')+'</ul>';
    if(focusSel){ var b=st.bot.querySelector('.b-item.on'); if(b) b.focus({preventScroll:true}); }
    var on=st.bot.querySelector('.b-item.on'); if(on&&on.scrollIntoView) on.scrollIntoView({block:'nearest'}); }
  function sel(i,focus){ var n=SK[st.c].items.length; st.i=(i+n)%n; renderBot(focus); renderTop(); }
  function cat(d,focus){ st.c=(st.c+d+SK.length)%SK.length; st.i=0; renderBot(focus); renderTop(); XK.announce(SK[st.c].name); }
  function press(k){ var b=st.el.querySelector('.hh-bot [data-k="'+k+'"]'); if(b){ b.classList.add('pressed'); setTimeout(function(){ b.classList.remove('pressed'); },140); } }
  function act(k,fromKey){
    if(!st.on) return;
    var inList=st.bot.contains(document.activeElement);
    if(fromKey) press(k);
    if(k==='ArrowUp') sel(st.i-1,inList||fromKey); else if(k==='ArrowDown') sel(st.i+1,inList||fromKey);
    else if(k==='ArrowLeft'||k==='x'||k==='select') cat(-1,inList); else if(k==='ArrowRight'||k==='y'||k==='start') cat(1,inList);
    else if(k==='a'){ var a=st.top.querySelector('.t-open'); if(a) a.click(); }
    else if(k==='b'){ st.api.close(); }
  }
  function boot(){ var el=st.el;
    if(reduce){ el.classList.remove('off'); st.on=true; renderBot(); renderTop(); return; }
    el.classList.remove('off'); el.classList.add('booting');
    st.top.innerHTML='<div class="boot"><b>mythirium</b><span>toolkit · with evidence</span></div>'; st.bot.innerHTML='<div class="boot sm"><span>touch a skill</span></div>';
    st.t=setTimeout(function(){ el.classList.remove('booting'); st.on=true; renderBot(); renderTop(); var b=st.bot.querySelector('.b-item.on'); if(b&&st.el.contains(document.activeElement)) b.focus({preventScroll:true}); },1250); }

  XK.objects.toolkit={
    label:'the toolkit, a handheld',
    size:function(vw,vh){ var W=Math.min(vw*.92,(vh-70)/1.42,500); return { w:W, h:W*1.42 }; },
    build:build,
    mount:function(el,api){ st={ el:el, api:api, top:el.querySelector('#hhTop'), bot:el.querySelector('#hhBot'), c:0, i:0, on:false };
      el.addEventListener('click',function(e){ var it=e.target.closest('.b-item'); if(it){ sel(+it.dataset.i,true); return; }
        var k=e.target.closest('[data-k]'); if(k){ act(k.dataset.k); } }); },
    resize:function(W,H){ if(st.el){ st.el.style.width=W+'px'; st.el.style.height=H+'px'; } },
    onGrown:boot,
    initialFocus:function(){ return st.el&&st.el.querySelector('.ab.a'); },
    keydown:function(e){ var m={ArrowUp:1,ArrowDown:1,ArrowLeft:1,ArrowRight:1};
      if(m[e.key]){ e.preventDefault(); act(e.key,true); return true; }
      if(e.target.tagName!=='BUTTON'&&e.target.tagName!=='A'&&(e.key==='Enter'||e.key==='a')){ act('a',true); return true; }
      if(e.key==='b'){ act('b',true); return true; }
      return false; },
    unmount:function(){ clearTimeout(st.t); st={}; }
  };
})();
