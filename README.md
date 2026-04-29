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
├── docs/
│   └── visual-review/           # Before/after скриншоты по секциям и breakpoints
│       ├── before/              # Baseline до visual redesign
│       └── after/               # После visual redesign + animation polish
├── public/                      # Статические файлы (favicon.svg, favicon.ico)
├── scripts/
│   └── take-screenshots.mjs     # Playwright-скрипт для before/after скриншотов
├── src/
│   ├── components/              # Астро-компоненты секций
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
│   │   └── BaseLayout.astro     # HTML-каркас, мета-теги
│   ├── pages/
│   │   └── index.astro          # Точка сборки, порядок секций
│   └── styles/
│       ├── tokens.css           # Дизайн-токены (цвета, шрифты, отступы)
│       ├── global.css           # Сброс, типографика, keyframes, reduced-motion
│       └── utilities.css        # Переиспользуемые классы
├── CLAUDE.md                    # Контекст проекта для Claude Code
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Основной CTA

Лендинг ведёт к одному действию: **«Получить разбор входящих заявок»** → https://t.me/inboxpilot_demo

## Деплой

Задеплоен на [Cloudflare Pages](https://pages.cloudflare.com/): **https://inboxpilot-landing.pages.dev/**

Деплой автоматический: пуш в `master` → Cloudflare строит и публикует.  
Сборка командой `npm run build` — статические файлы в `./dist/`.
