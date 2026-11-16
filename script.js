// Theme selector with saved preference
const themeSelect = document.getElementById('themeSelect');
const savedTheme = localStorage.getItem('basitNaziaTheme');
if (savedTheme && ['burgundy','sage','midnight','rose'].includes(savedTheme)) {
  document.body.dataset.theme = savedTheme;
  themeSelect.value = savedTheme;
}
themeSelect.addEventListener('change', () => {
  document.body.dataset.theme = themeSelect.value;
  localStorage.setItem('basitNaziaTheme', themeSelect.value);
});

// Countdown: 29 November 2026, 11:00 AM Pakistan Standard Time (UTC+05:00)
const weddingDate = new Date('2026-11-29T11:00:00+05:00').getTime();
const countdown = document.getElementById('countdown');
function updateCountdown() {
  const remaining = weddingDate - Date.now();
  if (remaining <= 0) {
    countdown.innerHTML = '<p class="countdown-note">Alhamdulillah — today we celebrate! With love and blessings.</p>';
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Original invitation lightbox
const lightbox = document.getElementById('cardLightbox');
const openCard = () => { lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; document.getElementById('closeCard').focus(); };
const closeCard = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; document.getElementById('openCard').focus(); };
document.getElementById('openCard').addEventListener('click', openCard);
document.getElementById('closeCard').addEventListener('click', closeCard);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeCard(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeCard(); });

// Card sharing: native share when available, otherwise copy a shareable message.
const cardMessage = 'You are warmly invited to the wedding of Advocate Abdul Basit Umrani & Nazia Gul Muhammad on Sunday, 29 November 2026 at Iqbal Marriage Hall, Tando Allahyar. With love and duas!';
document.getElementById('shareCard').addEventListener('click', async () => {
  const cardUrl = new URL('assets/invitation-card.jpeg', window.location.href).href;
  try {
    const response = await fetch(cardUrl);
    const blob = await response.blob();
    const file = new File([blob], 'Basit-and-Nazia-Invitation.jpeg', { type: blob.type || 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: 'Basit & Nazia Wedding Invitation', text: cardMessage, files: [file] });
      return;
    }
    if (navigator.share) {
      await navigator.share({ title: 'Basit & Nazia Wedding Invitation', text: cardMessage, url: cardUrl });
      return;
    }
  } catch (error) {
    if (error.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(cardMessage + '\n' + cardUrl);
    alert('Invitation message and card link copied. You can now share them.');
  } catch {
    window.prompt('Copy this invitation message and card link:', cardMessage + '\n' + cardUrl);
  }
});

const whatsappText = encodeURIComponent(cardMessage);
document.getElementById('shareCardWhatsApp').href = `https://wa.me/?text=${whatsappText}`;
document.getElementById('whatsappContact').href = `https://wa.me/923192933924?text=${encodeURIComponent('Assalamu Alaikum! I would like to contact you regarding the wedding of Advocate Abdul Basit Umrani and Nazia Gul Muhammad on 29 November 2026.')}`;

// Scratch card canvas — supports mouse, touch and stylus through Pointer Events.
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let drawing = false;
let scratched = false;
function paintScratchSurface() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, '#8b642b');
  gradient.addColorStop(.28, '#e5ca83');
  gradient.addColorStop(.52, '#b78b42');
  gradient.addColorStop(.75, '#f1dda4');
  gradient.addColorStop(1, '#8f672d');
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = 'rgba(255,255,255,.24)';
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✧  SCRATCH HERE TO REVEAL  ✧', rect.width / 2, rect.height / 2);
  ctx.globalCompositeOperation = 'destination-out';
  scratched = false;
}
function scratchAt(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
  if (!scratched) {
    scratched = true;
    setTimeout(checkScratchProgress, 150);
  }
}
function checkScratchProgress() {
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let transparent = 0;
  const total = pixels.length / 4;
  for (let i = 3; i < pixels.length; i += 4) if (pixels[i] < 80) transparent++;
  if (transparent / total > 0.38) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
canvas.addEventListener('pointerdown', event => {
  drawing = true;
  canvas.setPointerCapture(event.pointerId);
  scratchAt(event);
});
canvas.addEventListener('pointermove', event => { if (drawing) scratchAt(event); });
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(name => canvas.addEventListener(name, () => drawing = false));
document.getElementById('resetScratch').addEventListener('click', paintScratchSurface);
window.addEventListener('resize', paintScratchSurface);
paintScratchSurface();

// Gentle reveal-on-scroll; visible immediately if IntersectionObserver is unavailable.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));
