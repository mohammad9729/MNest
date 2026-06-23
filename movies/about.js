// about.js — interactivity: particles, counters, testimonials, reveal
document.addEventListener('DOMContentLoaded', ()=>{
  initNavbarToggle();
  generateParticles(30);
  setupRevealOnScroll();
  initCounters();
  initTestimonials();
  bindContactForm();
});

function initNavbarToggle(){
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('navLinksMenu');
  if(btn){ btn.addEventListener('click', ()=> menu.classList.toggle('open')); }
}

// Particles
function generateParticles(count){
  const wrap = document.querySelector('.particles');
  if(!wrap) return;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className='particle';
    p.style.left = Math.random()*100+'%';
    p.style.top = Math.random()*100+'%';
    p.style.width = (4+Math.random()*8)+'px';
    p.style.height = p.style.width;
    p.style.opacity = 0.06 + Math.random()*0.2;
    p.style.animationDuration = (4+Math.random()*6)+'s';
    wrap.appendChild(p);
  }
}

// Reveal on scroll
function setupRevealOnScroll(){
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  },{threshold:0.12});
  els.forEach(el=>obs.observe(el));
}

// Counters
function animateCount(el, to, duration=1400){
  let start=0; const step = Math.ceil(to/ (duration/30));
  const id = setInterval(()=>{
    start+=step; if(start>=to){ el.textContent = to+ (to>999?'+':''); clearInterval(id); }
    else el.textContent = start + (to>999?'+':'');
  },30);
}
function initCounters(){
  const counts = [ {sel:'#c1',to:5000},{sel:'#c2',to:100000},{sel:'#c3',to:1000},{sel:'#c4',to:50} ];
  counts.forEach(c=>{ const el = document.querySelector(c.sel); if(el) animateCount(el,c.to); });
}

// Testimonials slider
let tIndex=0; function initTestimonials(){
  const items = document.querySelectorAll('.testimonial'); if(!items.length) return;
  items.forEach((it,i)=>{ it.style.transform = `translateX(${i*100}%)`; });
  setInterval(()=>{ tIndex = (tIndex+1)%items.length; items.forEach((it,i)=>{ it.style.transition='transform .6s ease'; it.style.transform = `translateX(${(i-tIndex)*100}%)`; }); },4500);
}

// Contact form
function bindContactForm(){
  const form = document.getElementById('contactForm'); if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    // basic validation
    const name = form.querySelector('#cname').value.trim();
    const email = form.querySelector('#cemail').value.trim();
    const msg = form.querySelector('#cmessage').value.trim();
    if(!name||!email||!msg){ alert('Please fill required fields'); return; }
    // show success
    alert('Message sent (demo). We will contact you soon.');
    form.reset();
  });
}
