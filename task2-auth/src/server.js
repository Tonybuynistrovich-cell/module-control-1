// Express-сервер: JWT-логін + RBAC-захищені ендпоінти.
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { findByEmail } = require("./users");
const { authenticate, authorize, JWT_SECRET } = require("./middleware");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN_TTL = "15m"; // короткоживучий access-токен

// POST /login — приймає { email, password }, повертає JWT з полями userId та role.
app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const user = findByEmail(email);

  // Однакова відповідь і для невідомого email, і для невірного пароля,
  // щоб не розкривати, який саме email існує (user enumeration).
  const passwordOk = user && (await bcrypt.compare(password, user.passwordHash));
  if (!user || !passwordOk) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  return res.json({ accessToken: token, tokenType: "Bearer", expiresIn: ACCESS_TOKEN_TTL });
});

// GET /me — будь-який автентифікований користувач бачить свій профіль із токена.
app.get("/me", authenticate, (req, res) => {
  res.json({ userId: req.user.userId, role: req.user.role });
});

// GET /admin — доступний лише для ролі admin (authenticate -> authorize).
app.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: `Welcome, admin (userId=${req.user.userId})`, secret: "admin-only data" });
});

// Запускаємо сервер лише якщо файл виконано напряму (зручно для тестів).
if (require.main === module) {
  app.listen(PORT, () => console.log(`Auth server listening on port ${PORT}`));
}

module.exports = app;
