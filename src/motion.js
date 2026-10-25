/* LeakEvidence — scroll choreography. Local, progressive enhancement only. */
(() => {
  'use strict';
  const {gsap, ScrollTrigger, Lenis}=window;
  if(!gsap||!ScrollTrigger||!Lenis)return;
  gsap.registerPlugin(ScrollTrigger);
  const html=document.documentElement, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let context,lenis,tick,resizeTimer;const originals=new Map();
  const reduce=()=>media.matches||html.classList.contains('reduce-motion');
  function words(el){
    originals.set(el,el.innerHTML);
    const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];
    while(walk.nextNode())nodes.push(walk.currentNode);
    nodes.forEach(node=>{const frag=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(part=>{if(!part)return;if(/^\s+$/.test(part))frag.append(document.createTextNode(part));else{const mask=document.createElement('span'),word=document.createElement('span');mask.className='motion-word-mask';word.className='motion-word';word.textContent=part;mask.append(word);frag.append(mask);}});node.replaceWith(frag);});
    return [...el.querySelectorAll('.motion-word')];
  }
  function cleanup(){
    context?.revert();context=null;
    if(tick)gsap.ticker.remove(tick);tick=null;
    lenis?.destroy();lenis=null;
    originals.forEach((markup,el)=>el.innerHTML=markup);originals.clear();
    html.classList.remove('scroll-choreography');window.LeakEvidenceMotion.active=false;
  }
  function setup(){
    cleanup();if(reduce())return;
    const mobile=innerWidth<768;
    lenis=new Lenis({lerp:.105,smoothWheel:true,syncTouch:false,anchors:{offset:-100},allowNestedScroll:true});
    lenis.on('scroll',ScrollTrigger.update);tick=time=>lenis?.raf(time*1000);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
    html.classList.add('scroll-choreography');window.LeakEvidenceMotion.active=true;
    context=gsap.context(()=>{
      const reveal=(target,from,trigger=target,extra={})=>gsap.fromTo(target,from,{opacity:1,x:0,y:0,scale:1,clipPath:'inset(0% 0% 0% 0%)',ease:'power2.out',...extra,scrollTrigger:{trigger,start:'top 96%',end:'top 63%',scrub:.4,invalidateOnRefresh:true}});
      // Preserve real heading text/emphasis and natural wrapping; no duplicated accessible text.
      $$('main h1, .section h2, .offers-heading h2, .anomaly-heading h2, .closing-copy h2, .module-story h2').filter(el=>!el.closest('.demo-wrap,form,#form-result')).forEach((heading,i)=>{
        const pieces=words(heading);
        gsap.fromTo(pieces,{yPercent:i%3===1?-105:110,opacity:.12},{yPercent:0,opacity:1,ease:'power2.out',stagger:.045,scrollTrigger:{trigger:heading,start:'top 97%',end:'top 60%',scrub:.35}});
      });
      $$('.hero-copy>.eyebrow,.inner-hero-copy>.eyebrow,.section>.wrap>.eyebrow,.closing-copy>.eyebrow,.anomaly-heading .eyebrow').forEach(el=>reveal(el,{x:-22,opacity:0}));
      $$('.hero-copy>p:not(.eyebrow),.inner-hero-copy>p:not(.eyebrow),.hero-copy>.actions,.inner-hero-copy>.actions,.section-intro,.offers-heading>p,.anomaly-heading>p,.module-story>p,.closing-copy>p,.closing-copy>.text-link').forEach(el=>reveal(el,{y:mobile?14:28,opacity:.1}));
      // Alternate the direction by group; use CSS translate so hover transforms stay independent.
      $$('.module-grid,.roles,.score-grid,.steps,.protocol,.resource-grid,.related,.three,.boundary,.explanation-cards,.closing-paths').forEach((group,g)=>{
        [...group.children].forEach((card,i)=>{
          if(!card.matches('a,article,button,div'))return;
          gsap.fromTo(card,{opacity:.08,translate:mobile?'0 28px':`${(g%2?1:-1)*(i%2? -36:36)}px ${i%2?-18:30}px`},{opacity:1,translate:'0px 0px',ease:'power2.out',scrollTrigger:{trigger:card,start:'top 97%',end:`top ${mobile?72:68-i*2}%`,scrub:.45}});
        });
      });
      $$('.atlas-art>img,.inner-hero-art,.sensor-art,.module-environment').forEach((el,i)=>reveal(el,{opacity:.2,clipPath:i%2?'inset(0% 18% 0% 0%)':'inset(0% 0% 0% 18%)'},el));
      $$('.district-note,.environment-caption,.map-story>div,.module-showcase>.artifact,.feature-art').forEach((el,i)=>reveal(el,{opacity:.15,y:0},el));
      $$('.faq details').forEach(el=>reveal(el,{y:18,opacity:.1}));
      // Keep the existing native sticky geometry, but let ScrollTrigger drive the horizontal story.
      const journey=$('.journey'),rail=$('.journey-track');
      if(journey&&html.classList.contains('motion-ready')){
        const railTween=gsap.fromTo(rail,{x:0},{x:()=>-Math.max(0,rail.scrollWidth-innerWidth+innerWidth*.08),ease:'none',scrollTrigger:{trigger:journey,start:'top 88px',end:()=>`+=${journey.offsetHeight-innerHeight+88}`,scrub:.45,invalidateOnRefresh:true}});
        $$('.journey-scene>div:first-child').forEach(el=>gsap.fromTo(el,{opacity:.25,y:28},{opacity:1,y:0,ease:'none',scrollTrigger:{trigger:el,containerAnimation:railTween,start:'left 96%',end:'left 65%',scrub:true}}));
      }else if(mobile){$$('.journey-scene').forEach(el=>reveal(el,{y:28,opacity:.1}));}
      $$('.footer-links>div').forEach((el,i)=>gsap.fromTo(el,{y:28,opacity:.1},{y:0,opacity:1,scrollTrigger:{trigger:el,start:'top 99%',end:'clamp(top 78%)',scrub:.4},delay:i*.05}));
      const signature=$('.footer-signature');if(signature)gsap.fromTo(signature,{clipPath:'inset(0 100% 0 0)',opacity:.25},{clipPath:'inset(0 0% 0 0)',opacity:1,ease:'none',scrollTrigger:{trigger:signature,start:'top 100%',end:'clamp(top 85%)',scrub:.5}});
      const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
      gsap.fromTo(progress,{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
      return ()=>progress.remove();
    });
    ScrollTrigger.refresh();
  }
  window.LeakEvidenceMotion={active:false,transitionTo:(top)=>lenis?lenis.scrollTo(top,{duration:1.15,easing:t=>1-Math.pow(1-t,3)}):window.scrollTo({top,behavior:reduce()?'instant':'smooth'}),scrollTo:(top)=>lenis?lenis.scrollTo(top,{immediate:true}):window.scrollTo({top,behavior:'instant'})};
  // Keyboard users never have to wait for a scroll reveal to use its controls.
  document.addEventListener('focusin',e=>{if(!context)return;ScrollTrigger.getAll().forEach(st=>{const t=st.trigger;if(t&&(t.contains(e.target)||e.target.contains(t))&&st.animation){st.animation.progress(1);}});});
  new MutationObserver(records=>{if(records.some(r=>r.oldValue?.split(' ').includes('reduce-motion')!==html.classList.contains('reduce-motion')))setup();}).observe(html,{attributes:true,attributeFilter:['class'],attributeOldValue:true});
  let width=innerWidth,height=innerHeight;window.addEventListener('resize',()=>{if(innerWidth===width&&innerHeight===height)return;width=innerWidth;height=innerHeight;clearTimeout(resizeTimer);resizeTimer=setTimeout(setup,180);});
  document.addEventListener('toggle',e=>{if(e.target.matches('main details'))ScrollTrigger.refresh();},true);
  window.addEventListener('load',()=>ScrollTrigger.refresh());
  document.fonts.ready.then(setup);
})();
