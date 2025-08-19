// Group text chat demo + Voice loopback demo
const GROUP_KEY = 'demo_group_chat_v1';
const gStream = document.getElementById('group-stream');
const gInput = document.getElementById('group-message');
const gSend = document.getElementById('group-send');

function gLoad(){ return JSON.parse(localStorage.getItem(GROUP_KEY) || '[]'); }
function gSave(list){ localStorage.setItem(GROUP_KEY, JSON.stringify(list.slice(-200))); }

function gRender(){
  const list = gLoad();
  gStream.innerHTML = '';
  list.forEach(m => {
    const el = document.createElement('div');
    el.className = 'chat-message';
    el.textContent = `[${new Date(m.t).toLocaleTimeString()}] ${m.u || 'Guest'}: ${m.m}`;
    gStream.appendChild(el);
  });
  gStream.scrollTop = gStream.scrollHeight;
}

gSend?.addEventListener('click', () => {
  const text = gInput.value.trim();
  if (!text) return;
  const user = (JSON.parse(localStorage.getItem('demo_user') || 'null') || {}).email || 'Guest';
  const list = gLoad();
  list.push({ u: user, m: text, t: Date.now() });
  gSave(list);
  gInput.value='';
  gRender();
});

gInput?.addEventListener('keydown', e => { if (e.key === 'Enter') gSend.click(); });
window.addEventListener('storage', e => { if (e.key === GROUP_KEY) gRender(); });

// Voice loopback demo (no signaling yet)
let mediaStream;
const startBtn = document.getElementById('start-voice');
const stopBtn  = document.getElementById('stop-voice');
const audioEl  = document.getElementById('voice-audio');

startBtn?.addEventListener('click', async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioEl.srcObject = mediaStream;
  } catch (err) {
    alert('Microphone permission denied or not available.');
  }
});

stopBtn?.addEventListener('click', () => {
  if (!mediaStream) return;
  mediaStream.getTracks().forEach(t => t.stop());
  mediaStream = null;
  audioEl.srcObject = null;
});

gRender();
