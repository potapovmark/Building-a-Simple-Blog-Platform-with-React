# Настройка GitHub Pages

## Автоматический деплой

Проект настроен для автоматического деплоя на GitHub Pages при каждом push в ветку `main`.

### Что уже настроено:

1. **GitHub Actions workflow** (`.github/workflows/deploy.yml`)
   - Автоматически собирает проект при push
   - Деплоит на GitHub Pages
   - Использует Node.js 18

2. **Package.json настройки**
   - Добавлен `homepage` URL
   - Добавлены скрипты `predeploy` и `deploy`
   - Установлен пакет `gh-pages`

### Ручная настройка GitHub Pages:

1. Перейдите в настройки репозитория на GitHub
2. Найдите раздел "Pages" в боковом меню
3. В разделе "Source" выберите "GitHub Actions"
4. GitHub автоматически будет использовать workflow для деплоя

### Ручной деплой:

Если нужно выполнить деплой вручную:

```bash
npm run deploy
```

### Проверка деплоя:

После настройки сайт будет доступен по адресу:
https://potapovmark.github.io/Building-a-Simple-Blog-Platform-with-React

### Troubleshooting:

- Убедитесь, что в настройках репозитория включены GitHub Actions
- Проверьте, что у Actions есть права на запись в репозиторий
- Логи деплоя можно посмотреть в разделе "Actions" на GitHub 