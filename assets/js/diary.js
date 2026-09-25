/* front face · about → the diary
   a Sierra Blue chipboard hardcover with a flap and a lavender heart clasp.
   the flap opens first, then the cover swings open, slowly. a starlight spiral
   runs through the cover and the pearl-white 100 gsm grid pages. */
(function(){
  "use strict";
  var XK=window.XK, esc=XK.esc, reduce=XK.reduce, CDN=XK.CDN;
  XK.objects=XK.objects||{};
  var A=0.74; /* page aspect, width / height */

  /* ── scrapbook pieces ── */
  function pol(src,cap,st,shape,osd){ return '<figure class="dpol '+(shape||'sq')+'" style="'+st+'"><div class="vhs"><img src="'+CDN+src+'" alt="" loading="lazy" onerror="this.classList.add(\'gone\')"/>'
    +'<span class="osd" aria-hidden="true"><i></i>PLAY</span><span class="osd-t" aria-hidden="true">'+(osd||'AM 3:14')+'</span></div><figcaption>'+cap+'</figcaption></figure>'; }
  function tape(st,c){ return '<span class="dtape'+(c?' '+c:'')+'" style="'+st+'" aria-hidden="true"></span>'; }
  function star(st){ return '<span class="dstar" style="'+st+'" aria-hidden="true"></span>'; }
  function heart(st){ return '<svg class="dheart" style="'+st+'" viewBox="0 0 24 22" aria-hidden="true"><path d="M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21z"/></svg>'; }
  function arrow(st){ return '<svg class="darrow" style="'+st+'" viewBox="0 0 80 50" aria-hidden="true"><path d="M4 42C24 40 50 30 66 10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M55 11l12-3-1 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  function tulip(st){ return '<svg class="dflower" style="'+st+'" viewBox="0 0 40 80" aria-hidden="true"><path d="M20 36C19 54 21 66 20 79" stroke="#7fa77a" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M20 63C11 60 7 50 9 43C15 48 18 55 20 63z" fill="#8fb88a"/><path d="M10 19C10 8 16 4 20 11C24 4 30 8 30 19C30 31 25 37 20 37C15 37 10 31 10 19z" fill="#7d9be0"/><path d="M20 11C17 19 17 29 20 37C23 29 23 19 20 11z" fill="#5c7cc9"/><path d="M13 14C13 10 15 8 17 9" stroke="rgba(255,255,255,.55)" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>'; }
  function rose(st){ return '<svg class="dflower" style="'+st+'" viewBox="0 0 40 80" aria-hidden="true"><path d="M20 34C19 52 21 66 20 79" stroke="#5f7d5a" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M20 58C29 55 33 47 31 40C25 45 22 51 20 58z" fill="#6d8f67"/><path d="M8 24C9 36 31 36 32 24C29 32 11 32 8 24z" fill="#1b1624"/><circle cx="20" cy="21" r="12" fill="#2a2233"/><path d="M20 21m-3 0a3 3 0 1 1 6 0a6 6 0 1 1-12 0a9 9 0 1 1 18 0" stroke="#55466b" stroke-width="1.3" fill="none"/><path d="M12 15C14 11 17 10 19 10" stroke="rgba(255,255,255,.28)" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>'; }
  function phone(st){ return '<svg class="dphone" style="'+st+'" viewBox="0 0 30 58" aria-hidden="true"><rect x="1" y="1" width="28" height="56" rx="6" fill="#a5bfd8" stroke="#809dbd" stroke-width="1.2"/><rect x="3.5" y="3.5" width="23" height="51" rx="4" fill="#dfe8f2"/><rect x="11" y="6" width="8" height="2.4" rx="1.2" fill="#809dbd"/><path d="M5 40c5-6 12-8 20-4" stroke="#f5c98a" stroke-width="1.4" fill="none"/></svg>'; }
  function cat(st){ return '<svg class="dcat" style="'+st+'" viewBox="0 0 64 54" aria-hidden="true"><path d="M10 22L8 5C8 3 10 2 12 3L24 13C28 12 36 12 40 13L52 3C54 2 56 3 56 5L54 22C58 27 60 32 60 36C60 47 48 52 32 52C16 52 4 47 4 36C4 32 6 27 10 22z" fill="#fdfbf7" stroke="#d9cfe6" stroke-width="1.5"/><path d="M12.5 8L20.5 14L13.5 18zM51.5 8L43.5 14L50.5 18z" fill="#f6cfd8"/><ellipse cx="22" cy="33" rx="2.3" ry="2.7" fill="#4b5b6e"/><ellipse cx="42" cy="33" rx="2.3" ry="2.7" fill="#4b5b6e"/><ellipse cx="15" cy="40" rx="4" ry="2.3" fill="#f4b3c2"/><ellipse cx="49" cy="40" rx="4" ry="2.3" fill="#f4b3c2"/><path d="M29 38.6q1.5 2 3 0q1.5 2 3 0" stroke="#6d7a8a" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>'; }

  var COVER='<div class="dcover">'
    +'<span class="dcov-title">diary</span>'
    +'<svg class="dcov-emb" viewBox="0 0 64 54" aria-hidden="true"><defs><radialGradient id="dEmbG" cx="40%" cy="32%" r="72%"><stop offset="0" stop-color="#fdfcfa"/><stop offset="1" stop-color="#e6ecf2"/></radialGradient></defs>'
    +'<path d="M10 22L8 5C8 3 10 2 12 3L24 13C28 12 36 12 40 13L52 3C54 2 56 3 56 5L54 22C58 27 60 32 60 36C60 47 48 52 32 52C16 52 4 47 4 36C4 32 6 27 10 22z" fill="url(#dEmbG)"/>'
    +'<path d="M12.5 8L20.5 14L13.5 18z M51.5 8L43.5 14L50.5 18z" fill="#f6cfd8" opacity=".8"/>'
    +'<ellipse cx="22" cy="33" rx="2.3" ry="2.7" fill="#4b5b6e"/><ellipse cx="42" cy="33" rx="2.3" ry="2.7" fill="#4b5b6e"/>'
    +'<ellipse cx="15" cy="40" rx="4" ry="2.3" fill="#f4b3c2" opacity=".85"/><ellipse cx="49" cy="40" rx="4" ry="2.3" fill="#f4b3c2" opacity=".85"/>'
    +'<path d="M31 36.2h2l-1 1.2z" fill="#e9a2b2"/><path d="M29 38.6q1.5 2 3 0q1.5 2 3 0" stroke="#6d7a8a" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>'
    +'<svg class="dcov-heart" viewBox="0 0 24 22" aria-hidden="true"><path d="M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21z"/></svg>'
    +'<span class="dcov-name">xayna</span><span class="dcov-hint">tap to open</span></div>';

  var INSIDE='<div class="dp endpaper">'+tulip('top:9%;left:66%;width:14%;--r:14deg')
    +'<p class="dhand" style="top:30%;left:12%;width:76%;font-size:4.2cqw">if found, please return to xayna.</p>'
    +'<p class="dmono" style="top:48%;left:12%">reward: one (1) cat photo</p>'
    +'<p class="dmono faint" style="top:84%;left:12%">vol. 01 · 100 gsm · grid</p>'+cat('top:70%;left:68%;width:13%;--r:-8deg')+'</div>';

  var PAGES=[
    /* 1 · me · quiet */
    '<div class="dp">'+pol('pfp.png','ma propre muse.','top:8%;left:19%;width:52%;--r:-3deg','tall','SEP. 24')+tape('top:5.5%;left:35%;width:20%;--r:-6deg')
      +star('top:12%;left:80%;width:6%')+star('top:20%;left:86%;width:3.6%')+arrow('top:56%;left:72%;width:17%;--r:-12deg')
      +'<p class="dhand" style="top:71%;left:14%;font-size:5cqw">the maker, too.</p>'
      +'<p class="dpix" style="top:86%;left:14%">a story in cats &amp; code</p>'+heart('top:85%;left:80%;width:5.5%')+'</div>',
    /* 2 · a handwritten letter */
    '<div class="dp"><p class="dhand" style="top:6%;left:12%;font-size:5.4cqw">hi, i’m xayna.</p>'
      +'<div class="dletter" style="top:19%;left:12%;width:76%"><p>i build intelligent systems and strange interfaces, usually with cats.</p>'
      +'<p>by day, a final-year computer science student and a design engineer. by night, the better part, i make worlds, websites and whatever this cube is.</p>'
      +'<p>this diary is the soft version of my CV: the parts that don’t fit in bullet points. turn the pages gently. some of them are crowded.</p></div>'
      +'<p class="dhand" style="top:80%;left:56%;font-size:4.6cqw">— x</p>'+heart('top:82%;left:76%;width:4.5%')
      +'<span class="dstamp" style="top:84%;left:12%;--r:-5deg"><i class="dot-on"></i>status: online</span></div>',
    /* 3 · things i love · the crowded collage */
    '<div class="dp"><p class="dhand" style="top:3%;left:8%;font-size:4.6cqw">things i love</p>'+star('top:5%;left:86%;width:4.5%')
      +pol('cat2.png','cats, obviously','top:12%;left:5%;width:34%;--r:-5deg','sq','CAT 01')+tape('top:10%;left:13%;width:16%;--r:-3deg')
      +pol('catttttttttttt.png','long drives after dark','top:13%;left:45%;width:47%;--r:4deg','wide','PM 11:52')+tape('top:11%;left:60%;width:16%;--r:7deg','pink')
      +pol('cat.png','icy weather','top:50%;left:66%;width:27%;--r:-4deg','tall','JAN. 03')+tape('top:48%;left:72%;width:14%;--r:-8deg','blue')
      +tulip('top:47%;left:5%;width:10%;--r:-10deg')+rose('top:48%;left:14%;width:10%;--r:8deg')+tape('top:58%;left:5%;width:17%;--r:-3deg')
      +'<p class="dhand" style="top:63%;left:4%;font-size:2.9cqw;--r:-4deg">blue tulips &amp; black roses</p>'
      +phone('top:49%;left:30%;width:6.5%;--r:8deg')+'<p class="dsmall" style="top:50%;left:40%;width:23%">Sierra Blue iPhones, for an unreasonable reason</p>'
      +'<ul class="dlist tight" style="top:73%;left:6%;width:58%"><li>beautiful interfaces</li><li>slowdive</li><li>golden hour</li><li>and, suspiciously, <mark>myself</mark></li></ul></div>',
    /* 4 · the no list · a receipt */
    '<div class="dp"><p class="dhand" style="top:4%;left:9%;font-size:4.6cqw">the no list</p>'
      +'<div class="drec" style="top:16%;left:14%;width:64%;--r:-2deg"><div class="drec-h">dislikes · receipt</div>'
      +'<div class="drec-row"><span>bad interfaces</span><span>x∞</span></div><div class="drec-row"><span>unnecessary meetings</span><span>x12</span></div>'
      +'<div class="drec-row"><span>anything before sunset</span><span>x1</span></div><div class="drec-row"><span>cold coffee</span><span>x3</span></div>'
      +'<div class="drec-row"><span>being rushed</span><span>x∞</span></div><div class="drec-row tot"><span>total</span><span>a lot</span></div>'
      +'<div class="drec-bar"></div><div class="drec-f">thank you, come again</div></div>'+tape('top:13.5%;left:36%;width:22%;--r:4deg')
      +'<div class="dnote pink" style="top:80%;left:46%;width:42%;--r:-5deg">also: people who don’t pet cats</div></div>',
    /* 5 · currently · sticky notes */
    '<div class="dp"><p class="dhand" style="top:4%;left:9%;font-size:4.6cqw">currently</p>'+star('top:8%;left:78%;width:5.5%')
      +'<div class="dnote lav" style="top:17%;left:9%;width:42%;--r:-4deg">building MEOW, in the open</div>'
      +'<div class="dnote" style="top:21%;left:53%;width:38%;--r:5deg">writing the Shimmerwhere canon</div>'
      +'<div class="dnote pink" style="top:45%;left:13%;width:40%;--r:3deg">this cube, apparently</div>'
      +'<div class="dnote blue" style="top:49%;left:55%;width:35%;--r:-5deg">final-year cs, somehow</div>'
      +'<span class="dstamp" style="top:79%;left:15%;--r:-5deg">mood: happy, floating</span></div>',
    /* 6 · lore · a little music player and personal canon */
    '<div class="dp"><p class="dhand" style="top:4%;left:9%;font-size:4.6cqw">lore</p>'
      +'<div class="dplayer" style="top:15%;left:9%;width:78%"><div class="dpl-bar"><span>now playing</span></div>'
      +'<div class="dpl-body"><b>slowdive</b><span>on repeat, obviously</span><div class="dpl-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>'
      +'<div class="dpl-ctrl"><span class="prev" aria-hidden="true"></span><button type="button" class="dpl-play" aria-label="play" aria-pressed="false"></button><span class="next" aria-hidden="true"></span></div>'
      +'<div class="dpl-prog"><span>1:12</span><div class="dpl-track"><em></em></div><span>3:38</span></div></div></div>'
      +'<ul class="dlist small" style="top:57%;left:9%;width:80%"><li>met computers at three: a beige desktop and a CRT</li><li>took apart PSPs to see where the magic lived</li><li>a Carrd and Neocities kid</li><li>one cat, several dependents, absolutely no authority</li></ul></div>',
    /* 7 · the end · quiet */
    '<div class="dp">'+star('top:12%;left:16%;width:5.5%')+'<p class="dhand" style="top:22%;left:8%;width:84%;text-align:center;font-size:5.6cqw">that’s all, for now.</p>'
      +'<p class="dbody" style="top:40%;left:14%;width:72%;text-align:center">thank you for reading my diary. you’re officially the curious type.</p>'
      +'<p class="dhand" style="top:58%;left:38%;font-size:5.6cqw">— xayna</p>'+heart('top:56%;left:84%;width:5%')
      +'<p class="dpix" style="top:84%;left:10%;width:80%;text-align:center">p.s. there are three more worlds in this cube.</p></div>'
  ];
  var BACKLEAF='<div class="dp"><p class="dsmall" style="top:46%;left:0;width:100%;text-align:center">(the rest is still being written)</p></div>';

  function arrowSvg(d){ return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(d<0?'M15 5l-7 7 7 7':'M9 5l7 7-7 7')+'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  var XSVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  var st={};
  function build(){
    var F=[[COVER,INSIDE],[PAGES[0],PAGES[1]],[PAGES[2],PAGES[3]],[PAGES[4],PAGES[5]],[PAGES[6],BACKLEAF]], N=F.length;
    var leaves=F.map(function(f,i){ return '<div class="leaf" data-leaf="'+i+'">'
      +'<div class="pg front'+(i===0?' is-cover':'')+'"><span class="pshade"></span>'+f[0]+(i>0?'<span class="dpn r">'+(2*i-1)+'</span><span class="dear"></span>':'')+'</div>'
      +'<div class="pg back'+(i===0?' is-inside':'')+'"><span class="pshade"></span>'+f[1]+(i>0&&i<N-1?'<span class="dpn l">'+(2*i)+'</span>':'')+'</div></div>'; }).join('');
    var rings=''; for(var r=0;r<15;r++) rings+='<i></i>';
    var el=document.createElement('div'); el.className='diary';
    el.innerHTML='<div class="d-view"><div class="d-book" aria-label="xayna’s diary"><div class="d-board" aria-hidden="true"></div>'+leaves
      +'<div class="d-spiral" aria-hidden="true">'+rings+'</div>'
      +'<div class="d-flap" aria-hidden="true"><span class="d-clasp"><svg viewBox="0 0 24 22"><path d="M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21z"/></svg></span></div></div></div>'
      +'<button class="metal d-close" type="button" aria-label="close the diary">'+XSVG+'</button>'
      +'<button class="metal d-btn d-prev" type="button" aria-label="previous page">'+arrowSvg(-1)+'</button>'
      +'<button class="metal d-btn d-next" type="button" aria-label="open the diary">'+arrowSvg(1)+'</button>'
      +'<p class="sr-only d-live" aria-live="polite"></p>';
    return el;
  }

  function mount(el,api){
    st={ el:el, api:api, book:el.querySelector('.d-book'), view:el.querySelector('.d-view'), leaves:[].slice.call(el.querySelectorAll('.leaf')),
         prev:el.querySelector('.d-prev'), next:el.querySelector('.d-next'), live:el.querySelector('.d-live'), v:0, single:false, timers:[] };
    st.N=st.leaves.length; st.SP=st.N-1;
    st.book.addEventListener('click',function(e){ if(e.target.closest('a,button')) return; var l=e.target.closest('.leaf'); if(!l) return;
      if(st.single){ go(st.v+1>maxV()?st.v:st.v+1); return; }
      if(+l.dataset.leaf<sp(st.v)) go(st.v-1); else go(st.v+1); });
    st.prev.addEventListener('click',function(){ go(st.v-1); });
    st.next.addEventListener('click',function(){ go(st.v+1); });
    el.querySelector('.d-close').addEventListener('click',api.close);
    var play=el.querySelector('.dpl-play');
    play.addEventListener('click',function(){ var on=play.getAttribute('aria-pressed')!=='true'; play.setAttribute('aria-pressed',on); play.setAttribute('aria-label',on?'pause':'play'); el.querySelector('.dplayer').classList.toggle('on',on); });
  }
  function maxV(){ return st.single?st.SP*2:st.SP; }
  function sp(x){ return st.single?Math.ceil(x/2):x; }
  function render(instant){
    var s=sp(st.v), b=st.book;
    if(instant){ b.classList.add('instant'); }
    st.leaves.forEach(function(l,i){ var f=i<s; l.classList.toggle('flipped',f); if(!l._moving) l.style.zIndex=f?(i+1):(2*st.N-i); });
    var tx=st.single?((st.v===0||st.v%2===0)?-50:0):(s===0?-25:0);
    b.style.transform='translateX('+tx+'%)';
    b.classList.toggle('open',s>0); st.el.classList.toggle('is-open',s>0);
    if(instant){ void b.offsetWidth; b.classList.remove('instant'); }
    st.prev.disabled=st.v===0; st.next.disabled=st.v>=maxV();
    st.next.setAttribute('aria-label',st.v===0?'open the diary':'next page');
    var total=7, txt;
    if(st.v===0) txt='the diary is closed. tap the cover to open it.';
    else if(st.single) txt=st.v===1?'inside the cover':('page '+(st.v-1)+' of '+total);
    else txt=s===1?'inside the cover and page 1':(s===st.SP?'pages 6 and 7 of 7':'pages '+(2*s-2)+' and '+(2*s-1)+' of '+total);
    st.live.textContent=txt;
  }
  function later(fn,ms){ var t=setTimeout(fn,reduce?0:ms); st.timers.push(t); return t; }
  function go(n){
    n=Math.max(0,Math.min(maxV(),n)); if(n===st.v) return;
    var s0=sp(st.v), s1=sp(n), b=st.book;
    /* the flap opens first, then the cover */
    if(s0===0&&s1>0&&!b.classList.contains('flap-open')){ b.classList.add('flap-open'); if(!reduce){ later(function(){ go(n); },520); return; } }
    if(s0!==s1){ var fwd=s1>s0, idx=fwd?s0:s1, l=st.leaves[idx];
      if(l){ l._moving=true; l.classList.remove('turning'); void l.offsetWidth; l.classList.add('turning'); l.style.zIndex=fwd?(300+idx):(300+st.N-idx); clearTimeout(l._t);
        l._t=later(function(){ l._moving=false; l.classList.remove('turning'); render(false); }, idx===0?1650:1000); } }
    st.v=n; render(false);
    if(s1===0){ clearTimeout(b._f); b._f=later(function(){ if(sp(st.v)===0) b.classList.remove('flap-open'); },1500); }
  }
  function closeBook(cb){
    (function step(){ var s=sp(st.v);
      if(s===0){ later(cb, st.book.classList.contains('flap-open')?1700:0); return; }
      go(st.single?(s-1===0?0:2*(s-1)):s-1); later(step,s===1?0:220); })();
  }

  XK.objects.about={
    label:'xayna’s diary',
    size:function(vw,vh){ st.single=vw<640;
      var P=st.single?Math.min(vw*.84,(vh-160)*A,420):Math.min((vw-190)/2,(vh-120)*A,440);
      return st.single?{w:P,h:P/A}:{w:P*2,h:P/A}; },
    focus:function(W,H){ return st.single?{x:0,y:0,w:W,h:H}:{x:W/4,y:0,w:W/2,h:H}; },
    build:build, mount:mount,
    resize:function(W,H){ if(!st.el) return; var P=st.single?W:W/2;
      st.el.style.width=W+'px'; st.el.style.height=H+'px'; st.book.style.width=(P*2)+'px'; st.book.style.height=H+'px';
      var was=st.el.classList.contains('single'); st.el.classList.toggle('single',st.single);
      if(was!==st.single&&st.v>0){ st.v=st.single?2*st.v-1:Math.ceil(st.v/2); }
      render(true); },
    initialFocus:function(){ return st.next; },
    keydown:function(e){ if(e.key==='ArrowRight'){ e.preventDefault(); go(st.v+1); return true; } if(e.key==='ArrowLeft'){ e.preventDefault(); go(st.v-1); return true; } return false; },
    beforeClose:function(cb){ if(st.v>0||st.book.classList.contains('flap-open')) closeBook(cb); else cb(); },
    unmount:function(){ st.timers.forEach(clearTimeout); st={}; }
  };
})();
