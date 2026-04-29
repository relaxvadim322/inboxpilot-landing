# InboxPilot — Лендинг AI-ассистента для входящих заявок

## Что это

Учебный продающий лендинг для сервиса InboxPilot — AI-ассистент, который обрабатывает входящие заявки бизнеса из Telegram, Instagram Direct, форм на сайте.

**Тип проекта:** service landing page (статический сайт)  
**Аудитория:** малый бизнес, который теряет заявки в переписках  
**Главный CTA:** «Получить разбор входящих заявок»

## Стек

- **Astro 6.1.10** — статический генератор, no JS by default
- **TypeScript** — типизация в компонентах
- **Clean CSS** — токены + утилиты, никаких CSS-фреймворков
- **Inter** — единственный шрифт, Google Fonts

## Запуск

```bash
npm install
npm run dev       # localhost:4321
npm run build     # сборка в dist/
npm run preview   # превью собранного сайта
```

## Проверка перед сдачей

```bash
# 1. Сборка (ловит то что не видит typecheck)
npm run build

# 2. Визуальная проверка через mcp__Claude_Preview
# screenshot desktop 1280px + mobile 375px

# 3. Lighthouse Performance ≥ 90
```

## Структура секций (порядок в index.astro)

```
1.  Header      — навигация, логотип, CTA-кнопка
2.  Hero        — H1, подзаголовок, chat-mockup справа
3.  TrustStrip  — логотипы / короткие социальные доказательства
4.  Problem     — боль клиента (заявки теряются)
5.  WhatWeDo    — что именно делает InboxPilot
6.  Benefits    — выгоды для бизнеса
7.  Process     — как это работает (шаги)
8.  WhatYouGet  — что получает клиент на выходе
9.  BeforeAfter — до/после внедрения
10. Cases       — примеры из практики
11. Pricing     — тарифы / пакеты
12. ForWhom     — кому подходит (портреты)
13. FAQ         — частые вопросы
14. FinalCTA    — последний призыв к действию
15. Footer      — контакты, ссылки
```

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `src/styles/tokens.css` | Все дизайн-токены (цвета, отступы, типографика) |
| `src/styles/global.css` | Сброс, типографика, keyframes, reduced-motion |
| `src/styles/utilities.css` | Переиспользуемые классы (container, section, btn, tag) |
| `src/layouts/BaseLayout.astro` | HTML-каркас, мета-теги, подключение шрифтов |
| `src/pages/index.astro` | Точка сборки — порядок секций |

## Дизайн-токены (tokens.css)

```
Фон:         --bg: #0d1117        (очень тёмный, почти чёрный)
Поверхность: --surface: #151b23  / --surface-2: #1f2937
Текст:       --text: #f4f7fa     / --text-muted: #9aa4b2
Акцент:      --accent-blue: #4f8cff
Успех:       --accent-green: #22c55e
Шрифт:       Inter (400/500/600/700)
```

## Design direction

**Dark luxury / SaaS dark** — не «тёмный ради моды», а интерфейсный тёмный с акцентом на читаемость и доверие. Никакой тяжёлой анимации, никаких градиентных взрывов.

- Строгая иерархия через scale, не через цвет
- Единственный акцент — синий #4f8cff
- Карточки с тонкими бордерами и inset-shadow
- Float-анимация chat-card в Hero — единственная «живая» анимация на странице

## Что НЕЛЬЗЯ делать в этом проекте

- ❌ Tailwind, UnoCSS или любой CSS-фреймворк
- ❌ React, Vue, Svelte — только `.astro` компоненты
- ❌ Reveal/scroll animations (класс `.anim` есть в разметке, но trigger нет — намеренно)
- ❌ Тяжёлый JavaScript (GSAP, Framer Motion и т.п.)
- ❌ Backend, API-роуты, серверный рендеринг
- ❌ Изменять порядок секций без обсуждения

## Скиллы для этого проекта

```
📚 Обязательно перед правками:
  • selling-sites       — pre-flight 5 полей, text-review, anti-AI чеклист
  • frontend-design     — компоненты, токены, анимации
  • web-design-guidelines — UI best practices
  • seo                 — meta, og, sitemap, Lighthouse

📚 Перед текстом/копи:
  • brand-voice         — тон, голос
  • ui-animation        — если нужны анимации

📚 При работе с git:
  • commit + github-ops — feature branch, PR workflow

📚 Перед сдачей:
  • verification-loop   — build check + screenshot
```

## Task workflow (T1–T8)

Каждая задача по этой схеме:
```
T1. Task brief — переформулировать задачу в чёткое ТЗ
T2. Skills checklist — прочитать нужные скиллы ДО кода
T3. Plan — показать Вадиму, ждать одобрения
T4. "Приступай" — только после явного одобрения
T5. Code — в feature branch, никогда в main
T6. Verify — npm run build + скриншот + checklist
T7. Update CLAUDE.md / README — часть того же коммита
T8. Commit + PR — Вадим мержит сам
```

## Known issues (на момент baseline)

- [ ] Тексты не прогонялись через `content-team` + `text-polisher`
- [ ] Нет `og:url` и `og:image` в мета-тегах
- [ ] Шрифт подключён через `@import` в CSS (медленнее чем `<link>`)
- [ ] Нет `sitemap.xml` и `robots.txt`
- [ ] Нет `favicon.svg` (только ссылка в BaseLayout)
- [ ] Класс `.anim` используется в разметке, но scroll-trigger не подключён
- [ ] TrustStrip, Cases — заглушки без реального контента

## Важные решения

- **Нет Tailwind** — осознанное решение: токены + утилиты дают полный контроль без vendor lock-in
- **Astro без JS** — лендинг должен быть максимально быстрым, интерактивность не нужна
- **Dark theme only** — light mode не планируется (учебный проект с чётким visual direction)
- **Нет i18n** — только русский язык
