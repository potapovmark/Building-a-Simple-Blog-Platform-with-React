# Настройка GitHub Pages через ветку gh-pages

## ✅ Что уже настроено

1. **Создана ветка `gh-pages`** с placeholder страницей
2. **Обновлен GitHub Actions Workflow** для деплоя
3. **Package.json** с правильным homepage URL

## 🔧 Настройка GitHub Pages

### Шаг 1: Перейдите в настройки репозитория

1. Откройте: https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React
2. Нажмите вкладку **"Settings"**

### Шаг 2: Настройте Pages через ветку

1. В левом меню найдите **"Pages"**
2. В разделе **"Source"** выберите **"Deploy from a branch"**
3. В выпадающем списке выберите **"gh-pages"**
4. Нажмите **"Save"**

### Шаг 3: Проверьте деплой

1. Перейдите в раздел **"Actions"** на GitHub
2. Убедитесь, что workflow "Deploy to GitHub Pages" запустился
3. Дождитесь завершения сборки

## 🌐 Результат

После настройки сайт будет доступен по адресу:
**https://potapovmark.github.io/Building-a-Simple-Blog-Platform-with-React**

## 🔄 Как работает деплой

1. При push в ветку `main` запускается GitHub Actions
2. Проект собирается командой `npm run build`
3. Результат деплоится в ветку `gh-pages`
4. GitHub Pages автоматически обновляется

## 🛠️ Ручной деплой

```bash
# Переключиться на gh-pages
git checkout gh-pages

# Собрать проект
npm run build

# Скопировать файлы из build в корень
cp -r build/* .

# Закоммитить и запушить
git add .
git commit -m "Update gh-pages"
git push origin gh-pages
```

## 📋 Проверка работоспособности

1. Откройте сайт по ссылке выше
2. Проверьте, что отображается placeholder страница
3. После настройки Actions проверьте основной функционал

## ❗ Возможные проблемы

- **Сайт не загружается**: Подождите 5-10 минут после настройки
- **Actions не запускаются**: Проверьте права доступа в настройках репозитория
- **Ошибки сборки**: Проверьте логи в разделе Actions

## 📁 Структура веток

- `main` - основной код проекта
- `gh-pages` - собранные файлы для деплоя
