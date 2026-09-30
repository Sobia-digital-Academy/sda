document.addEventListener("DOMContentLoaded",()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const header=$(".site-header"), menu=$(".nav-menu"), menuToggle=$("#menuToggle"), loader=$("#loader"), backTop=$("#backTop");
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("load",()=>setTimeout(()=>loader?.classList.add("is-done"),120),{once:true});

  menuToggle?.addEventListener("click",()=>{
    const open=menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded",String(open));
    menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu");
    const icon=$("use",menuToggle); if(icon) icon.setAttribute("href",open?"#i-close":"#i-menu");
  });
  $$("a[href^='#']",menu).forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");$("use",menuToggle)?.setAttribute("href","#i-menu")}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){menu.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");$("use",menuToggle)?.setAttribute("href","#i-menu")}});

  const scrollUI=()=>{
    const y=window.scrollY;
    header?.classList.toggle("scrolled",y>18);
    backTop?.classList.toggle("show",y>500);
  };
  scrollUI(); window.addEventListener("scroll",scrollUI,{passive:true});
  backTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:reduce?"auto":"smooth"}));

  const items=$$(".reveal");
  if("IntersectionObserver"in window&&!reduce){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -35px"});
    items.forEach(el=>io.observe(el));
  }else items.forEach(el=>el.classList.add("is-visible"));

  const reviewTrack=$(".review-track");
  if(reviewTrack){
    const reviewCards=[...reviewTrack.children];
    reviewCards.forEach(card=>{const clone=card.cloneNode(true);clone.classList.remove("reveal","reveal-delay-1","reveal-delay-2");clone.setAttribute("aria-hidden","true");reviewTrack.appendChild(clone)});
    const pauseReviews=()=>reviewTrack.closest(".review-marquee")?.classList.add("is-paused");
    const resumeReviews=()=>reviewTrack.closest(".review-marquee")?.classList.remove("is-paused");
    reviewTrack.addEventListener("mouseenter",pauseReviews);
    reviewTrack.addEventListener("mouseleave",resumeReviews);
    reviewTrack.addEventListener("touchstart",pauseReviews,{passive:true});
    reviewTrack.addEventListener("touchend",()=>setTimeout(resumeReviews,900),{passive:true});
  }

  const names=["Ayesha Khan","Muhammad Hamza","Fatima Noor","Ali Raza","Hira Shah","Usman Ahmad","Sana Malik","Ahmad Hassan","Maryam Khan","Bilal Ahmad","Zainab Noor","Saad Khan","Iqra Ali","Hamza Yousaf","Mahnoor Fatima","Abdul Rehman","Eman Khan","Fahad Ali","Komal Shah","Danish Ahmad","Anum Khan","Muhammad Usman"];
  const reviews=[
    "The practical activities made Canva AI easier to understand. I liked being able to follow along during the live class.",
    "The live session format helped me ask questions while practicing. The lessons felt clear and structured.",
    "I enjoyed learning creative workflows instead of only reading about tools. The projects gave me useful practice.",
    "The course content was easy to follow and the design exercises helped me understand the tools step by step.",
    "I liked the combination of Canva and AI tools. The live guidance made the learning process more interactive.",
    "The practical tasks gave me a better idea of how to turn a lesson into an actual design.",
    "The sessions were beginner friendly and explained the concepts in a simple way.",
    "I found the creative exercises useful because I could practice the same concept in different designs.",
    "The live Q&A made it easier to clear up small problems while working on an assignment.",
    "The course introduced me to AI-powered design ideas in a way that felt approachable.",
    "I liked the project-based approach. Each activity gave me something specific to practice.",
    "The class structure helped me stay focused and work through the tools one step at a time.",
    "The Canva AI demonstrations were useful, especially when we moved from an idea to a finished visual.",
    "I appreciated the student support and the opportunity to ask questions during the live learning process.",
    "The lessons gave me a practical starting point for creating social media content with Canva.",
    "The examples were easy to understand and helped me connect the lesson with a real creative task.",
    "I enjoyed the balance between explanation and practice. It made the class feel active.",
    "The AI tools section was interesting and gave me new ideas for creative content.",
    "The course is presented in a simple, organized way that works well for someone starting with digital design.",
    "The practical assignments helped reinforce what we learned during the live sessions.",
    "I liked learning modern design workflows while still getting step-by-step guidance.",
    "The overall learning flow was clear: understand the tool, practice it, then create something with it."
  ];
  const track=$("#reviewTrack"), dots=$("#reviewDots"), viewport=$("#reviewViewport");
  let index=0, timer=null, startX=0, dragging=false;
  const avatar="assets/images/student-avatar.svg";
  names.forEach((name,i)=>{
    const card=document.createElement("article"); card.className="review-card";
    card.innerHTML=`<span class="demo-tag">SAMPLE / DEMO</span><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“${reviews[i]}”</blockquote><div class="reviewer"><img src="${avatar}" alt="" loading="lazy"><div><strong>${name}</strong><small>Canva AI Course</small></div></div>`;
    track.appendChild(card);
  });
  const perPage=()=>window.innerWidth<=620?1:window.innerWidth<=900?2:3;
  const pages=()=>Math.ceil(names.length/perPage());
  function renderDots(){
    dots.innerHTML="";
    for(let p=0;p<pages();p++){const b=document.createElement("button");b.type="button";b.setAttribute("aria-label",`Show testimonial group ${p+1}`);b.addEventListener("click",()=>go(p*perPage()));dots.appendChild(b)}
  }
  function go(next){
    const max=Math.max(0,names.length-perPage()); index=Math.min(Math.max(0,next),max);
    const card=track.children[0]; if(!card)return;
    const gap=18, width=card.getBoundingClientRect().width+gap;
    track.style.transform=`translateX(-${index*width}px)`;
    [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===Math.floor(index/perPage())));
  }
  function next(){go(index>=Math.max(0,names.length-perPage())?0:index+perPage())}
  function prev(){const p=perPage();go(index<=0?Math.max(0,names.length-p):index-p)}
  $("#nextReview")?.addEventListener("click",next); $("#prevReview")?.addEventListener("click",prev);
  function start(){if(reduce)return;clearInterval(timer);timer=setInterval(next,5000)}
  function stop(){clearInterval(timer)}
  viewport?.addEventListener("mouseenter",stop);viewport?.addEventListener("mouseleave",start);
  viewport?.addEventListener("focusin",stop);viewport?.addEventListener("focusout",start);
  viewport?.addEventListener("pointerdown",e=>{dragging=true;startX=e.clientX;viewport.setPointerCapture?.(e.pointerId);stop()});
  viewport?.addEventListener("pointerup",e=>{if(!dragging)return;dragging=false;const dx=e.clientX-startX;if(Math.abs(dx)>45)(dx<0?next:prev)();start()});
  viewport?.addEventListener("pointercancel",()=>{dragging=false;start()});
  renderDots(); go(0); start();
  window.addEventListener("resize",()=>{renderDots();go(index)});

  $$("a[href^='#']").forEach(a=>a.addEventListener("click",e=>{
    const target=$(a.getAttribute("href")); if(!target)return;
    e.preventDefault(); target.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
  }));
});
// Graceful local-image fallback: replace failed images with a lightweight branded visual.
document.querySelectorAll("img").forEach(img=>{
  img.addEventListener("error",()=>{
    if(img.dataset.fallbackApplied)return;
    img.dataset.fallbackApplied="true";
    const fallback=document.createElement("div");
    fallback.className="image-fallback";
    fallback.innerHTML='<span>SDA</span><small>Digital Learning</small>';
    fallback.setAttribute("role","img");
    fallback.setAttribute("aria-label",img.alt||"SDA Academy digital learning visual");
    img.replaceWith(fallback);
  },{once:true});
});
