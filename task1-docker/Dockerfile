# ---------- Етап 1: build / встановлення залежностей ----------
# Окремий етап, де ставляться УСІ залежності (включно з dev) та виконується збірка.
FROM node:20-alpine AS builder

WORKDIR /app

# Спочатку копіюємо лише маніфести — це дозволяє Docker кешувати шар із залежностями,
# поки package*.json не змінюються.
COPY app/package*.json ./

# npm ci дає відтворювану інсталяцію за package-lock.json.
# Якщо lock-файл відсутній — fallback на npm install.
RUN npm ci || npm install

# Копіюємо решту вихідного коду і (за потреби) виконуємо крок збірки.
COPY app/ ./
# RUN npm run build   # розкоментувати, якщо у застосунку є крок збірки

# ---------- Етап 2: production-образ ----------
# Фінальний образ містить лише production-залежності та код — без dev-залежностей.
FROM node:20-alpine AS production

# Безпека: запускаємо застосунок від непривілейованого користувача.
# Образ node:alpine вже містить користувача `node`.
ENV NODE_ENV=production
WORKDIR /app

# Ставимо ТІЛЬКИ production-залежності.
COPY app/package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Копіюємо код застосунку і передаємо володіння користувачу node.
COPY --chown=node:node app/ ./

# Перемикаємось на непривілейованого користувача.
USER node

EXPOSE 3000

CMD ["node", "server.js"]
