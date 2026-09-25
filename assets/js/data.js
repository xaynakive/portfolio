/* xaynakive.com · shared data
   every claim here points at something real. private details never live in this file. */
(function(){
  "use strict";
  var XK = window.XK = window.XK || {};
  XK.CDN = 'https://cdn.jsdelivr.net/gh/xaynakives/assets@main/';

  XK.LINKS = [
    { id:'github',    app:'lab',     place:'the laboratory',       name:'GitHub',    url:'https://github.com/xaynakive' },
    { id:'linkedin',  app:'office',  place:'the office',           name:'LinkedIn',  url:'https://www.linkedin.com/in/xaynakive' },
    { id:'instagram', app:'garden',  place:'the rose garden',      name:'Instagram', url:'https://instagram.com/xaynakive' },
    { id:'x',         app:'tower',   place:'the signal tower',     name:'X',         url:'https://x.com/xaynakive' },
    { id:'email',     app:'mailbox', place:'the mailbox',          name:'Email',     url:'mailto:meow@xaynakive.com' },
    { id:'discord',   app:'room',    place:'the after-hours room', name:'Discord',   url:'https://discord.com/users/1532118650012827954' }
  ];

  XK.EXPERIENCE = [
    ['2026 · now',  'Software Engineering Fellow', 'Hash Engineering · remote', 'One of 16 fellows chosen from 150+ applicants, building an app against an engineering brief in a remote, pull-request-driven team.'],
    ['2025 · now',  'AI/ML Intern', 'Call Connect AI · remote, UK', 'Built an NLP emotion-classification model for call-centre transcripts and stress-tested AI responses for reliability.'],
    ['2024 · now',  'Founder & Product Designer', 'PixelFiles', 'A retro/VHS-inspired template studio: 100+ slides and a first paying client won with a custom investor-pitch deck.'],
    ['2024 · now',  'Founder', 'CS Network', 'A 500+ member peer-learning community for computer science students.'],
    ['2025 · 2026', 'Founding Member, then Campus Lead', 'Cyberster', 'Completed the inaugural Batch 1 cybersecurity programme, then led the campus community.'],
    ['2019 · 2024', 'Web Designer & Developer', 'independent', 'Where it started: commissioned Carrd sites, hand-coded Neocities pages and early open-source web projects.']
  ];

  /* ── the archive: every project, its own book ──
     w = thickness, h = height (shelf units), c = cloth, t = title ink, ff = typeface.
     "does" marks a real project (what it does / why / where it is now);
     the rest keep their story fields. */
  XK.BOOKS = [
    { id:'shimmerwhere', title:'Shimmerwhere', shelf:'worlds', w:11, h:19, c:'#efe6d6', t:'#a8864a', ff:"'Italiana',serif", fs:2.7, foil:1,
      was:'a fictional universe', from:'wanting a place that stays', imagined:'houses, districts, a whole canon', happened:'the orbit everything else belongs to', status:'ongoing',
      links:[['wander','https://xaynakive.github.io/shimmerwhere']] },
    { id:'echoura', title:'Echoura', shelf:'worlds', w:6.2, h:17.4, c:'#f4d6c8', t:'#9a5b3f', ff:"'Pinyon Script',cursive", fs:2.3,
      was:'a cat-university site', from:'Shimmerwhere lore', imagined:'a whole campus for cats', happened:'in progress, slowly', status:'building' },
    { id:'catgloss', title:'Catgloss', shelf:'worlds', w:5.2, h:16.2, c:'#f3d3dc', t:'#b0476a', ff:"'Pacifico',cursive", fs:1.7,
      was:'a cat-themed CSS style system', from:'MEOW needing a style layer', imagined:'pretty defaults out of the box', happened:'folded into MEOW', status:'building' },
    { id:'meow', title:'MEOW', shelf:'worlds', w:8.6, h:18.2, c:'#e1d7f0', t:'#6c4fb3', ff:"'Fredoka',sans-serif", fs:3, wt:600, shot:'cat2.png',
      does:'a step-by-step wizard: pick a layout, colours, fonts and pages like dressing up a character, then export a real, hostable website',
      from:'years of making Carrd and Neocities sites for people with taste but no code', happened:'being built in the open, as my own open-source project', status:'building',
      links:[['source','https://github.com/xaynakive/meow']] },
    { id:'mythirium', title:'Mythirium', shelf:'shipped', w:4, h:12.4, c:'#dce6f1', t:'#4e6a8c', ff:"'Cinzel',serif", fs:1.2, wt:600, up:1, noa:1,
      does:'the glass cube at the top of this page: four faces that open into a diary, a bookshelf, a handheld and a phone',
      from:'wanting a portal, not a page', happened:'you are standing in it', status:'live',
      links:[['source','https://github.com/xaynakive/mythirium']] },
    { id:'techpolaroids', title:'TechPolaroids', shelf:'shipped', w:6, h:17, c:'#faf8f3', t:'#3b3b3b', ff:"'Special Elite',monospace", fs:1.45,
      does:'a dev-in-public diary where projects and experiments are framed like polaroids',
      from:'wanting to keep the creases, not just the finished things', happened:'live, and where the latest updates land', status:'live',
      links:[['open','https://techpolaroids.github.io/'],['source','https://github.com/xaynakive/techpolaroids']] },
    { id:'glasstapes', title:'glasstapes', shelf:'shipped', w:5.8, h:15.8, c:'#d3e0ee', t:'#3d5f86', ff:"'VT323',monospace", fs:2.4,
      does:'the shared diary at the bottom of this page: write a page, it folds into an envelope and drops into the mailbox',
      from:'missing the old internet guestbooks', happened:'lives on this site', status:'live',
      links:[['open','#glasstapes']] },
    { id:'purrsona', title:'PurrSona', shelf:'shipped', w:2.4, h:16.4, c:'#efb9c8', t:'#fffafc', ff:"'Homemade Apple',cursive", fs:1, noa:1, shot:'catttttttttttt.png',
      does:'a small model that reads "cat energy" and sorts it into five feline archetypes, exported with ONNX so it runs anywhere',
      from:'wanting ML to feel playful and personal instead of clinical', happened:'shipped, and still sorting cats', status:'done',
      links:[['live','https://xaynakive.github.io/purrsona'],['source','https://github.com/xaynakive/purrsona']] },
    { id:'breeze', title:'Breeze', shelf:'shipped', w:5.4, h:16.8, c:'#d7ece6', t:'#3f7a6a', ff:"'Quicksand',sans-serif", fs:1.9, wt:600, shot:'toolkit.jpg',
      does:'an emotion-aware intent classifier that sorts messages into rant, struggle, ask or noise, behind a Flask + Groq interface with a deterministic safety layer',
      from:'general models kept reading distress as joy', happened:'done: a ~100k-sample dataset and six trained, evaluated models', status:'done' },
    { id:'meowtm', title:'MeowTM', shelf:'shipped', w:20, flat:1, c:'#f4e7b8', t:'#6b5423', ff:"'Press Start 2P',monospace", fs:1, shot:'meowtm.png',
      does:'a 16-bit ATM in x86 assembly (emu8086): PIN checks, balances, deposits and withdrawals of the treat fund',
      from:'wanting to touch the metal underneath everything', happened:'it works. the cats are solvent.', status:'done',
      links:[['source','https://github.com/xaynakive/meowtm']] },
    { id:'portal', title:'portal-engine', shelf:'experiments', w:22, flat:1, c:'#d8e3d0', t:'#3f5a3b', ff:"'Syncopate',sans-serif", fs:1.1, wt:700, up:1,
      does:'a reusable z-axis navigation pattern: pages that open by zooming through layers',
      from:'the October Reveal idea', happened:'a pattern i keep reusing', status:'reusable',
      links:[['source','https://github.com/xaynakive/portal-engine']] },
    { id:'codeneko', title:'CodeNeko', shelf:'experiments', w:5.6, h:15.6, c:'#f1e1c4', t:'#8a5a2b', ff:"'Righteous',sans-serif", fs:1.6,
      was:'an early venture', from:'Ibtida, cohort 8', imagined:'a real product', happened:'still finding its shape', status:'paused' },
    { id:'bubbles', title:'Bubbles', shelf:'sleeping', w:6.6, h:16.8, c:'#fadfe9', t:'#e0799b', ff:"'Rubik Bubbles',sans-serif", fs:2,
      was:'a soft companion robot', from:'care and company', imagined:'a Kirby-soft caretaker', happened:'a beautiful someday', status:'sleeping' },
    { id:'3am', title:'3am interfaces', shelf:'fragments', w:12.6, h:18.8, c:'#d8c7ec', t:'#43307a', ff:"'Rubik Glitch',sans-serif", fs:2.2, tag:'thicker than my ex',
      was:'unfinished UIs', from:'insomnia', imagined:'who knows', happened:'they existed for a moment', status:'cursed' },
    { id:'screenshots', title:'screenshots', shelf:'fragments', w:5, h:14.6, c:'#ebeae6', t:'#55555a', ff:"'DM Mono',monospace", fs:1.2, up:1,
      was:'a graveyard folder', from:'everywhere', imagined:'nothing in particular', happened:'proof they were real', status:'archived' }
  ];
  XK.BOOK_FONTS = 'https://fonts.googleapis.com/css2?family=Italiana&family=Pinyon+Script&family=Pacifico&family=Fredoka:wght@600&family=Cinzel:wght@600&family=Special+Elite&family=VT323&family=Homemade+Apple&family=Quicksand:wght@600&family=Press+Start+2P&family=Syncopate:wght@700&family=Righteous&family=Rubik+Bubbles&family=Rubik+Glitch&display=swap';

  /* ── the toolkit: every skill points at the thing that proves it ── */
  XK.SKILLS = [
    { id:'interface', name:'Interface', items:[
      ['HTML & CSS',    'semantic markup, grid, container queries, 3D transforms', 'mythirium'],
      ['JavaScript',    'DOM, canvas, animation, no framework required',          'meow'],
      ['motion',        'easing, choreography, reduced-motion fallbacks',          'diary'],
      ['accessibility', 'keyboard, focus management, Esc steps back out',          'site'] ]},
    { id:'product', name:'Product & UI', items:[
      ['Figma',          'components, auto-layout, prototyping',   'pixelfiles'],
      ['design systems', 'tokens, type scales, a cat-themed CSS layer', 'catgloss'],
      ['UX flows',       'a dress-up wizard instead of a blank canvas', 'meow'] ]},
    { id:'aiml', name:'AI / ML', items:[
      ['Python',       'pandas, NumPy, notebooks',                    'purrsona'],
      ['scikit-learn', 'classification pipelines and evaluation',     'purrsona'],
      ['NLP',          'emotion and intent classification',           'breeze'],
      ['ONNX',         'exporting models so they run anywhere',       'purrsona'],
      ['LLM safety',   'a deterministic safety layer around a model', 'breeze'] ]},
    { id:'cyber', name:'Cybersecurity', items:[
      ['red teaming',  'reconnaissance and attack-surface mapping', 'cyberster'],
      ['web security', 'OWASP Top 10: XSS, injection, broken auth', 'cyberster'],
      ['networking',   'TCP/IP, DNS, ports and services',           'cyberster'] ]},
    { id:'systems', name:'Systems & Cloud', items:[
      ['x86 Assembly',   'registers, interrupts, 16-bit DOS I/O', 'meowtm'],
      ['Supabase',       'Postgres, row-level security, realtime', 'glasstapes'],
      ['Git & Pages',    'deploys, custom domains, pull requests', 'site'] ]},
    { id:'creative', name:'Creative', items:[
      ['canvas',        'the rain and the stars behind this page', 'site'],
      ['SVG & CSS art', 'a diary, a bookshelf, a sleeping cat',    'mythirium'],
      ['worldbuilding', 'a whole canon with its own orbit',        'shimmerwhere'] ]},
    { id:'human', name:'Human Systems', items:[
      ['community',     'founded a 500+ member CS peer network',    'csnetwork'],
      ['leadership',    'fellow, then campus lead',                 'hash'],
      ['pitching',      'a first paying client from a pitch deck',  'pixelfiles'],
      ['documentation', 'READMEs people actually read',             'meow'] ]}
  ];

  /* evidence cards for the handheld's top screen */
  XK.PROOF = {
    mythirium:   { title:'Mythirium',    kind:'live · this page',   line:'the cube you just opened. four faces, four objects, one choreography.', book:'mythirium' },
    meow:        { title:'MEOW',         kind:'building · open source', line:'SiteConfig core, a live renderer and an exporter, all in plain JavaScript.', book:'meow', url:'https://github.com/xaynakive/meow' },
    diary:       { title:'the diary',    kind:'this cube · front face', line:'a flap, a slow cover, page turns with shading, and a calm version for reduced motion.' },
    site:        { title:'xaynakive.com',kind:'live · you are here',  line:'hand-built, no framework: canvas rain, stars, and every object reachable by keyboard.' },
    pixelfiles:  { title:'PixelFiles',   kind:'founder · 2024 to now', line:'a retro/VHS template studio: 100+ slides, and a first paying client won with a pitch deck.' },
    catgloss:    { title:'Catgloss',     kind:'folded into MEOW',   line:'a cat-themed style layer so the defaults already look good.', book:'catgloss' },
    purrsona:    { title:'PurrSona',     kind:'shipped · ML',       line:'a dataset, a gradient-boosting model and an ONNX export that sorts cat energy.', book:'purrsona', url:'https://xaynakive.github.io/purrsona' },
    breeze:      { title:'Breeze',       kind:'done · NLP',         line:'~100k samples, six models, and a safety layer that listens properly.', book:'breeze' },
    cyberster:   { title:'Cyberster',    kind:'batch 1 · campus lead', line:'completed the inaugural cybersecurity programme, then led the campus community.' },
    meowtm:      { title:'MeowTM',       kind:'done · x86',         line:'a 16-bit ATM in emu8086. the treat fund balances.', book:'meowtm', url:'https://github.com/xaynakive/meowtm' },
    glasstapes:  { title:'glasstapes',   kind:'live · this page',   line:'the shared diary at the bottom of the page.', book:'glasstapes' },
    shimmerwhere:{ title:'Shimmerwhere', kind:'ongoing · lore',     line:'the orbit everything else belongs to.', book:'shimmerwhere', url:'https://xaynakive.github.io/shimmerwhere' },
    csnetwork:   { title:'CS Network',   kind:'founder · 2024 to now', line:'a 500+ member peer-learning community for computer science students.' },
    hash:        { title:'Hash Engineering', kind:'fellow · 2026',  line:'one of 16 fellows chosen from 150+ applicants. also: Cyberster campus lead.' }
  };
})();
