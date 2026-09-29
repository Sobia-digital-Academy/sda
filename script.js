(()=>{
const $=s=>document.querySelector(s);
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('hide'),400));
setTimeout(()=>$('#loader').classList.add('hide'),2500);
const nav=$('#nav'),top=$('#top');
const onScroll=()=>{nav.classList.toggle('scrolled',scrollY>40);top.classList.toggle('show',scrollY>500)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
top.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const burger=$('#burger'),menu=$('#menu');
const close=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded','false')};
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});els.forEach(e=>io.observe(e))}
else els.forEach(e=>e.classList.add('in'));
const track=$('#track'),cards=[...track.children];let i=0,timer;
const pv=()=>+getComputedStyle(cards[0]).getPropertyValue('--pv')||1;
const max=()=>Math.max(0,cards.length-pv());
const go=n=>{i=n>max()?0:n<0?max():n;const w=cards[0].getBoundingClientRect().width+19.2;track.style.transform=`translateX(${-i*w}px)`};
const auto=()=>{clearInterval(timer);timer=setInterval(()=>go(i+1),5000)};
$('#next').onclick=()=>{go(i+1);auto()};$('#prev').onclick=()=>{go(i-1);auto()};
addEventListener('resize',()=>go(Math.min(i,max())));auto();
})();
