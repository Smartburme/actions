// Public post feed with like/comment/share logic (localStorage demo).
// Replace with Firebase Firestore/RTDB in production.

const FEED_KEY = 'demo_feed_v1';

const feedEl = document.getElementById('feed');
const publishBtn = document.getElementById('publish');
const textEl = document.getElementById('post-text');
const imageEl = document.getElementById('post-image');

function loadFeed(){
  const data = JSON.parse(localStorage.getItem(FEED_KEY) || '[]');
  return data.sort((a,b) => b.created - a.created);
}

function saveFeed(list){
  localStorage.setItem(FEED_KEY, JSON.stringify(list));
}

function renderFeed(){
  const list = loadFeed();
  feedEl.innerHTML = '';
  if (!list.length){
    const empty = document.createElement('div');
    empty.className = 'card muted';
    empty.textContent = 'ယခုနေထိုင်ရာတွင် Post မရှိသေးပါ.';
    feedEl.appendChild(empty);
    return;
  }
  list.forEach(item => feedEl.appendChild(renderPost(item)));
}

function renderPost(post){
  const wrap = document.createElement('article');
  wrap.className = 'card post';
  wrap.dataset.id = post.id;

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.innerHTML = \`
    <img src="assets/logo.svg" class="avatar" alt="avatar" />
    <div>
      <div class="name">Aung Myo Kyaw</div>
      <div class="muted small">\${new Date(post.created).toLocaleString()}</div>
    </div>
  \`;
  wrap.appendChild(meta);

  const body = document.createElement('div');
  body.className = 'body';
  body.innerHTML = \`<div>\${post.text.replace(/</g,'&lt;')}</div>\`;
  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = 'post image';
    body.appendChild(img);
  }
  wrap.appendChild(body);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const likeBtn = document.createElement('button');
  likeBtn.className = 'action';
  likeBtn.textContent = '👍 Like';
  const likeCount = document.createElement('span');
  likeCount.className = 'count';
  likeCount.textContent = post.likes || 0;
  likeBtn.appendChild(likeCount);

  likeBtn.addEventListener('click', () => {
    post.likes = (post.likes || 0) + 1;
    likeCount.textContent = post.likes;
    persist(post);
  });

  const commentBtn = document.createElement('button');
  commentBtn.className = 'action';
  commentBtn.textContent = '💬 Comment';
  commentBtn.addEventListener('click', () => {
    const msg = prompt('Comment:');
    if (!msg) return;
    post.comments = post.comments || [];
    post.comments.push({ text: msg, created: Date.now() });
    persist(post);
    renderComments();
  });

  const shareBtn = document.createElement('button');
  shareBtn.className = 'action';
  shareBtn.textContent = '↪ Share';
  shareBtn.addEventListener('click', async () => {
    const shareData = { title: 'Post by Aung Myo Kyaw', text: post.text, url: location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(\`\${post.text}\n\${location.href}\`);
        alert('Copied to clipboard.');
      }
    } catch {}
  });

  actions.append(likeBtn, commentBtn, shareBtn);
  wrap.appendChild(actions);

  const commentsWrap = document.createElement('div');
  commentsWrap.className = 'comments';
  wrap.appendChild(commentsWrap);

  function renderComments(){
    commentsWrap.innerHTML = '';
    (post.comments || []).forEach(c => {
      const el = document.createElement('div');
      el.className = 'muted small';
      el.textContent = \`• \${c.text} (\${new Date(c.created).toLocaleString()})\`;
      commentsWrap.appendChild(el);
    });
  }
  renderComments();

  return wrap;
}

function persist(updated){
  const list = loadFeed();
  const idx = list.findIndex(p => p.id === updated.id);
  if (idx >= 0) list[idx] = updated;
  saveFeed(list);
}

publishBtn?.addEventListener('click', async () => {
  const text = (textEl?.value || '').trim();
  if (!text && !imageEl?.files?.length) return alert('ရိုက်ထည့်ပါ၊ သို့မဟုတ် ပုံတင်ပါ။');

  let imageData = null;
  if (imageEl?.files?.length){
    const file = imageEl.files[0];
    imageData = await fileToDataURL(file);
  }

  const post = {
    id: crypto.randomUUID(),
    text,
    image: imageData,
    likes: 0,
    comments: [],
    created: Date.now()
  };
  const list = loadFeed();
  list.push(post);
  saveFeed(list);
  textEl.value = '';
  if (imageEl) imageEl.value = '';
  renderFeed();
});

function fileToDataURL(file){
  return new Promise(res => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(file);
  });
}

renderFeed();
