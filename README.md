# Realworld Blog

Простая платформа блога, созданная с использованием React и TypeScript.

## Функциональность

- Отображение списка статей с пагинацией
- Просмотр отдельных статей с поддержкой Markdown
- Навигация между страницами
- Адаптивный дизайн

## Технологии

- React 19
- TypeScript
- React Router DOM
- Axios для API запросов
- React Markdown для рендеринга Markdown
- Husky для Git hooks
- Prettier для форматирования кода
- ESLint для линтинга

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd realworld-blog
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите проект:

```bash
npm start
```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## API

Проект использует RealWorld API: https://realworld.habsida.net/api

## Структура проекта

```
src/
├── components/
│   ├── ArticleList.tsx      # Список статей
│   ├── ArticleDetail.tsx    # Детальная страница статьи
│   ├── Header.tsx          # Заголовок с навигацией
│   └── *.css               # Стили компонентов
├── services/
│   └── api.ts              # API сервис
├── types/
│   └── index.ts            # TypeScript типы
└── App.tsx                 # Главный компонент
```

## Скрипты

- `npm start` - Запуск в режиме разработки
- `npm build` - Сборка для продакшена
- `npm test` - Запуск тестов
- `npm run lint` - Проверка кода ESLint
- `npm run format` - Форматирование кода Prettier

## Git Hooks

Husky настроен для автоматического запуска линтинга и форматирования при push в репозиторий.
