/* xaynakive.com · the page: theme, atmosphere, sections, Ocean, glasstapes */
(function(){
  "use strict";
  var XK = window.XK, root = document.documentElement;
  var reduce = XK.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = XK.esc = function(s){ return String(s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var $ = function(id){ return document.getElementById(id); };
  XK.announce = function(t){ var a=$('announce'); if(a){ a.textContent=''; setTimeout(function(){ a.textContent=t; },30); } };
  XK.store = {
    get:function(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
    set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };

  /* ── theme (persists across pages) ── */
  var theme=$('theme');
  function syncTheme(){ var light=root.getAttribute('data-theme')==='light'; theme.setAttribute('aria-checked',light?'true':'false'); }
  syncTheme();
  theme.addEventListener('click',function(){ var next=root.getAttribute('data-theme')==='light'?'dark':'light'; root.setAttribute('data-theme',next); XK.store.set('xayna_theme',next); syncTheme(); });

  /* ── menu ── */
  var menuBtn=$('menuBtn'), navLinks=$('navLinks');
  function menu(open){ navLinks.classList.toggle('open',open); menuBtn.setAttribute('aria-expanded',open?'true':'false'); }
  menuBtn.addEventListener('click',function(e){ e.stopPropagation(); menu(!navLinks.classList.contains('open')); });
  navLinks.addEventListener('click',function(e){ if(e.target.closest('a')) menu(false); });
  document.addEventListener('click',function(e){ if(!navLinks.contains(e.target)&&e.target!==menuBtn) menu(false); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&navLinks.classList.contains('open')){ menu(false); menuBtn.focus(); } });

  /* ── the bow: draws as you leave the mythirium, rewinds on the way back ── */
  var path=$('bowPath'), len=path.getTotalLength();
  path.style.strokeDasharray=len; path.style.strokeDashoffset=reduce?0:len;
  if(!reduce){ var onBow=function(){ var p=Math.min(scrollY/(innerHeight*.92),1); path.style.strokeDashoffset=len*(1-p); }; addEventListener('scroll',onBow,{passive:true}); onBow(); }

  /* ── rain + stars ── */
  var cv=$('rain'), ctx=cv.getContext('2d'), sv=$('stars'), sx=sv.getContext('2d'), W,H,DPR=Math.min(devicePixelRatio||1,2), drops=[], stars=[];
  function size(){ W=innerWidth; H=innerHeight; [cv,sv].forEach(function(c){ c.width=W*DPR; c.height=H*DPR; });
    ctx.setTransform(DPR,0,0,DPR,0,0); sx.setTransform(DPR,0,0,DPR,0,0);
    stars=[]; var n=Math.round(W*H/9000); for(var i=0;i<n;i++) stars.push({x:Math.random()*W,y:Math.random()*H*.85,r:Math.random()*1.1+.25,p:Math.random()*6.28,s:.4+Math.random()*1.2}); }
  size(); addEventListener('resize',size);
  for(var i=0;i<(innerWidth<600?70:115);i++) drops.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,len:11+Math.random()*13,v:2.4+Math.random()*3.2});
  function rcol(a){ return root.getAttribute('data-theme')==='light'?'rgba(96,110,142,'+a+')':'rgba(196,204,236,'+a+')'; }
  var hidden=false; document.addEventListener('visibilitychange',function(){ hidden=document.hidden; if(!hidden&&!reduce) requestAnimationFrame(frame); });
  function frame(t){
    if(hidden) return;
    ctx.clearRect(0,0,W,H); ctx.lineWidth=1.3; ctx.lineCap='round';
    for(var i=0;i<drops.length;i++){ var d=drops[i], dx=d.len*.14, mx=d.x+dx*.5, my=d.y+d.len*.5;
      ctx.strokeStyle=rcol(.09); ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(mx,my); ctx.stroke();
      ctx.strokeStyle=rcol(.28); ctx.beginPath(); ctx.moveTo(mx,my); ctx.lineTo(d.x+dx,d.y+d.len); ctx.stroke();
      if(!reduce){ d.y+=d.v; d.x+=.28; if(d.y>H){ d.y=-d.len; d.x=Math.random()*W-10; } } }
    sx.clearRect(0,0,W,H);
    if(root.getAttribute('data-theme')!=='light'){ var tt=(t||0)/1000;
      for(var j=0;j<stars.length;j++){ var s=stars[j], a=reduce?.6:(.35+.45*Math.sin(tt*s.s+s.p)); sx.fillStyle='rgba(226,230,250,'+a.toFixed(3)+')'; sx.beginPath(); sx.arc(s.x,s.y,s.r,0,6.283); sx.fill(); } }
    if(!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if(reduce){ new MutationObserver(function(){ frame(0); }).observe(root,{attributes:true,attributeFilter:['data-theme']}); addEventListener('resize',function(){ frame(0); }); }

  /* ── experience + footer links ── */
  $('xpList').innerHTML=XK.EXPERIENCE.map(function(x){ return '<li class="xprow reveal"><div class="xp-when">'+esc(x[0])+'</div><div class="xp-what"><h3>'+esc(x[1])+'</h3><span class="role-sub">'+esc(x[2])+'</span><p>'+esc(x[3])+'</p></div></li>'; }).join('');
  $('socials').innerHTML=XK.LINKS.map(function(l){ var ext=l.url.indexOf('http')===0; return '<li><a href="'+l.url+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+l.name+'</a></li>'; }).join('');

  /* ── reveal on scroll ── */
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  document.querySelectorAll('.win-body').forEach(function(el){ el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%'); el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%'); }); });

  /* ── contact form → the visitor's mail app (works with no backend) ── */
  $('sigForm').addEventListener('submit',function(e){ e.preventDefault();
    var n=$('sfName').value.trim(), em=$('sfEmail').value.trim(), topic=$('sfTopic').value.trim(), msg=$('sfMsg').value.trim(), note=$('sfNote');
    note.classList.remove('ok');
    if(!n||!em||!msg){ note.textContent='name, email and a message first, please.'; (!n?$('sfName'):!em?$('sfEmail'):$('sfMsg')).focus(); return; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){ note.textContent='that email looks a little lost.'; $('sfEmail').focus(); return; }
    var subj=encodeURIComponent('signal from '+n+(topic?' · '+topic:'')), body=encodeURIComponent('from: '+n+' <'+em+'>\nwhat are we making: '+(topic||'-')+'\n\n'+msg);
    note.classList.add('ok'); note.textContent='opening your mail app…';
    location.href='mailto:meow@xaynakive.com?subject='+subj+'&body='+body;
  });

  /* ═══ Ocean: an old little soul who watches the shoreline ═══ */
  var oBody=$('oceanBody'), oQuick=$('oceanQuick'), oForm=$('oceanForm'), oIn=$('oceanIn'), oStarted=false, oBusy=false;
  function oScroll(){ requestAnimationFrame(function(){ oBody.scrollTop=oBody.scrollHeight; }); }
  function oBub(html,who){ var d=document.createElement('div'); d.className='obub '+who; d.innerHTML=html; oBody.appendChild(d); oScroll(); }
  function oCmd(q){ var d=document.createElement('div'); d.className='ocmd'; d.innerHTML='<span class="p">cat@ocean</span>:~$ '+esc(q.toLowerCase()); oBody.appendChild(d); oScroll(); }
  function oSay(lines,after){ oBusy=true; var i=0; (function next(){ if(i>=lines.length){ oBusy=false; if(after) after(); return; }
    var t=document.createElement('div'); t.className='obub them typing'; t.setAttribute('aria-hidden','true'); t.innerHTML='<i></i><i></i><i></i>'; oBody.appendChild(t); oScroll();
    setTimeout(function(){ t.remove(); oBub(lines[i],'them'); i++; setTimeout(next,220); }, reduce?60:(520+Math.random()*420)); })(); }
  var BRANCHES=[
    { q:'i want to collaborate', a:['good. ordinary ideas have been getting far too comfortable.','tell me what you’re building: a website, a product, or something that doesn’t have a sensible category yet.','leave the details in the form. xayna will find them when the sun goes down.'] },
    { q:'i’m hiring', a:['understood. switching to my professional voice.','xayna works where interface design, frontend engineering, machine learning and strange ideas overlap.','send the role, the interesting problem and a way to reach you. she reads every transmission.'] },
    { q:'i found a bug', a:['that is unfortunate. for the bug, specifically.','tell us what happened, what you expected, and which device or browser witnessed the incident.','xayna will investigate. eventually, someone will be held accountable.'] },
    { q:'i just like the cats', a:['a completely valid reason to be here.','most of them have jobs, lore, unresolved personal histories, or all three.','the cube contains four doors. curiosity is usually rewarded.'] }
  ];
  /* public lore only. Ocean never knows, and never reveals, anything private. */
  var LORE=[
    { k:['who','xayna','about','yourself','name'], a:'xayna, also xaynakive: a design engineer and final-year computer science student. she builds intelligent systems and strange interfaces, usually with cats.' },
    { k:['real name','legal','full name','phone','number','address','live','where','age','old','private','school'], a:'that stays off the shoreline. online she’s xayna, and that’s the whole name i know.', priv:1 },
    { k:['meow','builder','editor'], a:'MEOW is her open-source website builder: pick a layout, colours and fonts like dressing up a character, then export a real site. source is on github.' },
    { k:['purrsona'], a:'PurrSona reads “cat energy” and sorts it into five feline archetypes. a gradient-boosting model, exported with ONNX.' },
    { k:['meowtm','atm','assembly','x86'], a:'MeowTM is a 16-bit ATM in x86 assembly, so the cats can reach their treat fund in an emergency.' },
    { k:['breeze','emotion','nlp'], a:'Breeze listens for intent: rant, struggle, ask or noise. ~100k samples, six models and a deterministic safety layer.' },
    { k:['shimmerwhere','lore','universe','world'], a:'Shimmerwhere is the orbit everything here belongs to: a fictional universe with houses, districts and a growing canon.' },
    { k:['mythirium','cube'], a:'the cube at the top of the page. four faces: a diary, a bookshelf, a handheld and a phone. open all four and something happens.' },
    { k:['hire','hiring','job','role','work','available','remote','cv','resume'], a:'she’s open to remote roles worldwide: design engineering, frontend, applied AI/ML, cybersecurity. the CV is in the nav, and the form beside me reaches her.' },
    { k:['skill','stack','tech','know','language'], a:'HTML, CSS and JavaScript without a framework, Python and scikit-learn, NLP, x86 assembly, Supabase, and the human kind: community, pitching, documentation. the toolkit face has proof for each.' },
    { k:['experience','hash','fellow','intern','call connect'], a:'Hash Engineering fellow (one of 16 from 150+), AI/ML intern at Call Connect AI, founder of PixelFiles and CS Network, and campus lead at Cyberster.' },
    { k:['glasstapes','guestbook','diary'], a:'glasstapes is just below: write a page, it folds into an envelope and drops into the mailbox.' },
    { k:['ocean','you'], a:'i’m Ocean. an old little soul. i watch the shoreline while xayna builds things after sunset.' },
    { k:['cat','cats'], a:'one cat, several dependents, absolutely no authority. we’re all cats here, technically.' },
    { k:['music','listen','slowdive','song'], a:'slowdive, on repeat. it’s in the diary too.' },
    { k:['contact','email','reach','talk'], a:'meow@xaynakive.com, or the form right beside me.' },
    { k:['love','like','favourite','favorite'], a:'cats, long drives after dark, icy weather, blue tulips and black roses, Sierra Blue phones for an unreasonable reason, golden hour. and, suspiciously, herself.' }
  ];
  function oAnswer(q){ var s=q.toLowerCase(), best=null, score=0;
    LORE.forEach(function(e){ var n=0; e.k.forEach(function(k){ if(s.indexOf(k)>=0) n+=k.length+(e.priv?20:0); }); if(n>score){ score=n; best=e; } });
    return best?best.a:'the tide didn’t bring me anything on that. try asking about her work, the cube, the cats, or how to reach her.'; }
  function oReady(){ oQuick.innerHTML='';
    BRANCHES.forEach(function(b){ var el=document.createElement('button'); el.type='button'; el.className='oq'; el.textContent=b.q;
      el.addEventListener('click',function(){ if(oBusy) return; oCmd(b.q); oBub(esc(b.q),'me'); oQuick.innerHTML=''; oSay(b.a,oReady); });
      oQuick.appendChild(el); }); }
  function oStart(){ if(oStarted) return; oStarted=true; oSay(['hello. i’m Ocean.','i watch the shoreline while xayna builds things after sunset.','what brought you into this part of the internet?'],oReady); }
  var oIO=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ oStart(); oIO.disconnect(); } },{threshold:.25}); oIO.observe(oBody);
  oIn.addEventListener('input',function(){ oForm.classList.toggle('typing',!!oIn.value); });
  oForm.addEventListener('submit',function(e){ e.preventDefault(); var q=oIn.value.trim(); if(!q||oBusy) return; oStart(); oIn.value=''; oForm.classList.remove('typing');
    oCmd(q); oBub(esc(q),'me'); oSay([esc(oAnswer(q))]); });

  /* ═══ glasstapes ═══ */
  var GK='glasstapes_entries_v2', gtWin=$('gtWin'), gtList=$('gtList'), gtForm=$('gtForm'), gtText=$('gtText'), gtNick=$('gtNick'), gtToast=$('gtToast'), gtEnv=$('gtEnvelope'), sending=false;
  var SEED=[{ id:'seed', nick:'xayna', text:'welcome to glasstapes. leave a page, a dream, a hello. whoever drifts by next will find it.', ts:Date.UTC(2026,5,21,19,40) }];
  function gtLoad(){ var a=null; try{ a=JSON.parse(XK.store.get(GK)); }catch(e){} return (a&&a.length)?a:SEED.slice(); }
  function when(ts){ var d=new Date(ts); return d.toLocaleDateString(undefined,{month:'short',day:'numeric'})+' · '+d.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'}); }
  function gtRender(){ var a=gtLoad(); $('gtCount').textContent=a.length+(a.length===1?' page so far':' pages so far');
    gtList.innerHTML=a.slice().reverse().map(function(p){ return '<li><button type="button" class="gt-page" data-id="'+esc(p.id)+'"><span class="who"><span>'+esc(p.nick)+'</span><time datetime="'+new Date(p.ts).toISOString()+'">'+esc(when(p.ts))+'</time></span><span class="msg">'+esc(p.text)+'</span></button></li>'; }).join(''); }
  gtRender();
  gtText.addEventListener('input',function(){ $('gtLeft').textContent=240-gtText.value.length; });
  function toast(t){ gtToast.textContent=t; gtToast.classList.remove('show'); void gtToast.offsetWidth; gtToast.classList.add('show'); }
  gtForm.addEventListener('submit',function(e){ e.preventDefault(); if(sending) return;
    var t=gtText.value.trim(); if(!t){ toast('write a page first'); gtText.focus(); return; }
    var entry={ id:'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6), nick:gtNick.value.trim()||'a stranger', text:t, ts:Date.now() };
    var a=gtLoad(); a.push(entry); XK.store.set(GK,JSON.stringify(a.slice(-60)));
    function finish(){ gtText.value=''; gtNick.value=''; $('gtLeft').textContent='240'; gtRender(); toast('sealed & delivered'); gtWin.classList.remove('sending'); sending=false; XK.announce('your page was sealed and delivered to the mailbox'); }
    if(reduce){ finish(); return; }
    sending=true;
    var mb=gtWin.querySelector('.gt-mailbox').getBoundingClientRect(), wr=gtWin.getBoundingClientRect(), er=gtEnv.getBoundingClientRect();
    gtEnv.style.setProperty('--ex',((mb.left+mb.width/2)-(er.left+er.width/2))+'px'); gtEnv.style.setProperty('--ey',((mb.top+mb.height*.45)-(er.top+er.height/2))+'px');
    gtWin.classList.add('sending');
    setTimeout(function(){ gtWin.classList.add('delivered'); setTimeout(function(){ gtWin.classList.remove('delivered'); },1300); },1750);
    setTimeout(finish,2050);
  });
  /* reading a page: an envelope opens to reveal the card */
  var lLayer=$('letterLayer'), lastPage=null;
  gtList.addEventListener('click',function(e){ var b=e.target.closest('.gt-page'); if(!b) return; var p=gtLoad().filter(function(x){ return x.id===b.dataset.id; })[0]; if(!p) return;
    lastPage=b; $('letterWho').textContent=p.nick; $('letterText').textContent=p.text; $('letterWhen').textContent=when(p.ts);
    lLayer.hidden=false; document.body.style.overflow='hidden'; setTimeout(function(){ $('letterClose').focus(); }, reduce?0:700); });
  function lClose(){ lLayer.hidden=true; document.body.style.overflow=''; if(lastPage) lastPage.focus(); }
  $('letterClose').addEventListener('click',lClose);
  lLayer.addEventListener('click',function(e){ if(e.target===lLayer) lClose(); });
  document.addEventListener('keydown',function(e){ if(!lLayer.hidden){ if(e.key==='Escape') lClose(); if(e.key==='Tab'){ e.preventDefault(); $('letterClose').focus(); } } });

  /* ── the curiosity reward ── */
  var CAT_SVG='<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M52 30c9 0 10-9 6-13" stroke="#b9bccb" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="34" cy="28" rx="20" ry="11" fill="#d9dbe6"/><path d="M20 36v7M28 37v6M40 37v6M48 35v7" stroke="#c4c7d6" stroke-width="4" stroke-linecap="round"/><circle cx="15" cy="21" r="10" fill="#e3e5ee"/><path d="M7 16l1-10 7 6zM17 12l7-6 1 10z" fill="#e3e5ee"/><path d="M9 14l.6-5 3.6 3zM19 12l4-3 .5 5z" fill="#f1c9d4"/><circle cx="11.5" cy="21" r="1.3" fill="#3a4050"/><circle cx="18.5" cy="21" r="1.3" fill="#3a4050"/><path d="M14 24h2l-1 1z" fill="#e79bb0"/></svg>';
  XK.secret=function(){
    XK.store.set('xayna_curious','1'); $('curious').hidden=false;
    if(!reduce){ var c=document.createElement('div'); c.className='secret-cat'; c.innerHTML=CAT_SVG; document.body.appendChild(c); setTimeout(function(){ c.remove(); },5200); }
    var t=document.createElement('div'); t.className='secret-toast'; t.setAttribute('role','status'); t.textContent='you opened every world. you are, officially, the curious type.'; document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('go'); }); setTimeout(function(){ t.classList.remove('go'); },5200); setTimeout(function(){ t.remove(); },5800);
  };
  if(XK.store.get('xayna_curious')) $('curious').hidden=false;
})();
