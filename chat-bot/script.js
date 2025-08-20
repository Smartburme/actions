// DOM Elements
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');
const photoUpload = document.getElementById('photo-upload');
const preview = document.getElementById('preview');
const newChatBtn = document.getElementById('new-chat');
const chatHistoryBtn = document.getElementById('chat-history');
const clearChatBtn = document.getElementById('clear-chat');

// OpenAI API Config
const BASE_URL = "https://api.aimlapi.com/v1";
const API_KEY = "a4e0c569dfe04440a9dc81720921d809";

// Send Chat Message
sendBtn.addEventListener('click', async () => {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("User", text);
  userInput.value = "";

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: "You are a travel agent. Be descriptive and helpful." },
        { role: "user", content: text }
      ],
      temperature: 0.7,
      max_tokens: 256
    })
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;
  appendMessage("AI", aiMessage);
});

// Append Message to Chat
function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.textContent = `${sender}: ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Upload Photo Preview
photoUpload.addEventListener('change', () => {
  preview.innerHTML = "";
  Array.from(photoUpload.files).forEach(file => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  });
});

// New Chat
newChatBtn.addEventListener('click', () => {
  messages.innerHTML = "";
});

// Clear Chat
clearChatBtn.addEventListener('click', () => {
  messages.innerHTML = "";
});
