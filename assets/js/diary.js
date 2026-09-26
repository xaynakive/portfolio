/* front face · about → the diary
   a Sierra Blue hardcover with a paper feel: silver-foil title, blind-embossed
   tulips and roses, an elastic band with a pearl heart charm. inside, silver
   binder rings hold pearl-white pages with a subtle grid.
   the band slides off first, then the cover swings open, slowly. */
(function(){
  "use strict";
  var XK=window.XK, reduce=XK.reduce, CDN=XK.CDN;
  XK.objects=XK.objects||{};
  var A=0.74; /* page aspect, width / height */
  var HEART='M12 21C5 15 1 11 1 6.5A5.5 5.5 0 0 1 12 4a5.5 5.5 0 0 1 11 2.5C23 11 19 15 12 21z';

  /* ── planner pieces ── */
  function pol(src,cap,st,shape,osd){ return '<figure class="dpol '+(shape||'sq')+'" style="'+st+'"><div class="vhs"><img src="'+CDN+src+'" alt="" loading="lazy" onerror="this.classList.add(\'gone\')"/>'
    +'<span class="osd" aria-hidden="true"><i></i>PLAY</span><span class="osd-t" aria-hidden="true">'+(osd||'AM 3:14')+'</span></div><figcaption>'+cap+'</figcaption></figure>'; }
  function tape(st,c){ return '<span class="dtape'+(c?' '+c:'')+'" style="'+st+'" aria-hidden="true"></span>'; }
  function pin(st,c){ return '<span class="dpin'+(c?' '+c:'')+'" style="'+st+'" aria-hidden="true"></span>'; }
  function spark(st){ return '<span class="dspark" style="'+st+'" aria-hidden="true"></span>'; }
  function heart(st){ return '<svg class="dheart" style="'+st+'" viewBox="0 0 24 22" aria-hidden="true"><path d="'+HEART+'"/></svg>'; }
  function bubbles(st){ return '<span class="dbub" style="'+st+'" aria-hidden="true"><i></i><i></i><i></i></span>'; }
  function bow(st){ return '<svg class="dbow" style="'+st+'" viewBox="0 0 60 36" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M30 14C24 4 10 2 8 8s8 12 22 6zM30 14C36 4 50 2 52 8s-8 12-22 6z"/><circle cx="30" cy="14.5" r="2.6"/><path d="M28.5 17C25 24 21 29 16 33M31.5 17C35 24 39 29 44 33"/></svg>'; }
  function satin(st){ return '<svg class="dsatin" style="'+st+'" viewBox="0 0 80 60" aria-hidden="true"><defs><linearGradient id="satG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3eaf4"/><stop offset=".45" stop-color="#b9cbe0"/><stop offset=".6" stop-color="#f6f8fb"/><stop offset="1" stop-color="#a5bcd6"/></linearGradient></defs>'
    +'<path d="M40 20C30 4 8 2 6 12s16 16 34 8zM40 20C50 4 72 2 74 12S58 28 40 20z" fill="url(#satG)" stroke="rgba(90,120,160,.35)" stroke-width=".6"/>'
    +'<path d="M37 22c-4 12-8 24-14 36l6-2 3 4c3-12 6-26 8-38zM43 22c4 12 8 24 14 36l-6-2-3 4c-3-12-6-26-8-38z" fill="url(#satG)" stroke="rgba(90,120,160,.3)" stroke-width=".6"/>'
    +'<rect x="35.5" y="15.5" width="9" height="9" rx="3" fill="#c9d7e7" stroke="rgba(90,120,160,.35)" stroke-width=".6"/></svg>'; }
  function tulip(st){ return '<svg class="dflower" style="'+st+'" viewBox="0 0 40 80" aria-hidden="true"><path d="M20 36C19 54 21 66 20 79" stroke="#7fa77a" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M20 63C11 60 7 50 9 43C15 48 18 55 20 63z" fill="#8fb88a"/><path d="M10 19C10 8 16 4 20 11C24 4 30 8 30 19C30 31 25 37 20 37C15 37 10 31 10 19z" fill="#7d9be0"/><path d="M20 11C17 19 17 29 20 37C23 29 23 19 20 11z" fill="#5c7cc9"/><path d="M13 14C13 10 15 8 17 9" stroke="rgba(255,255,255,.55)" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>'; }
  function rose(st){ return '<svg class="dflower" style="'+st+'" viewBox="0 0 40 80" aria-hidden="true"><path d="M20 34C19 52 21 66 20 79" stroke="#5f7d5a" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M20 58C29 55 33 47 31 40C25 45 22 51 20 58z" fill="#6d8f67"/><path d="M8 24C9 36 31 36 32 24C29 32 11 32 8 24z" fill="#1b1624"/><circle cx="20" cy="21" r="12" fill="#2a2233"/><path d="M20 21m-3 0a3 3 0 1 1 6 0a6 6 0 1 1-12 0a9 9 0 1 1 18 0" stroke="#55466b" stroke-width="1.3" fill="none"/><path d="M12 15C14 11 17 10 19 10" stroke="rgba(255,255,255,.28)" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>'; }
  function phone(st){ return '<svg class="dphone" style="'+st+'" viewBox="0 0 30 58" aria-hidden="true"><rect x="1" y="1" width="28" height="56" rx="6" fill="#a5bfd8" stroke="#809dbd" stroke-width="1.2"/><rect x="3.5" y="3.5" width="23" height="51" rx="4" fill="#e6edf5"/><rect x="11" y="6" width="8" height="2.4" rx="1.2" fill="#809dbd"/></svg>'; }
  function film(st,frames){ return '<div class="dfilm" style="'+st+'" aria-hidden="true">'+frames.map(function(f){ return '<span class="vhs"><img src="'+CDN+f+'" alt="" loading="lazy" onerror="this.classList.add(\'gone\')"/></span>'; }).join('')+'</div>'; }
  function kick(n,title,sub){ return '<div class="dkick" style="top:5%;left:10%"><b>('+n+')</b><span>'+title+'</span>'+(sub?'<em>'+sub+'</em>':'')+'</div>'; }

  /* blind-embossed tulips and roses for the cover corners */
  var SPRAY='<path d="M8 92C24 70 40 56 62 48"/><path d="M26 72c-6-10-4-20 4-24 6 8 4 18-4 24z"/><path d="M44 58c2-10 10-16 18-14-2 9-10 15-18 14z"/>'
    +'<path d="M62 48c-4-10 0-20 8-22 4-6 12-6 14 2 2 8-2 16-10 20-4 2-8 2-12 0z"/><path d="M70 30c2 4 6 6 10 4M68 38c4 0 8-2 10-6"/>'
    +'<circle cx="30" cy="40" r="9"/><path d="M30 40m-3 0a3 3 0 1 1 6 0a5.5 5.5 0 1 1-11 0a8 8 0 1 1 16 0"/><path d="M30 49C28 60 22 68 14 76"/><path d="M22 62c-8-2-12-8-10-14 6 2 10 8 10 14z"/>';
  function spray(cls){ return '<svg class="dcov-emb '+cls+'" viewBox="0 0 96 96" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'+SPRAY+'</svg>'; }
  var COVER='<div class="dcover">'+spray('tl')+spray('br')
    +'<span class="dcov-name">xayna</span><span class="dcov-sub">diary · vol. 01</span>'
    +'<span class="dcov-hint">tap to open</span></div>';

  /* inside the front cover: a pocket, and a card tucked into it */
  var INSIDE='<div class="dinside"><span class="dpen" aria-hidden="true"><i></i></span>'
    +'<div class="dcard"><p class="dhand">if found, please return to xayna.</p><p class="dmono">reward: one (1) cat photo</p></div>'
    +'<span class="dpocket" aria-hidden="true"></span><span class="dvol">vol. 01 · 100 gsm · grid</span></div>';

  var PAGES=[
    /* 1 · me · quiet */
    '<div class="dp">'+satin('top:-1%;left:74%;width:21%;--r:8deg')+kick('01','me','a story in cats &amp; code')
      +pol('pfp.png','ma propre muse.','top:22%;left:27%;width:50%;--r:-2.5deg','tall','SEP. 24')+pin('top:20.5%;left:49%;width:3.6%')
      +bubbles('top:30%;left:84%;width:9%')+spark('top:62%;left:12%;width:4%')+spark('top:67%;left:17%;width:2.4%')
      +'<p class="dhand" style="top:81%;left:28%;font-size:5cqw;--r:-2deg">the maker, too.</p>'+bow('top:84%;left:8%;width:13%;color:#b7a6d9;--r:-8deg')+'</div>',
    /* 2 · a handwritten letter */
    '<div class="dp">'+kick('02','a letter','read slowly')+bow('top:5%;left:78%;width:12%;color:#a5bfd8;--r:8deg')
      +'<div class="dcardtint" style="top:18%;left:9%;width:82%"><p class="dhand" style="font-size:5cqw">hi, i’m xayna.</p>'
      +'<div class="dletter"><p>i build intelligent systems and strange interfaces, usually with cats.</p>'
      +'<p>by day, a final-year computer science student and a design engineer. by night, the better part, i make worlds, websites and whatever this cube is.</p>'
      +'<p>this diary is the soft version of my CV: the parts that don’t fit in bullet points. turn the pages gently. some of them are crowded.</p></div>'
      +'<p class="dhand dsig">— x</p></div>'+pin('top:16.5%;left:47%;width:3.4%','lav')
      +'<span class="dstamp" style="top:86%;left:11%;--r:-4deg"><i class="dot-on"></i>status: online</span>'+heart('top:86%;left:78%;width:4.5%')+'</div>',
    /* 3 · things i love · the crowded one */
    '<div class="dp">'+kick('03','things i love','an incomplete list')+bubbles('top:5%;left:84%;width:8%')
      +film('top:17%;left:6%;width:21%;--r:-2deg',['cat2.png','catttttttttttt.png','cat.png'])+'<p class="dmono tiny" style="top:61%;left:6%;width:22%">cats · drives · ice</p>'
      +pol('catttttttttttt.png','long drives after dark','top:17%;left:34%;width:57%;--r:3deg','wide','PM 11:52')+pin('top:15.5%;left:61%;width:3.4%','pink')
      +tulip('top:57%;left:33%;width:8%;--r:-10deg')+rose('top:58%;left:40%;width:8%;--r:8deg')+tape('top:66%;left:32%;width:16%;--r:-3deg','blue')
      +'<p class="dhand" style="top:70%;left:30%;font-size:2.6cqw;--r:-3deg">blue tulips &amp; black roses</p>'
      +phone('top:55%;left:66%;width:5.5%;--r:8deg')+'<p class="dsmall" style="top:55%;left:74%;width:22%">Sierra Blue iPhones, for an unreasonable reason</p>'
      +'<ul class="dlist tight" style="top:79%;left:8%;width:86%"><li>icy weather</li><li>beautiful interfaces</li><li>slowdive</li><li>golden hour</li><li>and, suspiciously, <mark>myself</mark></li></ul></div>',
    /* 4 · the no list · a receipt */
    '<div class="dp">'+kick('04','the no list','a receipt')
      +'<div class="drec" style="top:18%;left:15%;width:62%;--r:-2deg"><div class="drec-h">dislikes · receipt</div>'
      +'<div class="drec-row"><span>bad interfaces</span><span>x∞</span></div><div class="drec-row"><span>unnecessary meetings</span><span>x12</span></div>'
      +'<div class="drec-row"><span>anything before sunset</span><span>x1</span></div><div class="drec-row"><span>cold coffee</span><span>x3</span></div>'
      +'<div class="drec-row"><span>being rushed</span><span>x∞</span></div><div class="drec-row tot"><span>total</span><span>a lot</span></div>'
      +'<div class="drec-bar"></div><div class="drec-f">thank you, come again</div></div>'+pin('top:16.5%;left:45%;width:3.4%')
      +'<div class="dnote pink" style="top:80%;left:46%;width:42%;--r:-5deg">also: people who don’t pet cats</div>'+bow('top:83%;left:14%;width:13%;color:#e2a7b8;--r:-10deg')+'</div>',
    /* 5 · currently · pinned notes */
    '<div class="dp">'+kick('05','currently','notes, mostly')+spark('top:7%;left:82%;width:4.5%')
      +'<div class="dnote lav" style="top:20%;left:9%;width:42%;--r:-4deg">building MEOW, in the open</div>'+pin('top:18.5%;left:27%;width:3.2%','lav')
      +'<div class="dnote" style="top:24%;left:54%;width:37%;--r:5deg">writing the Shimmerwhere canon</div>'+pin('top:22.5%;left:71%;width:3.2%')
      +'<div class="dnote pink" style="top:48%;left:13%;width:40%;--r:3deg">this cube, apparently</div>'+pin('top:46.5%;left:31%;width:3.2%','pink')
      +'<div class="dnote blue" style="top:52%;left:56%;width:34%;--r:-5deg">final-year cs, somehow</div>'+pin('top:50.5%;left:71%;width:3.2%')
      +'<span class="dstamp" style="top:82%;left:15%;--r:-5deg">mood: happy, floating</span></div>',
    /* 6 · lore · a little music player and personal canon */
    '<div class="dp">'+kick('06','lore','personal canon')
      +'<div class="dplayer" style="top:18%;left:9%;width:78%"><div class="dpl-bar"><span>now playing</span></div>'
      +'<div class="dpl-body"><b>slowdive</b><span>on repeat, obviously</span><div class="dpl-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>'
      +'<div class="dpl-ctrl"><span class="prev" aria-hidden="true"></span><button type="button" class="dpl-play" aria-label="play" aria-pressed="false"></button><span class="next" aria-hidden="true"></span></div>'
      +'<div class="dpl-prog"><span>1:12</span><div class="dpl-track"><em></em></div><span>3:38</span></div></div></div>'
      +'<ul class="dlist small" style="top:60%;left:9%;width:80%"><li>met computers at three: a beige desktop and a CRT</li><li>took apart PSPs to see where the magic lived</li><li>a Carrd and Neocities kid</li><li>one cat, several dependents, absolutely no authority</li></ul></div>',
    /* 7 · the end · quiet */
    '<div class="dp">'+kick('07','the end','for now')+spark('top:20%;left:18%;width:4.5%')
      +'<p class="dhand" style="top:28%;left:6%;width:88%;text-align:center;font-size:4.8cqw">that’s all, for now.</p>'
      +'<p class="dbody" style="top:44%;left:14%;width:72%;text-align:center">thank you for reading my diary. you’re officially the curious type.</p>'
      +'<p class="dhand" style="top:61%;left:38%;font-size:5.6cqw">— xayna</p>'+heart('top:62%;left:84%;width:5%')
      +satin('top:74%;left:40%;width:20%;--r:4deg')
      +'<p class="dpix" style="top:90%;left:10%;width:80%;text-align:center">p.s. there are three more worlds in this cube.</p></div>'
  ];
  var BACKLEAF='<div class="dp"><p class="dsmall" style="top:46%;left:0;width:100%;text-align:center">(the rest is still being written)</p></div>';
  var TABS=[['me',1,'pink'],['love',2,'lav'],['now',3,'star'],['lore',4,'blue']];

  function arrowSvg(d){ return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(d<0?'M15 5l-7 7 7 7':'M9 5l7 7-7 7')+'" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }
  var XSVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  var CHARM='<svg viewBox="0 0 30 34" aria-hidden="true"><defs><radialGradient id="pearlG" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#eee9f7"/><stop offset=".75" stop-color="#d9d1ec"/><stop offset="1" stop-color="#c7d6ea"/></radialGradient>'
    +'<linearGradient id="silverG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfcfe"/><stop offset=".45" stop-color="#b4bcc9"/><stop offset=".7" stop-color="#eef1f5"/><stop offset="1" stop-color="#9aa3b2"/></linearGradient></defs>'
    +'<rect x="11" y="0" width="8" height="7" rx="2" fill="none" stroke="url(#silverG)" stroke-width="1.8"/>'
    +'<path transform="translate(3 7)" d="'+HEART+'" fill="url(#pearlG)" stroke="url(#silverG)" stroke-width="1.6"/>'
    +'<path d="M9 13c1-2 3-3 5-2" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".9"/></svg>';

  var st={};
  function build(){
    var F=[[COVER,INSIDE],[PAGES[0],PAGES[1]],[PAGES[2],PAGES[3]],[PAGES[4],PAGES[5]],[PAGES[6],BACKLEAF]], N=F.length;
    var leaves=F.map(function(f,i){ return '<div class="leaf'+(i===0?' cover':'')+'" data-leaf="'+i+'">'
      +'<div class="pg front'+(i===0?' is-cover':'')+'"><span class="pshade"></span>'+f[0]+(i>0?'<span class="dpn r">'+(2*i-1)+'</span><span class="dear"></span>':'')+'</div>'
      +'<div class="pg back'+(i===0?' is-inside':'')+'"><span class="pshade"></span>'+f[1]+(i>0&&i<N-1?'<span class="dpn l">'+(2*i)+'</span>':'')+'</div></div>'; }).join('');
    var ring=function(){ return '<i></i><i></i><i></i>'; };
    var el=document.createElement('div'); el.className='diary';
    el.innerHTML='<div class="d-view"><div class="d-book" aria-label="xayna’s diary">'
      +'<div class="d-board" aria-hidden="true"></div>'
      +'<div class="d-tabs">'+TABS.map(function(t){ return '<button type="button" class="d-tab '+t[2]+'" data-spread="'+t[1]+'" aria-label="go to '+t[0]+'"><span>'+t[0]+'</span></button>'; }).join('')+'</div>'
      +leaves
      +'<div class="d-rings" aria-hidden="true"><span class="grp">'+ring()+'</span><span class="grp">'+ring()+'</span>'
        +'<span class="d-keychain"><i class="chain"></i><i class="pearl"></i><i class="pearl sm"></i><i class="starc"></i></span></div>'
      +'<div class="d-band" aria-hidden="true"><span class="d-charm">'+CHARM+'</span></div>'
      +'<span class="d-ribbon" aria-hidden="true"></span></div></div>'
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
    st.book.addEventListener('click',function(e){
      var tab=e.target.closest('.d-tab'); if(tab){ jump(+tab.dataset.spread); return; }
      if(e.target.closest('a,button')) return; var l=e.target.closest('.leaf'); if(!l) return;
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
    st.el.querySelectorAll('.d-tab').forEach(function(t){ t.classList.toggle('on',+t.dataset.spread===s); });
    var total=7, txt;
    if(st.v===0) txt='the diary is closed. tap the cover to open it.';
    else if(st.single) txt=st.v===1?'inside the cover':('page '+(st.v-1)+' of '+total);
    else txt=s===1?'inside the cover and page 1':(s===st.SP?'pages 6 and 7 of 7':'pages '+(2*s-2)+' and '+(2*s-1)+' of '+total);
    st.live.textContent=txt;
  }
  function later(fn,ms){ var t=setTimeout(fn,reduce?0:ms); st.timers.push(t); return t; }
  function bandOn(){ var b=st.book; return !b.classList.contains('band-off'); }
  function go(n){
    n=Math.max(0,Math.min(maxV(),n)); if(n===st.v) return;
    var s0=sp(st.v), s1=sp(n), b=st.book;
    /* the elastic band slides off first, then the cover opens */
    if(s0===0&&s1>0&&bandOn()){ b.classList.remove('band-back'); b.classList.add('band-off'); if(!reduce){ later(function(){ go(n); },780); return; } }
    if(s0!==s1){ var fwd=s1>s0, idx=fwd?s0:s1, l=st.leaves[idx];
      if(l){ l._moving=true; l.classList.remove('turning'); void l.offsetWidth; l.classList.add('turning'); l.style.zIndex=fwd?(300+idx):(300+st.N-idx); clearTimeout(l._t);
        l._t=later(function(){ l._moving=false; l.classList.remove('turning'); render(false); }, idx===0?1650:1000); } }
    st.v=n; render(false);
    /* once the cover is shut, the band slides back on */
    if(s1===0){ clearTimeout(b._f); b._f=later(function(){ if(sp(st.v)===0&&!bandOn()){ b.classList.remove('band-off'); b.classList.add('band-back'); } },1650); }
  }
  function jump(t){ if(st.single) t=2*t;
    (function step(){ if(st.v===t) return; var wait=(st.v===0&&bandOn())?1050:260; go(st.v+(t>st.v?1:-1)); later(step,wait); })(); }
  function closeBook(cb){
    (function step(){ var s=sp(st.v);
      if(s===0){ later(cb, bandOn()?0:2500); return; }
      go(st.single?(s-1===0?0:2*(s-1)):s-1); later(step,s===1?0:220); })();
  }

  XK.objects.about={
    label:'xayna’s diary',
    size:function(vw,vh){ st.single=vw<640;
      var P=st.single?Math.min(vw*.8,(vh-170)*A,420):Math.min((vw-240)/2,(vh-130)*A,440);
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
    beforeClose:function(cb){ if(st.v>0||!bandOn()) closeBook(cb); else cb(); },
    unmount:function(){ st.timers.forEach(clearTimeout); st={}; }
  };
})();
