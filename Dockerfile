# Используем официальный образ Node.js
FROM node:18

# Создаем рабочую директорию
WORKDIR /app

# Копируем package*.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё остальное
COPY . .

# Собираем проект
RUN npm run build

# Говорим, что приложение слушает этот порт
ENV PORT=3000
EXPOSE 3000

# Запускаем
CMD ["npm", "start"]
