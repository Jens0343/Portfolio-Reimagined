const clock = document.querySelector('#clock');
function updateClock(){clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kuala_Lumpur',hour:'2-digit',minute:'2-digit'}).format(new Date());}
updateClock();setInterval(updateClock,60000);
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('soojianlin@gmail.com');status.textContent='Email copied.';}catch{status.textContent='Please select and copy: soojianlin@gmail.com';}});
document.querySelectorAll('details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('details').forEach(other=>{if(other!==item)other.open=false;});}));

// Scroll enhancement: the page stays fully readable without JavaScript or motion.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.createElement('div');
progress.className = 'reading-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);
const portrait = document.querySelector('.portrait');
const projectImage = document.querySelector('.project-visual img');
const revealTargets = [...document.querySelectorAll('.section h2, .project-info, .project-visual, .project-list details, .about-body, .toolkit article, .timeline article, .intro, .contact-bottom')];
const navigation = [...document.querySelectorAll('nav a')];
const sections = ['work', 'about', 'contact'].map(id => document.getElementById(id));
let revealObserver;
function configureMotion() {
  revealObserver?.disconnect();
  revealTargets.forEach(element => element.classList.remove('reveal-pending'));
  portrait.style.removeProperty('translate');
  projectImage.style.removeProperty('translate');
  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(element => {
      if (element.getBoundingClientRect().top > innerHeight) {
        element.classList.add('scroll-reveal', 'reveal-pending');
        revealObserver.observe(element);
      }
    });
  }
  requestScrollFrame();
}
let scrollFrame = 0;
function paintScroll() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
  if (!motionPreference.matches && innerWidth > 600) {
    portrait.style.translate = `0 ${Math.min(scrollY * 0.075, 35)}px`;
    const rect = projectImage.parentElement.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      const offset = Math.max(-12, Math.min(12, (innerHeight / 2 - rect.top - rect.height / 2) * 0.04));
      projectImage.style.translate = `0 ${offset}px`;
    }
  } else {
    portrait.style.removeProperty('translate');
    projectImage.style.removeProperty('translate');
  }
  let activeId = '';
  sections.forEach(section => { if (section.getBoundingClientRect().top < innerHeight * 0.45) activeId = section.id; });
  navigation.forEach(link => {
    if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function requestScrollFrame() { if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScroll); }
addEventListener('scroll', requestScrollFrame, { passive: true });
addEventListener('resize', requestScrollFrame);
addEventListener('load', requestScrollFrame);
document.addEventListener('focusin', event => event.target.closest('.reveal-pending')?.classList.remove('reveal-pending'));
motionPreference.addEventListener('change', configureMotion);
configureMotion();
