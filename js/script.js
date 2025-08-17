// Sidebar Toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// Chat Logic
function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (msg === "") return;

  addMessage(msg, "user");
  input.value = "";

  // Bot reply
  setTimeout(() => {
    let reply = "ဟုတ်ကဲ့ ဘာကူညီရမလဲ";
    if (msg.toLowerCase() !== "hi") reply = "မေးချင်တာကို နည်းနည်းရှင်းပြပါ 🧐";
    addMessage(reply, "bot");
  }, 600);
}

function addMessage(text, sender) {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Sidebar Actions
function newChat() {
  document.getElementById("messages").innerHTML = "";
}
function viewHistory() {
  alert("History view placeholder");
}
function clearChat() {
  document.getElementById("messages").innerHTML = "";
}
