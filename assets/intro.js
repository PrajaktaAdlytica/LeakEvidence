(() => {
  'use strict';
  const video=document.querySelector('#intro-video');if(!video)return;
  const intro=video.closest('.intro'),toggle=document.querySelector('#intro-toggle'),skip=document.querySelector('#skip-intro'),hero=document.querySelector('#hero');
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const reduced=()=>media.matches||document.documentElement.classList.contains('reduce-motion');
  const header=document.querySelector('.site-header');
  let loaded=false,userPaused=false,autoAttempted=false,inView=false,transitioned=false,frame=0;
  function updateNavigation(){
    const show=intro.getBoundingClientRect().bottom<=header.getBoundingClientRect().height+2;
    document.body.classList.toggle('hero-navigation',show);header.inert=!show;
    header.setAttribute('aria-hidden',String(!show));
  }
  let navFrame=0;window.addEventListener('scroll',()=>{if(!navFrame)navFrame=requestAnimationFrame(()=>{updateNavigation();navFrame=0;});},{passive:true});
  window.addEventListener('resize',updateNavigation);updateNavigation();
  function animateCamera(){
    const p=video.duration?Math.min(1,video.currentTime/video.duration):0;
    const zoom=reduced()?1:1.015+.13*Math.sin(Math.PI*p);
    video.style.setProperty('--camera-scale',zoom.toFixed(5));
    video.style.setProperty('--camera-x',reduced()?'0px':(Math.sin(Math.PI*p)*-7).toFixed(2)+'px');
    intro.style.setProperty('--film-progress',p);
    if(!video.paused&&!video.ended)frame=requestAnimationFrame(animateCamera);
  }
  function reset(){intro.classList.remove('ending','transitioning');transitioned=false;}
  function play(){
    if(!loaded){video.querySelector('source').src=video.querySelector('source').dataset.src;video.load();loaded=true;}
    if(video.ended){video.currentTime=0;reset();}
    video.play().catch(()=>{toggle.textContent='Play intro';});
  }
  function enterHero(automatic=false){
    if(transitioned)return;
    // Do not pull someone back after they have scrolled away or requested reduced motion.
    if(automatic&&(!inView||document.hidden||reduced()||intro.getBoundingClientRect().bottom<innerHeight*.65))return;
    transitioned=true;userPaused=true;video.pause();intro.classList.add('transitioning');
    const header=document.querySelector('.site-header').getBoundingClientRect().height;
    const top=scrollY+hero.getBoundingClientRect().top-header;
    if(reduced())window.scrollTo({top,behavior:'instant'});
    else if(window.LeakEvidenceMotion?.transitionTo)window.LeakEvidenceMotion.transitionTo(top);
    else window.scrollTo({top,behavior:'smooth'});
    // Explicit Skip transfers focus; automatic playback never steals keyboard focus.
    if(!automatic)hero.focus({preventScroll:true});
  }
  toggle.addEventListener('click',()=>{if(video.paused){userPaused=false;reset();play();}else{userPaused=true;video.pause();}});
  skip.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();enterHero();});
  video.addEventListener('play',()=>{toggle.textContent='Pause intro';cancelAnimationFrame(frame);animateCamera();});
  video.addEventListener('pause',()=>{cancelAnimationFrame(frame);toggle.textContent=video.ended?'Replay intro':'Play intro';});
  video.addEventListener('timeupdate',()=>{const p=video.duration?video.currentTime/video.duration:0;intro.style.setProperty('--film-progress',p);intro.classList.toggle('ending',p>.82);});
  video.addEventListener('ended',()=>{toggle.textContent='Replay intro';enterHero(true);});
  video.addEventListener('error',()=>{toggle.textContent='Retry intro';loaded=false;});
  new IntersectionObserver(entries=>{const entry=entries[0];inView=entry.isIntersecting;if(!inView){video.pause();return;}if(entry.intersectionRatio>.6&&!autoAttempted&&!userPaused&&!reduced()&&!navigator.connection?.saveData){autoAttempted=true;play();}},{threshold:[0,.1,.6]}).observe(intro);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
  const stopIfReduced=()=>{if(reduced()){video.pause();video.style.setProperty('--camera-scale','1');video.style.setProperty('--camera-x','0px');intro.classList.remove('ending','transitioning');}};
  media.addEventListener('change',stopIfReduced);
  new MutationObserver(stopIfReduced).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
})();
