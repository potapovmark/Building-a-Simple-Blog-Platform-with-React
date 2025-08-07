# 🔧 Исправление проблемы с деплоем

## ❌ Проблема: Сайт не работает

Сейчас сайт возвращает ошибку 301. Это означает, что GitHub Pages не настроен.

## ✅ Решение: Настройте GitHub Pages

### Шаг 1: Откройте настройки репозитория
1. Перейдите: https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React
2. Нажмите вкладку **"Settings"**

### Шаг 2: Настройте Pages
1. В левом меню найдите **"Pages"**
2. В разделе **"Source"** выберите **"Deploy from a branch"**
3. В выпадающем списке **"Branch"** выберите **"gh-pages"**
4. Оставьте **"/(root)"** в поле **"Folder"**
5. Нажмите **"Save"**

### Шаг 3: Проверьте результат
- Подождите 5-10 минут
- Откройте: https://potapovmark.github.io/Building-a-Simple-Blog-Platform-with-React
- Должен отобразиться ваш блог

## 🔄 Альтернативное решение

Если выше не помогло, попробуйте:

### Вариант 1: GitHub Actions
1. В настройках Pages выберите **"GitHub Actions"** вместо **"Deploy from a branch"**
2. GitHub автоматически будет использовать наш workflow

### Вариант 2: Ручной деплой
```bash
# Переключиться на gh-pages
git checkout gh-pages

# Собрать проект
npm run build

# Скопировать файлы
cp -r build/* .

# Закоммитить и запушить
git add .
git commit -m "Manual deploy"
git push origin gh-pages
```

## 📞 Если ничего не помогает

1. Проверьте раздел **"Actions"** на GitHub
2. Убедитесь, что workflow запустился и завершился успешно
3. Проверьте логи на наличие ошибок

## 🌐 Полезные ссылки

- **Настройки Pages:** https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React/settings/pages
- **Actions:** https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React/actions
- **Репозиторий:** https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React 