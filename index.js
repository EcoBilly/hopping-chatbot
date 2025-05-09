const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("EcoDivers ChatBot is running!");
});

app.post("/webhook", (req, res) => {
  const userMessage = req.body.message || "";
  let reply = "안녕하세요! 무엇을 도와드릴까요?";

  if (userMessage.includes("호핑")) reply = "아일랜드 호핑투어는 보트로 진행돼요! 😊";
  else if (userMessage.includes("자격증")) reply = "PADI, SDI, UTA 자격증 과정 운영 중입니다!";
  else if (userMessage.includes("장비")) reply = "장비는 모두 무료로 제공돼요. 수영복만 챙겨오세요!";

  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Chatbot server is running on port ${PORT}`);
});
