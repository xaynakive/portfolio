/* right face · links → a phone
   it turns on to a home screen. each app opens a version of xayna's profile
   designed for that platform, with the real link waiting at the bottom. */
(function(){
  "use strict";
  var XK=window.XK, esc=XK.esc, reduce=XK.reduce, CDN=XK.CDN;
  XK.objects=XK.objects||{};
  var L={}; XK.LINKS.forEach(function(l){ L[l.id]=l; });

  var GLYPH={
    github:'<path d="M12 5h8M14 5v8l-6 11a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-11V5"/><path d="M10.5 20h11"/>',
    linkedin:'<rect x="5" y="10" width="22" height="15" rx="3"/><path d="M12 10V7.5A1.5 1.5 0 0 1 13.5 6h5A1.5 1.5 0 0 1 20 7.5V10M5 16h22"/>',
    instagram:'<rect x="5" y="7" width="22" height="18" rx="5"/><circle cx="16" cy="16" r="4.6"/><circle cx="22.4" cy="11.4" r="1"/>',
    x:'<path d="M16 13v14M11 27h10M16 13l-4-8M16 13l4-8"/><path d="M8.5 9.5a8 8 0 0 0 0 9M23.5 9.5a8 8 0 0 1 0 9"/>',
    email:'<rect x="5" y="8" width="22" height="16" rx="3"/><path d="M6 10l10 8 10-8"/>',
    discord:'<path d="M21 6a10 10 0 1 0 5 16A8 8 0 0 1 21 6z"/><path d="M8 7l.6 1.4L10 9l-1.4.6L8 11l-.6-1.4L6 9l1.4-.6z"/>'
  };
  GLYPH.cv='<path d="M9 4h10l6 6v18H9z"/><path d="M19 4v6h6M13 16h8M13 20h8M13 24h5"/>';
  GLYPH.tapes='<rect x="4" y="9" width="24" height="15" rx="3"/><circle cx="11" cy="16.5" r="3"/><circle cx="21" cy="16.5" r="3"/><path d="M11 13.5h10M9 24l2-3h10l2 3"/>';
  GLYPH.diary='<path d="M8 5h15a2 2 0 0 1 2 2v20H10a2 2 0 0 1-2-2z"/><path d="M8 25a2 2 0 0 1 2-2h15M21 5v10l-2.5-2-2.5 2V5"/>';
  GLYPH.archive='<rect x="5" y="6" width="5" height="21" rx="1"/><rect x="11.5" y="9" width="5" height="18" rx="1"/><path d="M19 10.5l4.6-1.4 4.4 16.4-4.6 1.3z"/>';
  GLYPH.toolkit='<rect x="6" y="3" width="20" height="12" rx="2.5"/><rect x="6" y="17" width="20" height="12" rx="2.5"/><path d="M10 23h4M12 21v4M20 22.5h.01M22.5 24h.01"/>';
  GLYPH.ocean='<path d="M3 13c3-3 6-3 9 0s6 3 9 0 5-3 8-1M3 20c3-3 6-3 9 0s6 3 9 0 5-3 8-1"/>';
  function glyph(id){ return '<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+GLYPH[id]+'</svg>'; }
  var APPS=['github','linkedin','instagram','x','email','discord'];
  var LABEL={github:'github',linkedin:'linkedin',instagram:'instagram',x:'x',email:'mail',discord:'discord'};
  function ava(cls){ return '<span class="p-ava '+(cls||'')+'"><img src="'+CDN+'pfp.png" alt="" onerror="this.classList.add(\'gone\')"/></span>'; }
  function cta(id,txt){ var l=L[id], ext=l.url.indexOf('http')===0; return '<a class="metal p-cta" href="'+l.url+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+txt+'</a>'; }

  var VIEWS={
    github:function(){ var repos=[['meow','a guided website builder that exports real sites','JavaScript','#e8d36a'],['purrsona','sorts cat energy into five archetypes','Python','#6f9fd8'],['meowtm','a 16-bit ATM for the treat fund','Assembly','#8a7bb0'],['mythirium','the glass cube on xaynakive.com','HTML','#e7936f'],['techpolaroids','a dev-in-public polaroid diary','CSS','#9b7ad8'],['portal-engine','z-axis navigation through layers','JavaScript','#e8d36a']];
      return '<div class="v-gh"><div class="gh-top">'+ava('sq')+'<div><b>xayna</b><span>xaynakive</span></div></div>'
        +'<p class="gh-bio">i build intelligent systems and strange interfaces, usually with cats.</p>'
        +'<p class="gh-meta">design engineer · open source · most active after sunset</p>'
        +'<h4>pinned</h4><ul class="gh-repos">'+repos.map(function(r){ return '<li><b>'+r[0]+'</b><span>'+esc(r[1])+'</span><em><i style="background:'+r[3]+'"></i>'+r[2]+'</em></li>'; }).join('')+'</ul>'
        +cta('github','open github ↗')+'</div>'; },
    linkedin:function(){ return '<div class="v-li"><div class="li-banner"></div>'+ava('ring')+'<b class="li-name">xayna</b>'
        +'<p class="li-head">design engineer · frontend, applied AI/ML and cybersecurity</p><span class="li-open">open to remote roles worldwide</span>'
        +'<h4>experience</h4><ul class="li-xp">'+XK.EXPERIENCE.slice(0,5).map(function(x){ return '<li><i></i><div><b>'+esc(x[1])+'</b><span>'+esc(x[2])+'</span><em>'+esc(x[0])+'</em></div></li>'; }).join('')+'</ul>'
        +cta('linkedin','open linkedin ↗')+'</div>'; },
    instagram:function(){ var tiles=['cat2.png','catttttttttttt.png','cat.png','toolkit.jpg','pfp.png','meowtm.png','cat2.png','cat.png','catttttttttttt.png'];
      var hl=[['cats','#f4d9df'],['drives','#a5bfd8'],['golden hour','#f5c98a'],['tulips','#7d9be0']];
      return '<div class="v-ig"><div class="ig-top">'+ava('ig')+'<div class="ig-id"><b>xaynakive</b><span>xayna</span></div></div>'
        +'<p class="ig-bio">ma propre muse.<br>a story in cats &amp; code<br>blue tulips &amp; black roses</p>'
        +'<ul class="ig-hl">'+hl.map(function(h){ return '<li><i style="--c:'+h[1]+'"></i><span>'+h[0]+'</span></li>'; }).join('')+'</ul>'
        +'<div class="ig-grid">'+tiles.map(function(t,i){ return '<span class="vhs t'+(i%4)+'"><img src="'+CDN+t+'" alt="" loading="lazy" onerror="this.classList.add(\'gone\')"/></span>'; }).join('')+'</div>'
        +cta('instagram','open instagram ↗')+'</div>'; },
    x:function(){ var posts=['i build intelligent systems and strange interfaces. usually with cats.','there are other things here: unfinished systems, abandoned names, and prototypes still breathing.','most active after sunset.','that’s all, for now.'];
      return '<div class="v-x"><div class="x-banner"></div>'+ava('ring')+'<b class="x-name">xayna</b><span class="x-h">@xaynakive</span>'
        +'<p class="x-bio">design engineer. the signal tower of Shimmerwhere.</p><h4>pinned thoughts</h4>'
        +'<ul class="x-posts">'+posts.map(function(p){ return '<li>'+ava('sm')+'<div><b>xayna <span>@xaynakive</span></b><p>'+esc(p)+'</p></div></li>'; }).join('')+'</ul>'
        +cta('x','open x ↗')+'</div>'; },
    email:function(){ return '<form class="v-mail" id="pMail"><div class="m-row"><span>to</span><b>meow@xaynakive.com</b></div>'
        +'<label class="m-row"><span>subject</span><input id="pSubj" type="text" placeholder="a signal from the phone" maxlength="80"/></label>'
        +'<label class="sr-only" for="pBody">message</label><textarea id="pBody" placeholder="say the thing" rows="7"></textarea>'
        +'<button class="metal p-cta" type="submit">open my mail app ↗</button></form>'; },
    discord:function(){ return '<div class="v-dc"><div class="dc-banner"></div><div class="dc-ava">'+ava('dc')+'<i class="dc-st"></i></div>'
        +'<div class="dc-card"><b>xayna</b><span>xaynakive</span><p class="dc-status">online, after sunset</p>'
        +'<h4>about me</h4><p>design engineer. cats, lore and 3am interfaces. Ocean says hi.</p>'
        +'<h4>roles</h4><ul class="dc-roles"><li style="--c:#a5bfd8">design engineer</li><li style="--c:#f4afc4">cat person</li><li style="--c:#d8cdea">lore keeper</li></ul></div>'
        +cta('discord','open discord ↗')+'</div>'; }
  };

  function app(id){ return '<button type="button" class="ph-app-ic" data-app="'+id+'" aria-label="'+L[id].name+', '+L[id].place+'"><span class="ic">'+glyph(id)+'</span><span class="lb">'+LABEL[id]+'</span></button>'; }
  function dock(g,face,name){ return '<button type="button" class="ph-app-ic" data-face="'+face+'" aria-label="open '+name+'"><span class="ic">'+glyph(g)+'</span></button>'; }
  var WALL='<svg viewBox="0 0 100 206" preserveAspectRatio="xMidYMid slice"><defs>'
    +'<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="s1"/><stop offset=".55" class="s2"/><stop offset="1" class="s3"/></linearGradient>'
    +'<linearGradient id="heathG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9a4d6"/><stop offset="1" stop-color="#8f78bd"/></linearGradient>'
    +'<pattern id="speck" width="3" height="2.4" patternUnits="userSpaceOnUse"><circle cx=".5" cy=".5" r=".32" fill="#d8c3ea"/><circle cx="2" cy="1.5" r=".28" fill="#7d65ad"/><circle cx="1.3" cy="2.1" r=".2" fill="#e6d4f0"/></pattern>'
    +'<filter id="haze"><feGaussianBlur stdDeviation=".6"/></filter></defs>'
    +'<rect width="100" height="206" fill="url(#skyG)"/>'
    +'<path d="M0 74c14-6 26-4 40-7s30-6 60 0v20H0z" fill="#aab4cd" opacity=".75" filter="url(#haze)"/>'
    +'<path d="M0 84c20-5 40-3 58-6s28-2 42 1v14H0z" fill="#b8a9d0"/>'
    +'<path d="M0 92c24-4 46-2 64-4s26 1 36 3v18H0z" fill="#9fb59a" opacity=".9"/>'
    +'<path d="M0 104c30-5 60-3 100 1v102H0z" fill="url(#heathG)"/><path d="M0 104c30-5 60-3 100 1v102H0z" fill="url(#speck)" opacity=".8"/>'
    +'<path d="M0 150c26-6 60-6 100 0v56H0z" fill="#8a72b6" opacity=".55"/><path d="M0 150c26-6 60-6 100 0v56H0z" fill="url(#speck)" opacity=".9"/>'
    +'<rect width="100" height="206" fill="url(#skyG)" opacity=".12"/></svg>';
  function build(){
    var el=document.createElement('div'); el.className='phone off';
    el.innerHTML='<span class="ph-btn act" aria-hidden="true"></span><span class="ph-btn vu" aria-hidden="true"></span><span class="ph-btn vd" aria-hidden="true"></span><span class="ph-btn pw" aria-hidden="true"></span>'
      +'<div class="ph-screen"><span class="ph-island" aria-hidden="true"></span>'
      +'<div class="ph-status" aria-hidden="true"><b class="ph-time"></b><span class="ph-icons"><i class="sig"><i></i><i></i><i></i><i></i></i><i class="bat"><i></i></i></span></div>'
      +'<div class="ph-boot" aria-hidden="true"><svg viewBox="0 0 64 54"><path d="M10 22L8 5C8 3 10 2 12 3L24 13C28 12 36 12 40 13L52 3C54 2 56 3 56 5L54 22C58 27 60 32 60 36C60 47 48 52 32 52C16 52 4 47 4 36C4 32 6 27 10 22z" fill="none" stroke="#e8eef7" stroke-width="2"/></svg></div>'
      +'<div class="ph-home"><div class="ph-wall" aria-hidden="true">'+WALL+'</div>'
        +'<div class="ph-grid">'
          +'<div class="w w-weather" style="grid-area:1/1/3/3" aria-label="weather in Shimmerwhere: 3 degrees, icy"><b class="w-loc">Shimmerwhere <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M11 1L1 5.5l4.5 1.2L6.8 11z" fill="currentColor"/></svg></b><span class="w-temp">3°</span>'
            +'<span class="w-cloud" aria-hidden="true"></span><span class="w-sub">icy, as preferred</span><span class="w-sub">H:5° L:-1°</span></div>'
          +app('github')+app('linkedin')+app('instagram')+app('x')
          +'<div class="w w-cal" style="grid-area:3/1/5/3"><b class="w-day"></b><span class="w-date"></span><span class="w-next">tonight</span><span class="w-evt">building MEOW<br><em>after sunset · the desk</em></span></div>'
          +app('email')+app('discord')
          +'<a class="ph-app-ic" href="resume/" aria-label="CV, opens the résumé"><span class="ic">'+glyph('cv')+'</span><span class="lb">cv</span></a>'
          +'<button type="button" class="ph-app-ic" data-goto="#glasstapes" aria-label="glasstapes, on this page"><span class="ic">'+glyph('tapes')+'</span><span class="lb">glasstapes</span><i class="badge" aria-hidden="true"></i></button>'
          +'<button type="button" class="w w-np" style="grid-area:5/1/6/5" aria-pressed="false" aria-label="play slowdive"><span class="orb" aria-hidden="true"></span><span class="np-t"><b>slowdive</b><em>on repeat, obviously</em><span class="np-bar" aria-hidden="true"><i></i></span><span class="np-tap">tap to play</span></span></button>'
        +'</div>'
        +'<span class="ph-search" aria-hidden="true"><svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>search</span>'
        +'<div class="ph-dock">'+dock('diary','about','the diary')+dock('archive','archive','the archive')+dock('toolkit','toolkit','the toolkit')
          +'<button type="button" class="ph-app-ic" data-goto="#signal" aria-label="talk to Ocean"><span class="ic">'+glyph('ocean')+'</span></button></div></div>'
      +'<div class="ph-view" hidden><div class="ph-vbar"><button type="button" class="ph-back" aria-label="back to the home screen"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>home</button><b class="ph-vtitle"></b></div><div class="ph-vbody"></div></div>'
      +'<button type="button" class="ph-bar" aria-label="go home"></button></div>'
      +'<button type="button" class="metal ph-close" aria-label="close the phone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>';
    return el;
  }
  var st={};
  function clock(){ if(!st.el) return; var d=new Date(), t=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);
    st.el.querySelector('.ph-time').textContent=t;
    st.el.querySelector('.w-day').textContent=d.toLocaleDateString('en',{weekday:'long'}).toUpperCase(); st.el.querySelector('.w-date').textContent=d.getDate(); }
  function openApp(id,from){ var v=st.el.querySelector('.ph-view'); st.from=from; st.app=id;
    v.className='ph-view app-'+id; v.querySelector('.ph-vtitle').textContent=L[id].place; v.querySelector('.ph-vbody').innerHTML=VIEWS[id](); v.hidden=false;
    st.el.classList.add('in-app'); st.el.setAttribute('data-app',id); v.querySelector('.ph-vbody').scrollTop=0;
    if(id==='email'){ v.querySelector('#pMail').addEventListener('submit',function(e){ e.preventDefault(); var s=v.querySelector('#pSubj').value.trim()||'a signal from the phone', b=v.querySelector('#pBody').value;
      location.href='mailto:meow@xaynakive.com?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(b); }); }
    setTimeout(function(){ v.querySelector('.ph-back').focus({preventScroll:true}); }, reduce?0:260);
    st.api.announce(L[id].name+' profile. the button at the bottom opens the real page.'); }
  function home(){ if(!st.app) return false; var v=st.el.querySelector('.ph-view'); st.app=null; st.el.classList.remove('in-app'); st.el.removeAttribute('data-app');
    setTimeout(function(){ if(!st.app&&st.el) v.hidden=true; }, reduce?0:300); if(st.from) st.from.focus({preventScroll:true}); return true; }

  XK.objects.links={
    label:'the links, a phone',
    size:function(vw,vh){ var W=Math.min((vh-(vw<640?130:60))*.485,vw*.86,360); return { w:W, h:W/.485 }; },
    build:build,
    mount:function(el,api){ st={ el:el, api:api, app:null }; clock(); st.iv=setInterval(clock,15000);
      el.addEventListener('click',function(e){ var a=e.target.closest('.ph-app-ic'); if(a&&st.on){ openApp(a.dataset.app,a); return; }
        if(e.target.closest('.ph-back')||e.target.closest('.ph-bar')){ home(); return; }
        if(e.target.closest('.ph-close')){ api.close(); return; }
        var np=e.target.closest('.w-np'); if(np){ var on=np.getAttribute('aria-pressed')!=='true'; np.setAttribute('aria-pressed',on); np.setAttribute('aria-label',(on?'pause':'play')+' slowdive'); np.querySelector('.np-tap').textContent=on?'tap to pause':'tap to play'; return; }
        var f=e.target.closest('[data-face]'); if(f&&st.on){ var k=f.dataset.face; api.close(); setTimeout(function(){ XK.openFace(k); }, reduce?50:1900); return; }
        var g=e.target.closest('[data-goto]'); if(g&&st.on){ var h=g.dataset.goto; api.close(); setTimeout(function(){ var t=document.querySelector(h); if(t) t.scrollIntoView({behavior:reduce?'auto':'smooth'}); }, reduce?50:1800); } }); },
    resize:function(W,H){ if(st.el){ st.el.style.width=W+'px'; st.el.style.height=H+'px'; st.el.style.setProperty('--pw',W+'px'); } },
    onGrown:function(){ var el=st.el; if(reduce){ el.classList.remove('off'); st.on=true; return; }
      el.classList.remove('off'); el.classList.add('booting'); st.t=setTimeout(function(){ el.classList.remove('booting'); st.on=true; },1100); },
    initialFocus:function(){ return st.el&&st.el.querySelector('.ph-app-ic'); },
    back:home,
    unmount:function(){ clearInterval(st.iv); clearTimeout(st.t); st={}; }
  };
})();
