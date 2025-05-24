const express = require('express');
const bodyParser = require('body-parser');
const { createBotInstance, botRecords } = require('./botManager');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/api/create-bot', (req, res) => {
  const { botName, telegramToken, openaiKey } = req.body;
  createBotInstance(botName, telegramToken, openaiKey);
  res.send(`Bot "${botName}" created successfully!`);
});

app.get('/api/bots', (req, res) => {
  res.json(botRecords);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
