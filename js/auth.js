// Firebase Auth wiring. Replace placeholders in firebase.config.js
// This file gracefully degrades to local demo mode if Firebase isn't available.

function hasFirebase(){
  return typeof firebase !== 'undefined' && firebase.apps;
}

async function init(){
  if (!hasFirebase()) return demoMode();
  const { auth } = firebase;
  const app = firebase.initializeApp(firebaseConfig);
  const _auth = auth();

  document.getElementById('do-register')?.addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    try {
      await _auth.createUserWithEmailAndPassword(email, password);
      localStorage.setItem('demo_user', JSON.stringify({ email }));
      location.href = 'index.html';
    } catch (e){ alert(e.message); }
  });

  document.getElementById('do-login')?.addEventListener('click', async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    try {
      await _auth.signInWithEmailAndPassword(email, password);
      localStorage.setItem('demo_user', JSON.stringify({ email }));
      location.href = 'index.html';
    } catch (e){ alert(e.message); }
  });

  document.getElementById('google')?.addEventListener('click', async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await _auth.signInWithPopup(provider);
      const email = _auth.currentUser?.email || 'user@google';
      localStorage.setItem('demo_user', JSON.stringify({ email }));
      location.href = 'index.html';
    } catch (e){ alert(e.message); }
  });
}

function demoMode(){
  // Offline demo: store "user" in localStorage only
  document.getElementById('do-register')?.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    if (!email) return alert('Email required');
    localStorage.setItem('demo_user', JSON.stringify({ email }));
    location.href = 'index.html';
  });
  document.getElementById('do-login')?.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    if (!email) return alert('Email required');
    localStorage.setItem('demo_user', JSON.stringify({ email }));
    location.href = 'index.html';
  });
  document.getElementById('google')?.addEventListener('click', () => {
    alert('Google Sign-In requires Firebase; configure firebase.config.js');
  });
}

init();
