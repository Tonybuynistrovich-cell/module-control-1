// Middleware для автентифікації (JWT) та авторизації (RBAC).
const jwt = require("jsonwebtoken");

// У реальному застосунку секрет береться зі змінної середовища і ніколи не комітиться.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

// authenticate: перевіряє заголовок Authorization: Bearer <token>.
// Повертає 401, якщо токен відсутній або недійсний.
function authenticate(req, res, next) {
  const header = req.headers.authorization || "";

  // Очікуваний формат: "Bearer <token>"
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing or malformed Authorization header" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Кладемо корисне навантаження токена в req.user для подальших middleware/хендлерів.
    req.user = { userId: payload.userId, role: payload.role };
    return next();
  } catch (err) {
    // Невалідний підпис, прострочений токен тощо.
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// authorize(role): дозволяє доступ лише користувачам із потрібною роллю (RBAC).
// Повертає 403 при невідповідності. Має застосовуватись ПІСЛЯ authenticate.
function authorize(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      // Захист від неправильного порядку middleware.
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    return next();
  };
}

module.exports = { authenticate, authorize, JWT_SECRET };
