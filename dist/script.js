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
const story = document.querySelector('.scroll-story');
const storyPanels = [...document.querySelectorAll('.story-panel')];
const storyTrack = document.querySelector('.story-track span');
const work = document.querySelector('.work');
const heroHeadline = document.querySelector('.hero h1');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
let revealObserver;
function configureMotion() {
  revealObserver?.disconnect();
  revealTargets.forEach(element => element.classList.remove('reveal-pending'));
  portrait.style.removeProperty('translate');
  projectImage.style.removeProperty('translate');
  document.documentElement.classList.toggle('motion-enabled', !motionPreference.matches);
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
  paintStory();
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

function paintStory() {
  if (motionPreference.matches) {
    storyPanels.forEach(panel => panel.removeAttribute('inert'));
    heroHeadline.style.removeProperty('translate');
    portrait.style.removeProperty('transform');
    return;
  }
  const box = story.getBoundingClientRect();
  const travel = Math.max(1, story.offsetHeight - innerHeight);
  const position = clamp(-box.top / travel);
  // Two full-screen circular wipes are tied directly to scroll position.
  const second = clamp((position - 0.12) / 0.30);
  const third = clamp((position - 0.57) / 0.30);
  story.style.setProperty('--wipe-data', `${second * 150}%`);
  story.style.setProperty('--wipe-systems', `${third * 150}%`);
  storyTrack.style.transform = `scaleX(${position})`;
  const active = third >= 0.5 ? 2 : second >= 0.5 ? 1 : 0;
  storyPanels.forEach((panel, index) => {
    panel.toggleAttribute('inert', index !== active);
    const heading = panel.querySelector('h2');
    const local = index === 0 ? position : index === 1 ? second : third;
    heading.style.transform = `translate3d(0, ${(1 - local) * (index ? 55 : -15)}px, 0)`;
  });
  const heroProgress = clamp(scrollY / Math.max(innerHeight, 1));
  heroHeadline.style.translate = `${-heroProgress * (innerWidth > 600 ? 42 : 12)}px 0`;
  portrait.style.transform = `rotate(${5 - heroProgress * 9}deg)`;
  const workBox = work.getBoundingClientRect();
  const workProgress = clamp((innerHeight - workBox.top) / (innerHeight + workBox.height));
  work.style.setProperty('--work-hue', `${72 + workProgress * 105}`);
}

const projectRows = [...document.querySelectorAll('.project-list details')];
projectRows.forEach((row, index) => {
  const palettes = ['#dceadd', '#e3dff0', '#f0e1ce'];
  const activate = () => work.style.setProperty('--work-interaction', palettes[index]);
  const deactivate = () => {
    const openRow = projectRows.find(item => item.open);
    if (openRow) work.style.setProperty('--work-interaction', palettes[projectRows.indexOf(openRow)]);
    else work.style.removeProperty('--work-interaction');
  };
  row.addEventListener('pointerenter', () => { if (finePointer.matches) activate(); });
  row.addEventListener('pointerleave', deactivate);
  row.addEventListener('focusin', activate);
  row.addEventListener('focusout', deactivate);
  row.addEventListener('toggle', () => { deactivate(); requestScrollFrame(); });
});

// Pointer interaction is optional; keyboard and touch keep native navigation.
document.querySelectorAll('.portrait, .project-visual').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (motionPreference.matches || !finePointer.matches) return;
    const box = card.getBoundingClientRect();
    const x = clamp((event.clientX - box.left) / box.width) - 0.5;
    const y = clamp((event.clientY - box.top) / box.height) - 0.5;
    card.style.setProperty('--tilt-x', `${-y * 7}deg`);
    card.style.setProperty('--tilt-y', `${x * 7}deg`);
  }, { passive: true });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});
