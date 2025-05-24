const form = document.getElementById('botForm');
const botList = document.getElementById('botList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    botName: document.getElementById('botName').value,
    telegramToken: document.getElementById('telegramToken').value,
    openaiKey: document.getElementById('openaiKey').value,
  };

  const res = await fetch('/api/create-bot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const msg = await res.text();
  alert(msg);
  loadBots();
});

async function loadBots() {
  const res = await fetch('/api/bots');
  const bots = await res.json();

  botList.innerHTML = '';
  bots.forEach(bot => {
    const div = document.createElement('div');
    div.className = 'bot-item';
    div.innerHTML = `<strong>${bot.name}</strong><br>Status: ${bot.status}`;
    botList.appendChild(div);
  });
}

loadBots();
