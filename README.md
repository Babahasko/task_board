# Task_board
![GitHub all releases](https://img.shields.io/github/downloads/babahasko/Making_README/total?logo=GitHub)![GitHub watchers](https://img.shields.io/github/watchers/babahasko/Making_README?logo=GitHub)

## Зависимости
Для запуска проекта у вас должны быть установлены:
1. node.js + nodemon
3. docker
## Документация API
Документация api реализованна через swagger. Для просмотра переходим по ссылке http://localhost:5000/api-docs
## Запуск проекта
### Установка модулей node.js
Переходим в папку "backend" и устаналиваем модули для node.js
```cmd
npm install
```
Установка nodemon
```cmd
npm install -g nodemon
```
### Инициализация базы данных
Переходим в папку "backend" и создаём контейнер с базой данных
```cmd
docker-compose up -d --build
```

### Запуск проекта
1. Запускаем контейнер с базой данных
2. Запускаем приложение из папки "backend"
```cmd
nodemon index.js
```
