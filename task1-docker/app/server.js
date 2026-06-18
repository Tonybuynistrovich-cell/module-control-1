// Простий Express-застосунок, що слухає порт 3000.
// Використовується для демонстрації multi-stage Docker-збірки та docker-compose.
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Express app is running inside Docker" });
});

// Health-check ендпоінт, зручний для перевірки контейнера
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
