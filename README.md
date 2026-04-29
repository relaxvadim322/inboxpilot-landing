# InboxPilot

Учебный продающий лендинг для сервиса InboxPilot — AI-ассистент, который обрабатывает входящие заявки малого бизнеса из Telegram, Instagram Direct и форм на сайте.

> Учебный проект. Не является работающим сервисом.

## Стек

- [Astro 6.1.10](https://astro.build) — статический генератор
- TypeScript
- Clean CSS (без Tailwind и CSS-фреймворков)
- Inter — шрифт

## Команды

| Команда | Описание |
|---------|----------|
| `npm install` | Установить зависимости |
| `npm run dev` | Запустить dev-сервер на `localhost:4321` |
| `npm run build` | Собрать продакшн-сборку в `./dist/` |
| `npm run preview` | Превью собранного сайта локально |

## Структура проекта

```
inboxpilot-landing/
├── public/                  # Статические файлы (favicon, og-image)
├── src/
│   ├── components/          # Астро-компоненты секций
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── TrustStrip.astro
│   │   ├── Problem.astro
│   │   ├── WhatWeDo.astro
│   │   ├── Benefits.astro
│   │   ├── Process.astro
│   │   ├── WhatYouGet.astro
│   │   ├── BeforeAfter.astro
│   │   ├── Cases.astro
│   │   ├── Pricing.astro
│   │   ├── ForWhom.astro
│   │   ├── FAQ.astro
│   │   ├── FinalCTA.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML-каркас, мета-теги
│   ├── pages/
│   │   └── index.astro       # Точка сборки, порядок секций
│   └── styles/
│       ├── tokens.css        # Дизайн-токены (цвета, шрифты, отступы)
│       ├── global.css        # Сброс, типографика, keyframes
│       └── utilities.css     # Переиспользуемые классы
├── CLAUDE.md                 # Контекст проекта для Claude Code
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Основной CTA

Лендинг ведёт к одному действию: **«Получить разбор входящих заявок»**

> Форма / ссылка на CTA пока заглушка — подключить при реальном деплое.

## Деплой

Планируется на [Cloudflare Pages](https://pages.cloudflare.com/) или [Vercel](https://vercel.com/).

Сборка командой `npm run build` — статические файлы в `./dist/`.
