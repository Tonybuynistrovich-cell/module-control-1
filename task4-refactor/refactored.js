// Відрефакторена версія: змістовні назви, сучасний синтаксис,
// методи масивів та строгі порівняння. Поведінка не змінена.

/**
 * Повертає форматовані рядки "ім'я - вік" для активних повнолітніх користувачів.
 * @param {Array<{name: string, age: number, active: boolean}>} users
 * @returns {string[]}
 */
function formatActiveAdults(users) {
  return users
    .filter((user) => user.active === true && user.age > 18)
    .map((user) => `${user.name} - ${user.age}`);
}

module.exports = { formatActiveAdults };
