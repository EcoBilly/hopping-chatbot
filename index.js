const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/webhook', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send({ error: 'No message provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.send({ reply });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`EcoDivers ChatBot server running on port ${port}`);
});

