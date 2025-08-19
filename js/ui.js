// Theme switcher: Day (white text) vs Night (light green)
(() => {
  const toggle = document.getElementById('theme-toggle');
  const prefers = localStorage.getItem('theme') || 'day';
  if (prefers === 'night') document.body.classList.replace('theme-day','theme-night');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isNight = document.body.classList.toggle('theme-night');
      if (isNight) {
        document.body.classList.remove('theme-day');
        localStorage.setItem('theme','night');
      } else {
        document.body.classList.add('theme-day');
        localStorage.setItem('theme','day');
      }
    });
  }

  // Update auth link label from local session
  const link = document.getElementById('auth-link');
  const user = JSON.parse(localStorage.getItem('demo_user') || 'null');
  if (link) link.textContent = user ? 'Logout' : 'Login';
  if (link && user) link.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('demo_user');
    location.href = 'index.html';
  });
})();
