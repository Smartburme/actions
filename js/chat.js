// Public chat demo using localStorage. Replace with Firebase RTDB for realtime.
const CHAT_KEY = 'demo_public_chat_v1';
const stream = document.getElementById('chat-stream');
const input = document.getElementById('chat-message');
const sendBtn = document.getElementById('send');

function loadChat(){ return JSON.parse(localStorage.getItem(CHAT_KEY) || '[]'); }
function saveChat(list){ localStorage.setItem(CHAT_KEY, JSON.stringify(list.slice(-200))); }

function render(){
  const list = loadChat();
  stream.innerHTML = '';
  list.forEach(m => {
    const el = document.createElement('div');
    el.className = 'chat-message';
    el.textContent = `[${new Date(m.t).toLocaleTimeString()}] ${m.u || 'Guest'}: ${m.m}`;
    stream.appendChild(el);
  });
  stream.scrollTop = stream.scrollHeight;
}

sendBtn?.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;
  const user = (JSON.parse(localStorage.getItem('demo_user') || 'null') || {}).email || 'Guest';
  const list = loadChat();
  list.push({ u: user, m: text, t: Date.now() });
  saveChat(list);
  input.value='';
  render();
});

input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendBtn.click(); });

// rudimentary "realtime" via storage events (works across tabs)
window.addEventListener('storage', e => { if (e.key === CHAT_KEY) render(); });

render();
