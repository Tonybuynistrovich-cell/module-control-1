const { calculateDiscount } = require("./calculateDiscount");

describe("calculateDiscount", () => {
  // 1. Знижка для vip та regular клієнтів
  test("надає 20% знижку для vip-клієнта", () => {
    expect(calculateDiscount(100, "vip")).toBe(80);
  });

  test("надає 5% знижку для regular-клієнта", () => {
    expect(calculateDiscount(100, "regular")).toBe(95);
  });

  // 2. Випадок без знижки — невідомий тип клієнта
  test("повертає повну ціну для невідомого типу клієнта", () => {
    expect(calculateDiscount(100, "unknown")).toBe(100);
  });

  test("повертає повну ціну, коли тип клієнта не передано", () => {
    expect(calculateDiscount(100)).toBe(100);
  });

  // 3. Граничний випадок price === 0
  test("коректно обробляє price === 0 для всіх типів", () => {
    expect(calculateDiscount(0, "vip")).toBe(0);
    expect(calculateDiscount(0, "regular")).toBe(0);
    expect(calculateDiscount(0, "unknown")).toBe(0);
  });

  // 4. Викидання помилки при від'ємній ціні
  test("кидає помилку 'Invalid price' при від'ємній ціні", () => {
    expect(() => calculateDiscount(-10, "vip")).toThrow("Invalid price");
    expect(() => calculateDiscount(-1, "regular")).toThrow(Error);
  });

  // Додаткові перевірки коректності розрахунку (чого базовий набір міг не врахувати):
  // переконуємось, що повертається точне число, а не лише "приблизно".
  test("точність розрахунку для нецілих результатів", () => {
    expect(calculateDiscount(50, "vip")).toBe(40);
    expect(calculateDiscount(200, "regular")).toBe(190);
  });
});
