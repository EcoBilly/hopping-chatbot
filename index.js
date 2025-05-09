const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const userMessage = req.body.message;
  console.log('User message:', userMessage);
  res.json({ reply: `받은 메시지: ${userMessage}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EcoDivers ChatBot server running on port ${PORT}`);
});

