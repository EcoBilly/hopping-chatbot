const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("EcoDivers GPT ChatBot is live!");
});

app.post("/webhook", async (req, res) => {
  const userMessage = req.body.message || "";
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a friendly diving tour and training expert from EcoDivers in Jeju. Answer kindly and clearly." },
        { role: "user", content: userMessage },
      ],
    });
    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error from OpenAI:", error.message);
    res.status(500).json({ reply: "Sorry, there was a problem responding with GPT." });
  }
});

app.listen(PORT, () => {
  console.log(`EcoDivers ChatBot server running on port ${PORT}`);
});
