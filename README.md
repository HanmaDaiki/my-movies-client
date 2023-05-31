# Movies Explore

## О проекте

Это фронтенд часть Movies Explore. Сайт написаный для поиска фильмов и возможности сохранять понравившиеся к себе на аккаунт. Данный список содержит длительность название и ссылку на трейлер.
[Переход к бэкенд части сайта](https://github.com/HanmaDaiki/my-movies-api) 

## Технологии

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass/Scss](https://sass-scss.ru/)
- [ReactHookForm](https://react-hook-form.com/)
- [Vercel](https://vercel.com/)
- [ViteJS](https://vitejs.dev/)

## Как развернуть у себя

### Что нужно установить

[NodeJS](https://nodejs.org/en)

Для проверки что установка прошла успешно. Консоль на команды должна выдать версии Node и npm(У вас будут другие).
```
node -v
output: v16.15.1

npm -v
output: 8.11.0
```

Так же псоле установки Node и npm, понадобиться yarn.
```
npm install --global yarn
```

### Что ввести в консоль для запуска проекта

```
git clone https://github.com/HanmaDaiki/my-movies-client.git
cd my-movies-client
yarn install
yarn run dev
```

## Статус проекта

В дальнейшем планируется рефакторинг стейт менеджера, компонентов и вынесение общих стилей в константы.
Проект завершен на 90%
