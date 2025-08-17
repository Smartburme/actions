// Sidebar Toggle
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("active");
});

// Chat Logic
function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  input.value = "";

  setTimeout(() => {
    let reply = msg.toLowerCase() === "hi"
      ? "ဟုတ်ကဲ့ ဘာကူညီရမလဲ"
      : "မေးချင်တာကို နည်းနည်းပိုရှင်းပြပါ 🧐";
    addMessage(reply, "bot");
  }, 500);
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
  alert("History view feature is under development");
}
function clearChat() {
  document.getElementById("messages").innerHTML = "";
}
