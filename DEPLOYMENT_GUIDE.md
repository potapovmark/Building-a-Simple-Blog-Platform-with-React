# 🚀 Полная инструкция по настройке деплоя

## 📋 Что уже готово

✅ GitHub Actions workflow настроен
✅ Ветка `gh-pages` создана
✅ Package.json с правильным homepage
✅ Все файлы загружены на GitHub

## 🔧 Шаг 1: Настройка GitHub Pages

### 1.1 Откройте настройки репозитория

1. Перейдите по ссылке: https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React
2. Нажмите вкладку **"Settings"** (вверху страницы)

### 1.2 Настройте Pages

1. В левом меню найдите раздел **"Pages"**
2. В разделе **"Source"** выберите **"Deploy from a branch"**
3. В выпадающем списке **"Branch"** выберите **"gh-pages"**
4. Оставьте **"/(root)"** в поле **"Folder"**
5. Нажмите кнопку **"Save"**

### 1.3 Проверьте результат

- Подождите 2-3 минуты
- Откройте: https://potapovmark.github.io/Building-a-Simple-Blog-Platform-with-React
- Должна отобразиться placeholder страница

## 🔄 Шаг 2: Активация автоматического деплоя

### 2.1 Проверьте GitHub Actions

1. Перейдите в раздел **"Actions"** на GitHub
2. Убедитесь, что workflow "Deploy to GitHub Pages" запустился
3. Дождитесь завершения (зеленая галочка)

### 2.2 Если Actions не запустились

1. Перейдите в **"Settings"** → **"Actions"** → **"General"**
2. В разделе **"Workflow permissions"** выберите **"Read and write permissions"**
3. Нажмите **"Save"**

## 🛠️ Шаг 3: Тестирование деплоя

### 3.1 Сделайте тестовое изменение

```bash
# Внесите любое изменение в код
echo "// test comment" >> src/App.tsx

# Закоммитьте и запушьте
git add .
git commit -m "Test deployment"
git push
```

### 3.2 Проверьте автоматический деплой

1. Перейдите в **"Actions"** на GitHub
2. Убедитесь, что новый workflow запустился
3. Дождитесь завершения
4. Обновите страницу сайта

## 🌐 Шаг 4: Проверка работоспособности

### 4.1 Основной функционал

1. Откройте сайт: https://potapovmark.github.io/Building-a-Simple-Blog-Platform-with-React
2. Проверьте, что отображается список статей
3. Попробуйте перейти на страницу отдельной статьи
4. Проверьте пагинацию

### 4.2 API запросы

- Убедитесь, что статьи загружаются из API
- Проверьте, что Markdown рендерится правильно
- Убедитесь, что аватары авторов отображаются

## ❗ Решение проблем

### Проблема: Сайт не загружается

**Решение:**

- Подождите 5-10 минут после настройки
- Проверьте, что ветка `gh-pages` существует
- Убедитесь, что в настройках Pages выбрана правильная ветка

### Проблема: Actions не запускаются

**Решение:**

1. Перейдите в **"Settings"** → **"Actions"** → **"General"**
2. Включите **"Allow all actions and reusable workflows"**
3. В **"Workflow permissions"** выберите **"Read and write permissions"**

### Проблема: Ошибки сборки

**Решение:**

1. Проверьте логи в разделе **"Actions"**
2. Убедитесь, что все зависимости установлены
3. Проверьте, что нет ошибок в коде

## 📁 Структура проекта

```
realworld-blog/
├── .github/workflows/deploy.yml  # GitHub Actions
├── src/                          # Исходный код
├── public/                       # Статические файлы
├── package.json                  # Зависимости и скрипты
└── README.md                     # Документация
```

## 🔗 Полезные ссылки

- **Репозиторий:** https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React
- **Сайт:** https://potapovmark.github.io/Building-a-Simple-Blog-Platform-with-React
- **Actions:** https://github.com/potapovmark/Building-a-Simple-Blog-Platform-with-React/actions

## ✅ Готово!

После выполнения всех шагов ваш блог будет автоматически деплоиться при каждом push в ветку `main`.
