// Допоміжний скрипт: показує, як згенерувати bcrypt-хеш для пароля.
// Запуск: node src/seed.js <пароль>
const bcrypt = require("bcryptjs");

const password = process.argv[2] || "admin123";
const hash = bcrypt.hashSync(password, 10);

console.log(`password: ${password}`);
console.log(`bcrypt hash: ${hash}`);
