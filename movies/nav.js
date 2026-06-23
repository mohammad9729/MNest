// nav.js — highlight active nav link based on current filename
document.addEventListener('DOMContentLoaded', function(){
  try{
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const links = document.querySelectorAll('#navLinksMenu a');
    links.forEach(a=>{
      const href = (a.getAttribute('href')||'').toLowerCase();
      const li = a.parentElement;
      if(!li) return;
      // treat index.html and empty paths as home
      if((href === file) || (href === 'index.html' && file==='') || (href === '' && file==='index.html')){
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }catch(e){console.warn('nav.js error', e)}
});
