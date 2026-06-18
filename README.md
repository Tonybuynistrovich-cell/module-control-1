# Модульний контроль №1 — Практична частина

Професійна практика програмної інженерії з використанням AI (Теми 1–7).
Репозиторій містить код 4 практичних завдань.

## Структура

```
module-control-1/
├── task1-docker/        # Завдання 1: Docker та контейнеризація
│   ├── app/             # простий Express-застосунок (порт 3000)
│   ├── Dockerfile       # multi-stage build, non-root користувач
│   ├── docker-compose.yml  # app + PostgreSQL + volume
│   └── .dockerignore
├── task2-auth/          # Завдання 2: JWT-автентифікація + RBAC
│   └── src/             # server.js, middleware.js, users.js, seed.js
├── task3-tests/         # Завдання 3: unit-тести на Jest
│   ├── calculateDiscount.js
│   └── calculateDiscount.test.js
├── task4-refactor/      # Завдання 4: AI code review + рефакторинг
│   ├── original.js
│   ├── refactored.js
│   └── README.md        # промпт, список code smells, пояснення
└── PROMPTS.md           # промпти до AI + що прийнято/виправлено вручну
```

---

## Завдання 1 — Docker

Multi-stage `Dockerfile`: окремий етап `builder` ставить усі залежності, фінальний
етап `production` містить лише production-залежності і запускається від користувача `node`
(не root). `docker-compose.yml` піднімає застосунок разом із PostgreSQL (named volume
`pg_data` для даних, healthcheck перед стартом app).

**Запуск:**
```bash
cd task1-docker
docker compose up --build
# перевірка: curl http://localhost:3000/health
```

## Завдання 2 — JWT + RBAC

- `POST /login` `{ email, password }` → повертає JWT (`userId`, `role`).
- `authenticate` — перевіряє `Authorization: Bearer <token>`, інакше `401`.
- `authorize(role)` — RBAC, інакше `403`.
- `GET /admin` — лише для ролі `admin`. `GET /me` — для будь-якого автентифікованого.

Паролі зберігаються як **bcrypt-хеші** (не у відкритому вигляді).

**Запуск:**
```bash
cd task2-auth
npm install
npm start
# Логін:
curl -X POST localhost:3000/login -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
# Доступ до /admin із отриманим токеном:
curl localhost:3000/admin -H "Authorization: Bearer <TOKEN>"
```
Тестові облікові записи: `admin@example.com / admin123` (admin), `user@example.com / user123` (user).

## Завдання 3 — Тестування (Jest)

Unit-тести для `calculateDiscount` покривають: знижки vip/regular, відсутність знижки,
граничний `price === 0`, викидання помилки при від'ємній ціні (`toThrow`).

**Запуск:**
```bash
cd task3-tests
npm install
npm test
```
> Для здачі: зробіть скріншот виводу `npm test` (усі тести зелені) — це вимога завдання.

## Завдання 4 — AI code review та рефакторинг

Промпт для AI-review, список знайдених code smells і відрефакторений код —
у [task4-refactor/README.md](task4-refactor/README.md).

---

## AI-інструменти

Промпти, використані для генерації коду, та коментарі про те, що було **прийнято**,
а що **виправлено вручну**, зібрані у [PROMPTS.md](PROMPTS.md) (обов'язкова вимога курсу).
