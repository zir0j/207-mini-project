document.getElementById('year').textContent = new Date().getFullYear();

const funFacts = [
  "I can solve a 3x3, 4x4, and 5x5 Rubik's cube!",
  "I was diagnosed with OCD at 2023.",
  "My favorite film is Aftersun",
  "My favorite album of all time is 'The Black Parade' by My Chemical Romance.",
  "My fastest running time is 5:23/km",
  "I had a surgery when I was four years old which made my nostril flexible.",
  "I got shamed by my teacher for coming out as an Atheist in class."
];

document.getElementById('funFactBtn').addEventListener('click', () => {
  const display = document.getElementById('funFactDisplay');
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  display.style.opacity = '0';
  setTimeout(() => {
    display.textContent = fact;
    display.style.opacity = '1';
  }, 150);
});

function openWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;

  document.getElementById('canvasHint').style.display = 'none';
  win.hidden = false;
  bringToFront(win);

  if (win.style.left === '') {
    const count = [...document.querySelectorAll('.window')].filter(w => !w.hidden).length - 1;
    const offset = count * 2;
    const maxLeft = (window.innerWidth / 16) - 22;
    const maxTop  = (window.innerHeight / 16) - 14;
    win.style.left = Math.max(1, Math.min(6 + offset, maxLeft)) + 'rem';
    win.style.top  = Math.max(1, Math.min(5 + offset, maxTop))  + 'rem';
  }
}

function closeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.hidden = true;

  const anyOpen = [...document.querySelectorAll('.window')].some(w => !w.hidden);
  if (!anyOpen) document.getElementById('canvasHint').style.display = '';
}

function bringToFront(win) {
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  win.classList.add('active');
}

document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    openWindow(el.dataset.target);
  });
});

document.querySelectorAll('.win-close').forEach(btn => {
  btn.addEventListener('click', () => closeWindow(btn.dataset.close));
});

document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => bringToFront(win));
  win.addEventListener('touchstart', () => bringToFront(win), { passive: true });
});

document.querySelectorAll('.win-bar').forEach(bar => {
  let dragging = false;
  let startX, startY, initLeft, initTop;

  bar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('win-close')) return;
    const win = bar.closest('.window');
    dragging = true;
    bringToFront(win);

    const rect = win.getBoundingClientRect();
    startX   = e.clientX;
    startY   = e.clientY;
    initLeft = rect.left;
    initTop  = rect.top;
    win.style.left = initLeft + 'px';
    win.style.top  = initTop  + 'px';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const win = bar.closest('.window');
    win.style.left = (initLeft + e.clientX - startX) + 'px';
    win.style.top  = (initTop  + e.clientY - startY) + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = false; });

  bar.addEventListener('touchstart', e => {
    if (e.target.classList.contains('win-close')) return;
    const win   = bar.closest('.window');
    const touch = e.touches[0];
    const rect  = win.getBoundingClientRect();
    dragging = true;
    startX   = touch.clientX;
    startY   = touch.clientY;
    initLeft = rect.left;
    initTop  = rect.top;
    win.style.left = initLeft + 'px';
    win.style.top  = initTop  + 'px';
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const touch = e.touches[0];
    const win   = bar.closest('.window');
    win.style.left = (initLeft + touch.clientX - startX) + 'px';
    win.style.top  = (initTop  + touch.clientY - startY) + 'px';
  }, { passive: true });

  document.addEventListener('touchend', () => { dragging = false; });
});
