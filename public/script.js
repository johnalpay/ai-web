async function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatBox.innerHTML += `<div class="message user">You: ${message}</div>`;
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    chatBox.innerHTML += `<div class="message bot">Bot: ${data.reply}</div>`;
  } catch (err) {
    chatBox.innerHTML += `<div class="message bot">Error talking to bot.</div>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
