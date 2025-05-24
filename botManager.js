const { Telegraf } = require('telegraf');
const axios = require('axios');

const botRecords = [];

function createBotInstance(name, telegramToken, openaiKey) {
  const bot = new Telegraf(telegramToken);

  bot.on('text', async (ctx) => {
    const msg = ctx.message.text;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: msg }],
      }, {
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const reply = response.data.choices[0].message.content;
      ctx.reply(reply);

    } catch (err) {
      ctx.reply("Error processing your request.");
    }
  });

  bot.launch();

  botRecords.push({ name, status: 'Running', token: telegramToken });
}

module.exports = { createBotInstance, botRecords };
