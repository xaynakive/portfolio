/* Mythirium · the cube
   a face lifts out at card size, flips in place, then grows into its object.
   the object IS the modal. closing runs the other way. */
(function(){
  "use strict";
  var XK=window.XK, reduce=XK.reduce, OBJ=XK.objects||{};
  var $=function(id){ return document.getElementById(id); };
  var cube=$('cube'), wrap=$('cubeWrap'), layer=$('objLayer'), card=$('objCard'), front=$('ocFront'), back=$('ocBack'), dim=$('objDim');
  var FACE_ANGLE={ about:0, toolkit:180, archive:90, links:-90 };

  /* ── spin: JS-driven so it can be steered into a face ── */
  var ROT=reduce?-24:0, spinning=!reduce, last=0, DPS=360/15000, hover=false;
  function loop(t){ var dt=last?Math.min(t-last,64):0; last=t; if(spinning&&!hover) ROT=(ROT+dt*DPS)%360; cube.style.transform='rotateY('+ROT+'deg)'; requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
  wrap.addEventListener('pointerenter',function(e){ if(e.pointerType==='mouse') hover=true; });
  wrap.addEventListener('pointerleave',function(){ hover=false; });
  function tweenRot(to,dur,cb){ var from=ROT, delta=(((to-from)%360)+540)%360-180, t0=null; spinning=false;
    if(!dur||Math.abs(delta)<.5){ ROT=to; cube.style.transform='rotateY('+ROT+'deg)'; cb&&cb(); return; }
    (function step(ts){ if(t0===null) t0=ts; var p=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-p,3); ROT=from+delta*e; if(p<1) requestAnimationFrame(step); else { ROT=to; cb&&cb(); } })(performance.now()); }

  var faces=[].slice.call(document.querySelectorAll('.face'));
  faces.forEach(function(f){
    f.setAttribute('tabindex','0'); f.setAttribute('role','button');
    f.addEventListener('click',function(){ open(f); });
    f.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(f); } });
    f.addEventListener('pointermove',function(e){ var r=f.getBoundingClientRect(); f.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%'); f.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%'); });
    f.addEventListener('focus',function(){ if(!isOpen){ hover=true; tweenRot(FACE_ANGLE[f.dataset.face],reduce?0:420); } });
    f.addEventListener('blur',function(){ hover=false; if(!isOpen) spinning=!reduce; });
  });
  document.querySelectorAll('[data-open-face]').forEach(function(b){ b.addEventListener('click',function(){
    var f=cube.querySelector('[data-face="'+b.dataset.openFace+'"]'); returnTo=b;
    document.getElementById('top').scrollIntoView({behavior:reduce?'auto':'smooth'}); setTimeout(function(){ open(f,b); }, reduce?0:650); }); });

  /* ── the object layer ── */
  var isOpen=false, busy=false, cur=null, key='', geo=null, returnTo=null, api=null, seen={};
  function bgInert(on){ document.querySelectorAll('nav, main, footer, .skip').forEach(function(el){ if(on) el.setAttribute('inert',''); else el.removeAttribute('inert'); }); }
  function stage(tf,ms,ease,cb){ card.style.transition=reduce?'none':('transform '+ms+'ms '+ease); card.style.transform=tf; clearTimeout(card._t); card._t=setTimeout(function(){ cb&&cb(); }, reduce?16:ms+30); }
  function T(tx,ty,s,r){ return 'translate('+tx.toFixed(2)+'px,'+ty.toFixed(2)+'px) scale('+s.toFixed(4)+') rotateY('+r+'deg)'; }

  function layout(){
    var vw=innerWidth, vh=innerHeight, sz=cur.size(vw,vh), W=Math.round(sz.w), H=Math.round(sz.h);
    card.style.width=W+'px'; card.style.height=H+'px'; card.style.left=Math.round((vw-W)/2)+'px'; card.style.top=Math.round((vh-H)/2)+'px';
    var f=cur.focus?cur.focus(W,H):{x:0,y:0,w:W,h:H};
    var ox=f.x+f.w/2, oy=f.y+f.h/2, origin=ox+'px '+oy+'px';
    card.style.transformOrigin=origin; back.style.transformOrigin=origin;
    front.style.setProperty('--fs',(Math.min(f.w,f.h)/200).toFixed(4)); front.style.left=f.x+'px'; front.style.top=f.y+'px'; front.style.width=f.w+'px'; front.style.height=f.h+'px';
    var cardPx=Math.min(vw<600?vw*.62:300, vh*.5);
    geo={ W:W, H:H, f:f, ox:ox, oy:oy, cx:(vw-W)/2+ox, cy:(vh-H)/2+oy, k:Math.min(1,cardPx/Math.max(f.w,f.h)) };
    if(cur.resize) cur.resize(W,H);
    return geo;
  }
  function faceT(face){ var r=face.getBoundingClientRect(), side=Math.min(geo.f.w,geo.f.h);
    return T(r.left+r.width/2-geo.cx, r.top+r.height/2-geo.cy, r.width/side, 0); }
  function squareClip(){ var side=Math.min(geo.f.w,geo.f.h), ix=(geo.f.w-side)/2, iy=(geo.f.h-side)/2, rad=14*side/200;
    return 'inset('+iy+'px '+ix+'px '+iy+'px '+ix+'px round '+rad+'px)'; }
  function midT(r){ var vw=innerWidth, vh=innerHeight; return T(vw/2-geo.cx, vh/2-geo.cy, geo.k, r); }

  function open(face,from){
    if(isOpen||busy||!face) return; var k=face.dataset.face, obj=OBJ[k]; if(!obj) return;
    busy=true; isOpen=true; cur=obj; key=k; returnTo=from||face; seen[k]=1;
    document.body.style.overflow='hidden'; bgInert(true); hover=false; wrap.classList.add('warm');
    tweenRot(FACE_ANGLE[k], reduce?0:480, function(){
      front.innerHTML=''; var slot=face.querySelector('.face-slot').cloneNode(true); front.appendChild(slot); front.className='oc-front face-'+k;
      back.innerHTML=''; var rootEl=obj.build(); back.appendChild(rootEl);
      card.setAttribute('data-face',k); card.setAttribute('aria-label',obj.label);
      layer.classList.add('on'); card.classList.remove('grown','settled');
      api={ close:close, card:card, root:rootEl, announce:XK.announce };
      if(obj.mount) obj.mount(rootEl,api);
      layout();
      front.style.transition='none'; front.style.clipPath=squareClip(); front.style.opacity='1';
      card.style.transition='none'; card.style.transform=faceT(face); void card.offsetWidth;
      face.classList.add('lifted'); dim.classList.add('on');
      front.style.transition=reduce?'none':'clip-path 440ms cubic-bezier(.3,.7,.3,1)';
      requestAnimationFrame(function(){
        front.style.clipPath='inset(0px round 14px)';
        stage(midT(0),440,'cubic-bezier(.3,.7,.3,1)',function(){                /* lift */
          stage(midT(180),720,'cubic-bezier(.45,.05,.25,1)',function(){         /* flip */
            card.classList.add('grown');
            stage(T(0,0,1,180),560,'cubic-bezier(.22,.61,.36,1)',function(){      /* grow */
              card.style.transition=''; card.classList.add('settled'); busy=false;
              if(obj.onGrown) obj.onGrown();
              var fe=obj.initialFocus&&obj.initialFocus(); (fe||card).focus({preventScroll:true});
              XK.announce(obj.label+' opened. press escape to step back out.');
              if(Object.keys(seen).length===4&&!XK.store.get('xayna_secret_seen')){ XK.store.set('xayna_secret_seen','1'); secretPending=true; }
            }); }); }); });
    });
  }
  var secretPending=false;
  function close(){
    if(!isOpen||busy) return; busy=true;
    var go=function(){ layout(); card.classList.remove('grown','settled');
      stage(midT(180),460,'cubic-bezier(.4,0,.2,1)',function(){
        stage(midT(0),640,'cubic-bezier(.45,.05,.25,1)',function(){
          var face=cube.querySelector('[data-face="'+key+'"]');
          dim.classList.remove('on'); front.style.transition=reduce?'none':'clip-path 420ms cubic-bezier(.45,0,.55,1)'; front.style.clipPath=squareClip();
          stage(faceT(face),420,'cubic-bezier(.45,0,.55,1)',function(){ finish(face); }); }); }); };
    if(cur.beforeClose) cur.beforeClose(go); else go();
  }
  function finish(face){
    if(cur.unmount) cur.unmount();
    face.classList.remove('lifted'); layer.classList.remove('on'); card.style.transition='none'; card.style.transform='none'; card.removeAttribute('data-face');
    front.innerHTML=''; back.innerHTML=''; document.body.style.overflow=''; bgInert(false); wrap.classList.remove('warm');
    isOpen=false; busy=false; cur=null; spinning=!reduce;
    var rt=returnTo; returnTo=null; if(rt&&rt.focus) rt.focus({preventScroll:true});
    if(secretPending){ secretPending=false; setTimeout(XK.secret,400); }
  }

  addEventListener('resize',function(){ if(isOpen&&!busy){ layout(); card.style.transition='none'; card.style.transform=T(0,0,1,180); } });
  document.addEventListener('keydown',function(e){
    if(!isOpen) return;
    if(busy){ if(e.key==='Tab') e.preventDefault(); return; }
    if(e.key==='Escape'){ e.preventDefault(); if(cur.back&&cur.back()) return; close(); return; }
    if(cur.keydown&&cur.keydown(e)) return;
    if(e.key==='Tab'){
      var f=[].filter.call(back.querySelectorAll('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])'),function(x){ return !x.disabled&&x.getClientRects().length&&getComputedStyle(x).visibility!=='hidden'; });
      if(!f.length){ e.preventDefault(); return; }
      var first=f[0], lastEl=f[f.length-1];
      if(f.indexOf(document.activeElement)<0){ e.preventDefault(); first.focus(); }
      else if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); lastEl.focus(); }
      else if(!e.shiftKey&&document.activeElement===lastEl){ e.preventDefault(); first.focus(); }
    }
  });
  dim.addEventListener('click',function(){ if(isOpen&&!busy) close(); });
  XK.openFace=function(k){ open(cube.querySelector('[data-face="'+k+'"]')); };
})();
