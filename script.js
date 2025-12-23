// NutriMatch AI Chat Client Script

const chatBox = document.getElementById("chat");

// Add message to chat UI
function addMessage(text, sender = "ai") {
  const bubble = document.createElement("div");
  bubble.className =
    `message p-3 rounded-xl max-w-[80%] ${
      sender === "user"
      ? "ml-auto bg-orange-500 text-white"
      : "bg-white shadow border"
    }`;

  bubble.textContent = text;
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send chat request
async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  addMessage("Thinking… 🤔");

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: text })
    });

    const data = await res.json();

    chatBox.lastChild.remove(); // remove thinking...
    addMessage(data.reply, "ai");

  } catch (error) {
    chatBox.lastChild.remove();
    addMessage("⚠️ AI Server not running — please start server.js", "ai");
  }
}
