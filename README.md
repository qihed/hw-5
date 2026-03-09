# E-commerce Next.js

Ориг репо: [https://github.com/qihed/hw](https://github.com/qihed/hw)
Ссылка на вертель (Vercel): []()

Next.js 16 приложение (App Router) для интернет-магазина с MobX, SCSS-модулями и серверной загрузкой данных.

Ниже — скрипты запуска/сборки, переменные окружения и инструкция по деплою.

## Запуск и сборка

```bash
# Установка зависимостей
yarn install

# Режим разработки
yarn dev

# Production-сборка
yarn build

# Запуск production-сервера (после yarn build)
yarn start

# Линтинг
yarn lint
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Переменные окружения

- **Серверные** (без префикса `NEXT_PUBLIC_`) — доступны только на сервере (Server Components, API routes, Server Actions). Используйте их для секретов и ключей API.
- **Публичные** (с префиксом `NEXT_PUBLIC_`) — попадают в браузер. Используйте только для данных, которые допустимо показывать на клиенте.

Для локальной разработки создайте файл `.env.local` в корне проекта:

| Переменная | Описание | Обязательна |
|------------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Базовый URL API (например, Strapi). По умолчанию используется `https://front-school-strapi.ktsdev.ru/api` | Нет |

Пример:

```env
NEXT_PUBLIC_API_URL=https://front-school-strapi.ktsdev.ru/api
```

Для деплоя на Vercel задайте те же переменные в настройках проекта.

## Деплой на Vercel

1. Подключите репозиторий к [Vercel](https://vercel.com), выберите фреймворк Next.js.
2. Укажите переменные окружения в настройках проекта.
3. Убедитесь, что билд проходит и приложение открывается.

**Production:** после деплоя добавьте сюда ссылку на приложение (например, `https://your-project.vercel.app`).

**Репозиторий:** ссылка на исходный код (если хранится отдельно от деплоя).

## Документация

- [Next.js](https://nextjs.org/docs)
- [Деплой Next.js на Vercel](https://nextjs.org/docs/app/building-your-application/deploying)


