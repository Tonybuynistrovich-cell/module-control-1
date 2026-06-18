// Імітація сховища користувачів (in-memory).
// Паролі НЕ зберігаються у відкритому вигляді — лише bcrypt-хеші.
// Хеші згенеровано для паролів:
//   admin@example.com -> "admin123"
//   user@example.com  -> "user123"
// (Згенерувати власні можна через `npm run seed`, див. seed.js)
const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    email: "admin@example.com",
    // bcrypt-хеш пароля "admin123"
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    email: "user@example.com",
    // bcrypt-хеш пароля "user123"
    passwordHash: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

function findByEmail(email) {
  return users.find((u) => u.email === email);
}

module.exports = { users, findByEmail };
